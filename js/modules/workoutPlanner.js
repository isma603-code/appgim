/**
 * MÓDULO DE PLANIFICACIÓN Y SEGUIMIENTO HUD DE ENTRENAMIENTO
 * CON GUÍAS BIOMECÁNICAS INLINE DIRECTAS (100% DENTRO DE LA APP)
 */

const WorkoutPlanner = {
    activeRoutine: null,
    currentSessionDay: null,
    sessionLogs: {},
    timerInterval: null,
    expandedExercises: {},

    init: () => {
        WorkoutPlanner.activeRoutine = StorageUtil.get(STORAGE_KEYS.ACTIVE_ROUTINE, SCIENTIFIC_ROUTINES[0]);
        WorkoutPlanner.renderActiveRoutineSummary();
        WorkoutPlanner.renderSplitDays();

        document.addEventListener("exerciseSwapped", (e) => {
            const { oldId, newId } = e.detail;
            if (WorkoutPlanner.currentGuidedDay && WorkoutPlanner.currentGuidedDay.exercises) {
                WorkoutPlanner.currentGuidedDay.exercises.forEach(ex => {
                    if (ex.exerciseId === oldId) ex.exerciseId = newId;
                });
                WorkoutPlanner.renderGuidedModalStep();
            }
            if (WorkoutPlanner.currentSessionDay && WorkoutPlanner.currentSessionDay.exercises) {
                WorkoutPlanner.currentSessionDay.exercises.forEach(ex => {
                    if (ex.exerciseId === oldId) ex.exerciseId = newId;
                });
                WorkoutPlanner.startWorkoutSession(WorkoutPlanner.currentSessionDay);
            }
        });
    },

    setActiveRoutine: (routineId) => {
        const found = SCIENTIFIC_ROUTINES.find(r => r.id === routineId);
        if (found) {
            WorkoutPlanner.activeRoutine = found;
            StorageUtil.set(STORAGE_KEYS.ACTIVE_ROUTINE, found);
            WorkoutPlanner.renderActiveRoutineSummary();
            WorkoutPlanner.renderSplitDays();
        }
    },

    renderActiveRoutineSummary: () => {
        const container = document.getElementById("active-routine-info");
        if (!container || !WorkoutPlanner.activeRoutine) return;

        container.innerHTML = `
            <h3>${WorkoutPlanner.activeRoutine.name}</h3>
            <p class="subtitle"><strong>Frecuencia:</strong> ${WorkoutPlanner.activeRoutine.frequency} | <strong>Meta:</strong> ${WorkoutPlanner.activeRoutine.targetGoal}</p>
            <p style="font-size: 12px; margin-top: 6px; color: var(--text-muted);">${WorkoutPlanner.activeRoutine.description}</p>
        `;
    },

    renderSplitDays: () => {
        const container = document.getElementById("split-days-container");
        if (!container || !WorkoutPlanner.activeRoutine) return;

        container.innerHTML = "";
        WorkoutPlanner.activeRoutine.days.forEach((day) => {
            const card = document.createElement("div");
            card.className = "split-day-card";
            if (WorkoutPlanner.currentSessionDay && WorkoutPlanner.currentSessionDay.dayId === day.dayId) {
                card.classList.add("active");
            }

            card.innerHTML = `
                <div>
                    <div class="day-title">${day.name}</div>
                    <div class="day-muscles">${day.exercises.length} Ejercicios estructurados</div>
                </div>
                <i class="fa-solid fa-circle-play" style="color: var(--primary-emerald); font-size: 22px;"></i>
            `;

            card.addEventListener("click", () => {
                WorkoutPlanner.startWorkoutSession(day);
            });

            container.appendChild(card);
        });
    },

    startSessionByName: (sessionName) => {
        App.switchTab("workout");
        if (!WorkoutPlanner.activeRoutine || !WorkoutPlanner.activeRoutine.days) return;
        const sName = (sessionName || "").toLowerCase();
        const match = WorkoutPlanner.activeRoutine.days.find(d => 
            d.name.toLowerCase().includes(sName) || sName.includes(d.name.toLowerCase())
        ) || WorkoutPlanner.activeRoutine.days[0];
        
        if (match) {
            WorkoutPlanner.startWorkoutSession(match);
        }
    },

    startWorkoutSession: (day) => {
        WorkoutPlanner.currentSessionDay = day;
        WorkoutPlanner.expandedExercises = {};
        WorkoutPlanner.renderSplitDays();

        document.getElementById("current-workout-title").innerHTML = `<i class="fa-solid fa-fire text-emerald"></i> ${day.name}`;
        document.getElementById("current-workout-sub").innerText = "Pulsa la imagen de cada ejercicio para desplegar su guía biomecánica con foto y pasos directamente aquí.";
        document.getElementById("btn-finish-workout").disabled = false;

        const container = document.getElementById("workout-exercises-container");
        container.innerHTML = "";

        day.exercises.forEach((exItem, exIdx) => {
            const exData = EXERCISES_DATABASE.find(e => e.id === exItem.exerciseId) || {
                id: exItem.exerciseId,
                name: exItem.exerciseId,
                tips: "Controla la fase excéntrica.",
                tempo: "2-0-1-0",
                image: "img/ex_bench.jpg",
                muscleGroup: "General",
                steps: ["Realiza el movimiento de forma controlada."],
                mistakes: "Evita usar inercia."
            };

            const exCard = document.createElement("div");
            exCard.className = "exercise-log-card";
            exCard.id = `exercise-card-${exIdx}`;

            let setsHtml = "";
            for (let s = 1; s <= exItem.sets; s++) {
                setsHtml += `
                    <div class="set-row">
                        <span style="font-weight: 800; color: var(--text-muted);">#${s}</span>
                        <div>
                            <input type="number" class="set-input weight-input" placeholder="kg" value="80" id="ex-${exIdx}-set-${s}-w">
                        </div>
                        <div>
                            <input type="number" class="set-input reps-input" placeholder="reps" value="${exItem.targetReps.split('-')[0]}" id="ex-${exIdx}-set-${s}-r">
                        </div>
                        <div>
                            <select class="set-input rir-input" id="ex-${exIdx}-set-${s}-rir">
                                <option value="0">RIR 0 (Fallo)</option>
                                <option value="1" selected>RIR 1</option>
                                <option value="2">RIR 2</option>
                                <option value="3">RIR 3</option>
                            </select>
                        </div>
                        <button class="set-complete-btn" onclick="WorkoutPlanner.toggleSetComplete(this, ${exData.restSeconds || 120})">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </div>
                `;
            }

            // Build the steps HTML for the inline guide
            const stepsArr = exData.steps || ["Realiza el movimiento de forma controlada."];
            const stepsLiHtml = stepsArr.map(s => `<li>${s}</li>`).join("");

            exCard.innerHTML = `
                <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 14px;">
                    <div style="width: 100px; height: 65px; border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0; border: 2px solid var(--border-glass); cursor: pointer; position: relative; transition: all 0.2s ease;" 
                         id="ex-thumb-${exIdx}"
                         onclick="WorkoutPlanner.toggleInlineGuide(${exIdx}, '${exData.id}')"
                         title="Ver guía biomecánica">
                        <img src="${exData.image}" alt="${exData.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
                        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.35); transition: opacity 0.2s;">
                            <i class="fa-solid fa-expand" style="color: white; font-size: 18px; filter: drop-shadow(0 0 6px rgba(0,0,0,0.7));"></i>
                        </div>
                    </div>
                    <div style="flex: 1;">
                        <div class="exercise-name" style="cursor: pointer;" onclick="WorkoutPlanner.toggleInlineGuide(${exIdx}, '${exData.id}')">
                            ${exData.name}
                            <i class="fa-solid fa-chevron-down" id="ex-chevron-${exIdx}" style="font-size: 11px; color: var(--primary-emerald); margin-left: 8px; transition: transform 0.3s;"></i>
                        </div>
                        <div class="exercise-meta">
                            <span><i class="fa-solid fa-layer-group text-emerald"></i> ${exItem.sets}x${exItem.targetReps}</span>
                            <span><i class="fa-solid fa-gauge text-cyan"></i> RIR ${exItem.targetRir}</span>
                            <span><i class="fa-solid fa-clock text-amber"></i> ${exData.restSeconds || 120}s</span>
                            <span><i class="fa-solid fa-music text-purple"></i> ${exData.tempo}</span>
                        </div>
                    </div>
                </div>

                <!-- INLINE BIOMECHANICAL GUIDE (toggle on/off) -->
                <div id="inline-guide-${exIdx}" class="inline-exercise-guide" style="display: none;">
                    <div class="inline-guide-media">
                        <img src="${exData.image}" alt="${exData.name}">
                        <div class="guide-overlay">
                            <span style="font-weight: 800; font-size: 13px; color: var(--primary-emerald);">
                                <i class="fa-solid fa-bullseye"></i> ${exData.category} — ${exData.type}
                            </span>
                            <span style="font-size: 11px; background: rgba(0,255,157,0.2); padding: 4px 12px; border-radius: var(--radius-full); color: var(--primary-emerald); border: 1px solid var(--primary-emerald); font-weight: 800;">
                                Tempo: ${exData.tempo}
                            </span>
                        </div>
                    </div>
                    <div class="inline-guide-body">
                        <h4 style="font-size: 15px; font-weight: 800; color: var(--accent-cyan); margin: 0;">
                            <i class="fa-solid fa-list-ol"></i> Ejecución Paso a Paso
                        </h4>
                        <ul class="step-list">
                            ${stepsLiHtml}
                        </ul>
                        <div class="mistakes-alert">
                            <strong><i class="fa-solid fa-triangle-exclamation"></i> Errores Comunes:</strong> ${exData.mistakes || "Evita usar inercia o rango parcial."}
                        </div>
                    </div>
                </div>

                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px; background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
                    <i class="fa-solid fa-lightbulb" style="color: var(--accent-amber);"></i> <strong>Tip:</strong> ${exData.tips}
                </div>

                <div class="sets-table">
                    <div style="display: grid; grid-template-columns: 40px 1fr 1fr 1fr 44px; gap: 14px; font-size: 11px; color: var(--text-muted); text-align: center; margin-bottom: 6px;">
                        <span>Serie</span><span>Peso (kg)</span><span>Reps</span><span>RIR</span><span>✓</span>
                    </div>
                    ${setsHtml}
                </div>
            `;

            container.appendChild(exCard);
        });
    },

    toggleInlineGuide: (exIdx, exId) => {
        const guide = document.getElementById(`inline-guide-${exIdx}`);
        const chevron = document.getElementById(`ex-chevron-${exIdx}`);
        const thumb = document.getElementById(`ex-thumb-${exIdx}`);

        if (!guide) return;

        const isVisible = guide.style.display !== "none";

        if (isVisible) {
            guide.style.display = "none";
            if (chevron) chevron.style.transform = "rotate(0deg)";
            if (thumb) thumb.style.borderColor = "var(--border-glass)";
        } else {
            guide.style.display = "block";
            if (chevron) chevron.style.transform = "rotate(180deg)";
            if (thumb) thumb.style.borderColor = "var(--primary-emerald)";
            if (App.soundEnabled) SoundFX.playCheck();
        }
    },

    showExerciseDetailModal: (exId) => {
        const exData = EXERCISES_DATABASE.find(e => e.id === exId);
        if (!exData) return;

        document.getElementById("ex-detail-name").innerText = exData.name;
        document.getElementById("ex-detail-mistakes").innerText = exData.mistakes || "No fuerces el rango articular más allá de tu movilidad activa.";

        const tagsContainer = document.getElementById("ex-detail-tags");
        tagsContainer.innerHTML = `
            <span class="badge-pro">${exData.category}</span>
            <span class="badge-pro" style="color: var(--primary-emerald);">${exData.type}</span>
            <span class="badge-pro" style="color: var(--accent-amber);">Tempo: ${exData.tempo}</span>
        `;

        const stepsList = document.getElementById("ex-detail-steps-list");
        stepsList.innerHTML = "";
        (exData.steps || ["Realiza el movimiento de forma fluida y controlada."]).forEach(step => {
            const li = document.createElement("li");
            li.innerText = step;
            stepsList.appendChild(li);
        });

        const mediaBox = document.getElementById("ex-detail-media-container");
        mediaBox.innerHTML = `
            <img src="${exData.image}" alt="${exData.name}" style="width: 100%; height: 280px; object-fit: cover; display: block; border-radius: var(--radius-sm);">
        `;

        document.getElementById("modal-exercise-detail").classList.add("active");
        if (App.soundEnabled) SoundFX.playCheck();
    },

    toggleSetComplete: (btn, restSeconds) => {
        btn.classList.toggle("done");
        if (btn.classList.contains("done")) {
            if (App.soundEnabled) SoundFX.playCheck();
            WorkoutPlanner.startRestTimer(restSeconds);
        }
    },

    startRestTimer: (seconds) => {
        clearInterval(WorkoutPlanner.timerInterval);
        let remaining = seconds;
        const display = document.getElementById("timer-count");

        WorkoutPlanner.timerInterval = setInterval(() => {
            const mins = Math.floor(remaining / 60);
            const secs = remaining % 60;
            display.innerText = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

            if (remaining <= 0) {
                clearInterval(WorkoutPlanner.timerInterval);
                display.innerText = "¡A POR EL SET!";
                if (App.soundEnabled) SoundFX.playTimerAlarm();
            } else {
                remaining--;
            }
        }, 1000);
    },

    finishSession: () => {
        if (!WorkoutPlanner.currentSessionDay) return;

        if (App.soundEnabled) SoundFX.playTimerAlarm();
        document.getElementById("btn-finish-workout").disabled = true;

        // Registrar volumen en HeatMap Engine
        HeatMapEngine.registerCompletedDay(WorkoutPlanner.currentSessionDay);

        // Incrementar estadisticas de entrenamientos para logros
        if (typeof StorageUtil !== 'undefined') {
            const stats = StorageUtil.get('stats', { workoutsCompleted: 0, checkIns: 0 });
            stats.workoutsCompleted += 1;
            StorageUtil.set('stats', stats);
        }
        if (typeof AchievementsModule !== 'undefined') {
            AchievementsModule.checkAchievements();
        }

        // Abrir autorregulador de esfuerzo RPE
        if (typeof AutoRegulator !== 'undefined') {
            AutoRegulator.showPostSessionFeedback();
        } else {
            App.triggerConfetti();
            alert(`¡Sesión Élite Completada! Has registrado tu entrenamiento de ${WorkoutPlanner.currentSessionDay.name}.`);
        }
    },

    /* ═══════════════════════════════════════════════════════════════
       MODO 1-CLIC ASISTIDO (ULTRA FÁCIL PARA NOVATOS)
       ═══════════════════════════════════════════════════════════════ */
    /* ═══════════════════════════════════════════════════════════════
       MODO 1-CLIC ASISTIDO (ULTRA FÁCIL PARA NOVATOS)
       ═══════════════════════════════════════════════════════════════ */
    startGuided1ClickFlow: (dayIndex = 0) => {
        let plan = StorageUtil.get("apexlab_generated_plan", null);
        let availableDays = [];

        if (plan && plan.weekPlan && plan.weekPlan.length > 0) {
            availableDays = plan.weekPlan;
        } else if (WorkoutPlanner.activeRoutine && WorkoutPlanner.activeRoutine.days && WorkoutPlanner.activeRoutine.days.length > 0) {
            availableDays = WorkoutPlanner.activeRoutine.days;
        } else if (typeof SCIENTIFIC_ROUTINES !== "undefined" && SCIENTIFIC_ROUTINES.length > 0) {
            availableDays = SCIENTIFIC_ROUTINES[0].days;
        }

        if (!availableDays || availableDays.length === 0) {
            alert("Cargando protocolo de entrenamiento...");
            return;
        }

        const validIndex = (dayIndex >= 0 && dayIndex < availableDays.length) ? dayIndex : 0;
        WorkoutPlanner.availableGuidedDays = availableDays;
        WorkoutPlanner.currentGuidedDayIndex = validIndex;
        WorkoutPlanner.currentGuidedDay = availableDays[validIndex];
        WorkoutPlanner.guidedExerciseIndex = 0;
        WorkoutPlanner.guidedSetIndex = 1;
        WorkoutPlanner.renderGuidedModalStep();
    },

    switchGuidedDay: (dayIndex) => {
        WorkoutPlanner.startGuided1ClickFlow(dayIndex);
    },

    renderGuidedModalStep: () => {
        const day = WorkoutPlanner.currentGuidedDay;
        if (!day || !day.exercises) return;

        const exItem = day.exercises[WorkoutPlanner.guidedExerciseIndex];
        
        if (!exItem) {
            WorkoutPlanner.finishGuidedSessionAndPromptNutrition();
            return;
        }

        const exData = (typeof EXERCISES_DATABASE !== "undefined" ? EXERCISES_DATABASE.find(e => e.id === exItem.exerciseId) : null) || {
            id: exItem.exerciseId, name: exItem.exerciseId, image: "img/ex_bench.jpg", tempo: "2-0-1-0"
        };

        const totalEx = day.exercises.length;
        const totalSets = exItem.sets || 3;
        const currentExNum = WorkoutPlanner.guidedExerciseIndex + 1;

        let modal = document.getElementById("modal-guided-flow");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "modal-guided-flow";
            modal.className = "modal-backdrop active";
            document.body.appendChild(modal);
        }
        if (typeof App !== "undefined" && typeof App.closeAllModals === "function") App.closeAllModals();
        modal.classList.add("active");
        document.body.classList.add("modal-open");

        const nextExItem = day.exercises[WorkoutPlanner.guidedExerciseIndex + 1];
        const nextExData = nextExItem ? ((typeof EXERCISES_DATABASE !== "undefined" ? EXERCISES_DATABASE.find(e => e.id === nextExItem.exerciseId) : null) || { name: nextExItem.exerciseId }) : null;

        // Construct day switcher tabs HTML
        let dayTabsHtml = "";
        if (WorkoutPlanner.availableGuidedDays && WorkoutPlanner.availableGuidedDays.length > 1) {
            dayTabsHtml = `<div style="display: flex; gap: 6px; overflow-x: auto; margin-bottom: 12px; padding-bottom: 4px;">`;
            WorkoutPlanner.availableGuidedDays.forEach((d, idx) => {
                const isActive = idx === WorkoutPlanner.currentGuidedDayIndex;
                dayTabsHtml += `
                    <button onclick="WorkoutPlanner.switchGuidedDay(${idx})" style="flex: 1; min-width: 90px; padding: 6px 10px; font-size: 11px; font-weight: 700; border-radius: 8px; border: 1px solid ${isActive ? 'var(--primary-emerald)' : 'var(--border-glass)'}; background: ${isActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)'}; color: ${isActive ? 'var(--primary-emerald)' : 'var(--text-muted)'}; cursor: pointer; white-space: nowrap;">
                        ${d.name || 'Día ' + (idx + 1)}
                    </button>
                `;
            });
            dayTabsHtml += `</div>`;
        }

        // Construct interactive set bubbles HTML
        let setBubblesHtml = "";
        for (let s = 1; s <= totalSets; s++) {
            if (s < WorkoutPlanner.guidedSetIndex) {
                setBubblesHtml += `
                    <div style="flex: 1; padding: 8px 4px; background: rgba(52, 211, 153, 0.15); border: 1px solid var(--primary-emerald); border-radius: 8px; color: var(--primary-emerald); font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        <i class="fa-solid fa-check-circle"></i> Set ${s}
                    </div>`;
            } else if (s === WorkoutPlanner.guidedSetIndex) {
                setBubblesHtml += `
                    <div style="flex: 1; padding: 8px 4px; background: rgba(245, 158, 11, 0.2); border: 2px solid var(--accent-amber); border-radius: 8px; color: var(--accent-amber); font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 4px; animation: pulse 1.5s infinite;">
                        <i class="fa-solid fa-bolt"></i> Set ${s}
                    </div>`;
            } else {
                setBubblesHtml += `
                    <div style="flex: 1; padding: 8px 4px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-glass); border-radius: 8px; color: var(--text-muted); font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 4px;">
                        <i class="fa-solid fa-hourglass-start"></i> Set ${s}
                    </div>`;
            }
        }

        const setsLeft = (totalSets - WorkoutPlanner.guidedSetIndex) + 1;

        // Calculate overall progress percentage across all exercises and sets
        const totalAllSets = day.exercises.reduce((sum, ex) => sum + (ex.sets || 3), 0);
        const completedSets = day.exercises.slice(0, WorkoutPlanner.guidedExerciseIndex).reduce((sum, ex) => sum + (ex.sets || 3), 0) + (WorkoutPlanner.guidedSetIndex - 1);
        const progressPct = Math.round((completedSets / totalAllSets) * 100);

        modal.innerHTML = `
            <div class="modal-card-epic glass-card-epic" style="max-width: 520px; width: 92%; text-align: center; padding: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span class="badge-pro" style="color: var(--accent-amber);"><i class="fa-solid fa-wand-magic-sparkles"></i> Asistente 1-Clic • ${day.name || 'Entrenamiento'}</span>
                    <button class="modal-close-btn" onclick="document.getElementById('modal-guided-flow').classList.remove('active')">&times;</button>
                </div>

                ${dayTabsHtml}

                <div style="margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
                        <span>Progreso de la rutina</span>
                        <strong>${progressPct}% completado</strong>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
                        <div style="height: 100%; width: ${progressPct}%; background: linear-gradient(90deg, var(--primary-emerald), var(--accent-cyan)); transition: width 0.3s ease;"></div>
                    </div>
                </div>

                <!-- Imagen & Título -->
                <div style="position: relative; overflow: hidden; border-radius: var(--radius-sm); margin-bottom: 12px;">
                    <img src="${exData.image}" onerror="this.src='img/ex_bench.jpg'" style="width: 100%; height: 185px; object-fit: cover; border-radius: var(--radius-sm);" alt="${exData.name}">
                    <div style="position: absolute; bottom: 0; inset-x: 0; background: linear-gradient(0deg, rgba(3,7,18,0.95), transparent); padding: 12px 16px; text-align: left;">
                        <span style="font-size: 11px; color: var(--accent-cyan); font-weight: 800;">EJERCICIO ${currentExNum} DE ${totalEx}</span>
                        <h3 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-top: 2px;">${exData.name}</h3>
                    </div>
                </div>

                <!-- 2D ANATOMICAL MAP WITH GLOWING MUSCLE -->
                ${typeof HeatMapEngine !== "undefined" && typeof HeatMapEngine.getMiniMuscleSvgHtml === "function" ? HeatMapEngine.getMiniMuscleSvgHtml(exData.muscleGroup) : ""}

                <!-- Set Bubbles Track -->
                <div style="display: flex; gap: 8px; margin-bottom: 14px;">
                    ${setBubblesHtml}
                </div>

                <!-- Macro Metrics per Set -->
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 16px; display: flex; justify-content: space-around;">
                    <div>
                        <span style="font-size: 11px; color: var(--text-muted); display: block;">Serie Actual</span>
                        <strong style="font-size: 18px; color: var(--accent-amber);">${WorkoutPlanner.guidedSetIndex} / ${totalSets}</strong>
                    </div>
                    <div style="border-left: 1px solid var(--border-glass); padding-left: 12px;">
                        <span style="font-size: 11px; color: var(--text-muted); display: block;">Reps Meta</span>
                        <strong style="font-size: 18px; color: var(--accent-cyan);">${exItem.targetReps || '8-10'}</strong>
                    </div>
                    <div style="border-left: 1px solid var(--border-glass); padding-left: 12px;">
                        <span style="font-size: 11px; color: var(--text-muted); display: block;">Carga Prescrita</span>
                        <strong style="font-size: 18px; color: var(--primary-emerald);">${exItem.prescribedWeight > 0 ? exItem.prescribedWeight + ' kg' : 'RIR 2'}</strong>
                    </div>
                </div>

                <!-- Main Action Button -->
                <button class="btn-epic-primary" style="width: 100%; padding: 16px; font-size: 16px; margin-bottom: 8px;" onclick="WorkoutPlanner.completeGuidedSet(${totalSets})">
                    <i class="fa-solid fa-circle-check"></i> COMPLETAR SERIE ${WorkoutPlanner.guidedSetIndex} (${setsLeft > 1 ? 'Quedan ' + (setsLeft - 1) + ' series' : '¡Última serie de este ejercicio!'})
                </button>

                <!-- Next exercise preview badge -->
                ${nextExData ? `
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">
                        <i class="fa-solid fa-forward text-cyan"></i> A continuación: <strong style="color: var(--text-main);">${nextExData.name}</strong>
                    </div>
                ` : `
                    <div style="font-size: 11px; color: var(--primary-emerald); margin-bottom: 10px;">
                        <i class="fa-solid fa-flag-checkered"></i> ¡Último ejercicio de la rutina de hoy!
                    </div>
                `}

                <button class="btn-sm btn-epic-secondary" style="width: 100%;" onclick="AutoRegulator.showSubstituteModal('${exItem.exerciseId}')">
                    <i class="fa-solid fa-arrows-rotate text-cyan"></i> Cambiar por Máquina Asistida / Alternativa
                </button>
            </div>
        `;

        if (typeof App !== "undefined" && App.soundEnabled && typeof SoundFX !== "undefined") SoundFX.playCheck();
    },

    completeGuidedSet: (maxSets) => {
        if (WorkoutPlanner.guidedSetIndex < maxSets) {
            WorkoutPlanner.guidedSetIndex++;
        } else {
            WorkoutPlanner.guidedExerciseIndex++;
            WorkoutPlanner.guidedSetIndex = 1;
        }
        if (typeof App !== "undefined" && App.soundEnabled && typeof SoundFX !== "undefined") SoundFX.playCheck();
        WorkoutPlanner.renderGuidedModalStep();
    },

    finishGuidedSessionAndPromptNutrition: () => {
        const modal = document.getElementById("modal-guided-flow");
        if (modal) modal.classList.remove("active");

        if (typeof App !== "undefined" && typeof App.triggerConfetti === "function") App.triggerConfetti();

        // Increment stats
        if (typeof StorageUtil !== 'undefined') {
            const stats = StorageUtil.get('stats', { workoutsCompleted: 0, checkIns: 0 });
            stats.workoutsCompleted += 1;
            StorageUtil.set('stats', stats);
        }
        if (typeof AchievementsModule !== 'undefined') AchievementsModule.checkAchievements();

        // Launch Post Workout Nutrition Auto-Prompt Modal
        let nutModal = document.getElementById("modal-post-workout-prompt");
        if (!nutModal) {
            nutModal = document.createElement("div");
            nutModal.id = "modal-post-workout-prompt";
            nutModal.className = "modal-backdrop active";
            document.body.appendChild(nutModal);
        } else {
            nutModal.classList.add("active");
        }

        nutModal.innerHTML = `
            <div class="modal-card-epic glass-card-epic" style="max-width: 480px; width: 90%; text-align: center; padding: 28px;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
                <h3 style="font-family: var(--font-heading); font-size: 22px; color: var(--primary-emerald); margin-bottom: 6px;">¡Entrenamiento Completado 100%!</h3>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">
                    ¡Excelente trabajo! Tu ventana anabólica está abierta. ¿Registramos tu batido/comida post-entreno en 1 clic?
                </p>

                <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                    <button class="btn-epic-primary" onclick="document.getElementById('modal-post-workout-prompt').classList.remove('active'); FoodTracker.quickAddFood('whey-protein', 30, 'post-workout'); App.switchTab('nutrition');">
                        <i class="fa-solid fa-bottle-droplet"></i> +1 Cazo Whey Protein (24g P / 112 kcal)
                    </button>
                    <button class="btn-epic-secondary" onclick="document.getElementById('modal-post-workout-prompt').classList.remove('active'); FoodTracker.addFitnessComboPlate('porridge-proteico', 'post-workout'); App.switchTab('nutrition');">
                        <i class="fa-solid fa-bowl-rice"></i> +Porridge Avena & Whey (35g P / 410 kcal)
                    </button>
                    <button class="btn-epic-secondary" onclick="document.getElementById('modal-post-workout-prompt').classList.remove('active'); FoodTracker.addFitnessComboPlate('bowl-pollo', 'post-workout'); App.switchTab('nutrition');">
                        <i class="fa-solid fa-utensils"></i> +Bowl Pollo & Arroz (42g P / 490 kcal)
                    </button>
                </div>

                <button class="btn-sm btn-epic-secondary" style="width: 100%; border: none; color: var(--text-muted);" onclick="document.getElementById('modal-post-workout-prompt').classList.remove('active'); App.switchTab('dashboard');">
                    Más Tarde (Volver al Inicio)
                </button>
            </div>
        `;
    }
};
