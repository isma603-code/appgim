/**
 * ══════════════════════════════════════════════════════════════════
 *  MOTOR DE GENERACIÓN DE PLANES PERSONALIZADOS
 *  Toma las respuestas del wizard y genera un mesociclo completo
 * ══════════════════════════════════════════════════════════════════
 */

const PlanGenerator = {

    /**
     * Genera el plan completo basado en las respuestas del wizard
     */
    generatePlan: (answers) => {
        const plan = {
            createdAt: new Date().toISOString(),
            startDate: PlanGenerator.getNextMonday(),
            durationWeeks: 8,
            deloadEvery: 4,
            answers: answers,
            splitType: PlanGenerator.determineSplit(answers.days),
            weekPlan: [],
            progressiveOverload: {
                compoundIncrement: answers.experience === "beginner" ? 2.5 : 1.25,
                isolationIncrement: answers.experience === "beginner" ? 1.25 : 0.625
            },
            currentWeek: 1,
            completedSessions: [],
            feedbackLog: []
        };

        // Generate the week plan with exercises
        plan.weekPlan = PlanGenerator.buildWeekPlan(answers, plan.splitType);

        // Assign real weights based on 1RM test
        PlanGenerator.assignWeights(plan, answers.strength_test);

        // Save the plan
        StorageUtil.set("apexlab_generated_plan", plan);
        StorageUtil.set("apexlab_has_plan", true);

        // Show the plan view
        if (typeof CalendarView !== "undefined") {
            CalendarView.init();
        }
        App.switchTab("myplan");
        App.showPlanSubTab("summary");
        PlanGenerator.renderPlanSummary("ai-plan-summary-container");

        return plan;
    },

    getNextMonday: () => {
        const d = new Date();
        const day = d.getDay();
        const diff = day === 0 ? 1 : (day === 1 ? 0 : 8 - day);
        d.setDate(d.getDate() + diff);
        return d.toISOString().split("T")[0];
    },

    /**
     * Determina el split óptimo según días disponibles
     */
    determineSplit: (days) => {
        switch (days) {
            case 3: return "fullbody";
            case 4: return "upper_lower";
            case 5: return "powerbuilding";
            case 6: return "ppl";
            default: return "upper_lower";
        }
    },

    /**
     * Filtra ejercicios según equipamiento y lesiones
     */
    getAvailableExercises: (answers) => {
        let exercises = [...EXERCISES_DATABASE];

        // Filtrar por lesiones
        const injuries = answers.injuries || [];
        if (injuries.includes("shoulder")) {
            exercises = exercises.filter(e =>
                !["overhead-press", "dumbbell-shoulder-press", "upright-row-cable",
                    "weighted-dips-chest", "arnold-press", "incline-dumbbell-press"].includes(e.id)
            );
        }
        if (injuries.includes("knee")) {
            exercises = exercises.filter(e =>
                !["back-squat-barbell", "front-squat-barbell", "walking-lunges",
                    "bulgarian-split-squat", "hack-squat-machine"].includes(e.id)
            );
        }
        if (injuries.includes("lower_back")) {
            exercises = exercises.filter(e =>
                !["deadlift-barbell", "barbell-row", "back-squat-barbell",
                    "t-bar-row", "romanian-deadlift"].includes(e.id)
            );
        }

        // Filtrar por equipamiento
        if (answers.equipment === "minimal") {
            const allowedMinimal = ["Aislamiento", "Multiarticular"];
            exercises = exercises.filter(e =>
                !e.name.includes("Polea") && !e.name.includes("Máquina") &&
                !e.name.includes("Pec-Deck") && !e.name.includes("Hack") &&
                !e.name.includes("Prensa") && !e.name.includes("Cable")
            );
        } else if (answers.equipment === "home") {
            exercises = exercises.filter(e =>
                !e.name.includes("Máquina") && !e.name.includes("Pec-Deck") &&
                !e.name.includes("Hack") && !e.name.includes("Prensa") &&
                !e.name.includes("Cable") && !e.name.includes("Polea")
            );
        }

        return exercises;
    },

    /**
     * Selecciona ejercicios para un grupo muscular específico
     */
    pickExercises: (available, muscleGroup, count, priorityMuscle) => {
        let pool = available.filter(e =>
            e.muscleGroup === muscleGroup || e.category === muscleGroup
        );

        // Separar compuestos y aislamiento
        const compounds = pool.filter(e => e.type === "Multiarticular");
        const isolations = pool.filter(e => e.type === "Aislamiento");

        const selected = [];

        // Primero compuestos, luego aislamientos
        compounds.forEach(e => { if (selected.length < Math.ceil(count * 0.6)) selected.push(e); });
        isolations.forEach(e => { if (selected.length < count) selected.push(e); });

        // Si es músculo prioritario, añadir 1 extra de aislamiento
        if (priorityMuscle && selected.length < pool.length) {
            const extra = pool.find(e => !selected.includes(e));
            if (extra) selected.push(extra);
        }

        return selected;
    },

    /**
     * Determina series y reps según objetivo y nivel
     */
    getRepScheme: (goal, experience, exerciseType) => {
        const schemes = {
            hypertrophy: {
                compound: { sets: 4, reps: "8-10", rir: 1 },
                isolation: { sets: 3, reps: "12-15", rir: 0 }
            },
            strength: {
                compound: { sets: 5, reps: "3-5", rir: 2 },
                isolation: { sets: 3, reps: "8-10", rir: 1 }
            },
            cut: {
                compound: { sets: 3, reps: "6-8", rir: 1 },
                isolation: { sets: 3, reps: "10-12", rir: 0 }
            },
            recomp: {
                compound: { sets: 4, reps: "6-8", rir: 1 },
                isolation: { sets: 3, reps: "10-12", rir: 0 }
            }
        };

        const scheme = schemes[goal] || schemes.hypertrophy;
        const s = exerciseType === "Multiarticular" ? scheme.compound : scheme.isolation;

        // Principiantes: menos series
        if (experience === "beginner") {
            s.sets = Math.max(2, s.sets - 1);
            s.rir = Math.min(3, s.rir + 1);
        }

        return s;
    },

    /**
     * Calcula cuántos ejercicios caben en la sesión
     */
    exercisesPerSession: (durationMinutes, goal) => {
        const avgTimePerExercise = goal === "strength" ? 12 : 8;
        return Math.floor(durationMinutes / avgTimePerExercise);
    },

    /**
     * Construye el plan semanal completo
     */
    buildWeekPlan: (answers, splitType) => {
        const available = PlanGenerator.getAvailableExercises(answers);
        const exPerSession = PlanGenerator.exercisesPerSession(answers.duration, answers.goal);
        const priority = answers.priority !== "balanced" ? answers.priority : null;
        const days = [];

        const muscleMap = {
            chest: "Pecho", back: "Espalda", legs: "Piernas",
            arms: "Brazos", shoulders: "Hombros"
        };
        const priorityMuscle = muscleMap[priority] || null;

        if (splitType === "ppl") {
            days.push(PlanGenerator.buildDay(1, "PUSH A — Pecho, Hombro, Tríceps", available, answers, ["Pecho", "Hombros", "Tríceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(2, "PULL A — Espalda, Bíceps", available, answers, ["Espalda", "Bíceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(3, "LEGS A — Cuádriceps, Isquios, Gemelos", available, answers, ["Cuádriceps", "Isquios", "Glúteos", "Pantorrillas"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(4, "PUSH B — Pecho, Hombro, Tríceps", available, answers, ["Pecho", "Hombros", "Tríceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(5, "PULL B — Espalda, Bíceps", available, answers, ["Espalda", "Bíceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(6, "LEGS B — Glúteos, Isquios, Abs", available, answers, ["Glúteos", "Isquios", "Cuádriceps", "Abdomen"], exPerSession, priorityMuscle));
        } else if (splitType === "upper_lower") {
            days.push(PlanGenerator.buildDay(1, "TORSO A — Pecho, Espalda, Hombro", available, answers, ["Pecho", "Espalda", "Hombros", "Tríceps", "Bíceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(2, "PIERNA A — Cuádriceps, Isquios", available, answers, ["Cuádriceps", "Isquios", "Glúteos", "Pantorrillas", "Abdomen"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(4, "TORSO B — Pecho, Espalda, Hombro", available, answers, ["Pecho", "Espalda", "Hombros", "Bíceps", "Tríceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(5, "PIERNA B — Glúteos, Isquios", available, answers, ["Glúteos", "Isquios", "Cuádriceps", "Pantorrillas", "Abdomen"], exPerSession, priorityMuscle));
        } else if (splitType === "fullbody") {
            days.push(PlanGenerator.buildDay(1, "FULL BODY A — Fuerza Compuesta", available, answers, ["Cuádriceps", "Pecho", "Espalda", "Hombros", "Pantorrillas"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(3, "FULL BODY B — Hipertrofia", available, answers, ["Isquios", "Pecho", "Espalda", "Bíceps", "Tríceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(5, "FULL BODY C — Volumen", available, answers, ["Cuádriceps", "Glúteos", "Pecho", "Espalda", "Hombros", "Abdomen"], exPerSession, priorityMuscle));
        } else if (splitType === "powerbuilding") {
            days.push(PlanGenerator.buildDay(1, "TORSO FUERZA", available, answers, ["Pecho", "Espalda", "Hombros"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(2, "PIERNA FUERZA", available, answers, ["Cuádriceps", "Isquios"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(3, "PUSH HIPERTROFIA", available, answers, ["Pecho", "Hombros", "Tríceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(4, "PULL HIPERTROFIA", available, answers, ["Espalda", "Bíceps"], exPerSession, priorityMuscle));
            days.push(PlanGenerator.buildDay(5, "PIERNA HIPERTROFIA & ABS", available, answers, ["Cuádriceps", "Glúteos", "Isquios", "Pantorrillas", "Abdomen"], exPerSession, priorityMuscle));
        }

        return days;
    },

    /**
     * Construye un día de entrenamiento
     */
    buildDay: (dayOfWeek, name, available, answers, muscleGroups, maxExercises, priorityMuscle) => {
        const exercises = [];
        const used = new Set();

        const exPerGroup = Math.max(1, Math.floor(maxExercises / muscleGroups.length));

        muscleGroups.forEach(group => {
            const pool = available.filter(e =>
                (e.muscleGroup === group || e.category === group) && !used.has(e.id)
            );

            // Prioritize compounds first
            const compounds = pool.filter(e => e.type === "Multiarticular");
            const isolations = pool.filter(e => e.type === "Aislamiento");
            const sorted = [...compounds, ...isolations];

            let count = exPerGroup;
            if (priorityMuscle && (group === priorityMuscle || group.includes(priorityMuscle))) {
                count += 1;
            }

            sorted.slice(0, count).forEach(ex => {
                if (exercises.length >= maxExercises) return;
                const scheme = PlanGenerator.getRepScheme(answers.goal, answers.experience, ex.type);
                exercises.push({
                    exerciseId: ex.id,
                    sets: scheme.sets,
                    targetReps: scheme.reps,
                    targetRir: scheme.rir,
                    prescribedWeight: 0 // Will be filled by assignWeights
                });
                used.add(ex.id);
            });
        });

        return { dayOfWeek, name, exercises };
    },

    /**
     * Asigna pesos reales basados en el 1RM del test de fuerza
     */
    assignWeights: (plan, strengthData) => {
        if (!strengthData) return;

        const benchRM = strengthData.bench_1rm || 0;
        const squatRM = strengthData.squat_1rm || 0;
        const deadliftRM = strengthData.deadlift_1rm || 0;

        // Map exercise categories to base 1RM
        const rmMap = {
            "Pecho": benchRM,
            "Hombros": benchRM * 0.65,
            "Tríceps": benchRM * 0.35,
            "Espalda": deadliftRM * 0.65,
            "Bíceps": benchRM * 0.3,
            "Cuádriceps": squatRM,
            "Isquios": deadliftRM * 0.6,
            "Glúteos": squatRM * 0.85,
            "Abdomen": 0,
            "Pantorrillas": squatRM * 0.4
        };

        plan.weekPlan.forEach(day => {
            day.exercises.forEach(ex => {
                const exData = EXERCISES_DATABASE.find(e => e.id === ex.exerciseId);
                if (!exData) return;

                const baseRM = rmMap[exData.muscleGroup] || 0;
                if (baseRM <= 0) { ex.prescribedWeight = 0; return; }

                // Calculate working weight based on rep range
                const targetReps = parseInt(ex.targetReps.split("-")[0]) || 8;
                let percentage;

                if (targetReps <= 5) percentage = 0.82;
                else if (targetReps <= 8) percentage = 0.72;
                else if (targetReps <= 12) percentage = 0.65;
                else percentage = 0.58;

                // Isolation exercises use less weight relative to compound RM
                const isoFactor = exData.type === "Aislamiento" ? 0.5 : 1;

                const raw = baseRM * percentage * isoFactor;
                // Round to nearest 2.5
                ex.prescribedWeight = Math.round(raw / 2.5) * 2.5;
            });
        });
    },

    /**
     * Renderiza el resumen del plan generado
     */
    renderPlanSummary: (containerId) => {
        const container = document.getElementById(containerId);
        const plan = StorageUtil.get("apexlab_generated_plan", null);
        if (!container || !plan) return;

        const totalExercises = plan.weekPlan.reduce((sum, day) => sum + day.exercises.length, 0);
        const startDate = new Date(plan.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (plan.durationWeeks * 7));

        let daysHtml = "";
        plan.weekPlan.forEach((day, idx) => {
            const dayNames = ["", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
            daysHtml += `
                <div class="plan-day-summary-card glass-card-epic" onclick="PlanGenerator.showDayDetail(${idx})">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <div>
                            <span style="font-size:12px; color:var(--primary-emerald); font-weight:800;">${dayNames[day.dayOfWeek] || "Día " + day.dayOfWeek}</span>
                            <h4 style="font-size:15px; margin-top:4px;">${day.name}</h4>
                        </div>
                        <span style="font-size:13px; color:var(--text-muted);">${day.exercises.length} ejercicios</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="plan-summary-header glass-card-epic" style="text-align:center; padding:30px;">
                <h2 style="font-family:var(--font-heading); font-size:24px;">
                    <i class="fa-solid fa-wand-magic-sparkles text-emerald"></i> Tu Plan Personalizado Está Listo
                </h2>
                <p style="color:var(--text-muted); margin:10px 0 20px;">
                    Generado el ${new Date().toLocaleDateString("es-ES")} basándose en tu test de 8 pasos
                </p>
                <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; margin-top:20px;">
                    <div class="metabolic-stat-card">
                        <span>Duración</span>
                        <h3 style="color:var(--primary-emerald);">${plan.durationWeeks} semanas</h3>
                    </div>
                    <div class="metabolic-stat-card">
                        <span>Días / Semana</span>
                        <h3 style="color:var(--accent-cyan);">${plan.weekPlan.length} días</h3>
                    </div>
                    <div class="metabolic-stat-card">
                        <span>Total Ejercicios</span>
                        <h3 style="color:var(--accent-amber);">${totalExercises}</h3>
                    </div>
                    <div class="metabolic-stat-card">
                        <span>Deload Cada</span>
                        <h3 style="color:var(--danger-rose);">${plan.deloadEvery} sem</h3>
                    </div>
                </div>
            </div>

            <h3 style="margin:24px 0 14px; font-family:var(--font-heading);">
                <i class="fa-solid fa-calendar-week text-cyan"></i> Tu Semana Tipo
            </h3>
            <div style="display:flex; flex-direction:column; gap:12px;">
                ${daysHtml}
            </div>

            <div style="display:flex; gap:16px; margin-top:24px;">
                <button class="btn-epic-primary" onclick="App.showPlanSubTab('calendar')">
                    <i class="fa-solid fa-calendar"></i> Ver Calendario Completo
                </button>
                <button class="btn-epic-secondary" onclick="App.showPlanSubTab('wizard')">
                    <i class="fa-solid fa-arrows-rotate"></i> Repetir Test
                </button>
            </div>
        `;
    },

    showDayDetail: (dayIndex) => {
        const plan = StorageUtil.get("apexlab_generated_plan", null);
        if (!plan || !plan.weekPlan[dayIndex]) return;

        const day = plan.weekPlan[dayIndex];
        let modal = document.getElementById("modal-plan-day-detail");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "modal-plan-day-detail";
            modal.className = "modal-backdrop";
            document.body.appendChild(modal);
        }

        let exListHtml = "";
        day.exercises.forEach(ex => {
            const exData = typeof EXERCISES_DATABASE !== "undefined" ? EXERCISES_DATABASE.find(e => e.id === ex.exerciseId) : null;
            const name = exData ? exData.name : ex.exerciseId;
            const imgSrc = exData ? exData.image : "img/ex_bench.jpg";
            const reps = ex.targetReps || "8-10";
            const weightStr = ex.prescribedWeight > 0 ? `<strong style="color:var(--accent-cyan);">${ex.prescribedWeight} kg</strong>` : "Peso Corporal / RIR " + (ex.targetRir ?? 2);

            exListHtml += `
                <div style="display:flex; gap:16px; align-items:center; padding:14px; background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); border-radius:var(--radius-sm); margin-bottom:10px;">
                    <img src="${imgSrc}" style="width:70px; height:50px; object-fit:cover; border-radius:8px;" alt="${name}">
                    <div style="flex:1;">
                        <div style="font-weight:800; font-size:15px;">${name}</div>
                        <div style="font-size:13px; color:var(--text-muted); margin-top:3px;">
                            ${ex.sets} series × ${reps} reps | RIR ${ex.targetRir ?? 2} | Carga: ${weightStr}
                        </div>
                    </div>
                </div>
            `;
        });

        modal.innerHTML = `
            <div class="modal-card-epic glass-card-epic" style="max-width:550px; width:90%;">
                <div class="modal-header-epic">
                    <h3><i class="fa-solid fa-dumbbell text-emerald"></i> ${day.name}</h3>
                    <button class="modal-close-btn" onclick="document.getElementById('modal-plan-day-detail').classList.remove('active')">&times;</button>
                </div>
                <div class="modal-body-epic" style="padding-top:14px;">
                    ${exListHtml}
                    <div style="display:flex; gap:12px; margin-top:20px; justify-content:flex-end;">
                        <button class="btn-epic-secondary" onclick="document.getElementById('modal-plan-day-detail').classList.remove('active')">Cerrar</button>
                        <button class="btn-epic-primary" onclick="document.getElementById('modal-plan-day-detail').classList.remove('active'); WorkoutPlanner.startSessionByName('${day.name}');">
                            <i class="fa-solid fa-play"></i> Iniciar Sesión Ahora
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add("active");
        if (typeof App !== "undefined" && App.soundEnabled && typeof SoundFX !== "undefined") SoundFX.playCheck();
    }
};
