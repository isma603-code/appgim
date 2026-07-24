/**
 * ══════════════════════════════════════════════════════════════════
 *  WIZARD DE ONBOARDING INTERACTIVO — TEST DE 8 PASOS
 *  Genera un perfil de entrenamiento personalizado
 * ══════════════════════════════════════════════════════════════════
 */

const OnboardingWizard = {
    currentStep: 0,
    totalSteps: 8,
    answers: {},

    steps: [
        {
            id: "experience",
            title: "¿Cuál es tu nivel de experiencia?",
            subtitle: "Sé honesto — esto determina la intensidad y complejidad de tu plan.",
            type: "single",
            options: [
                { value: "beginner", label: "Principiante", desc: "Menos de 1 año entrenando", icon: "fa-seedling", color: "#00ff9d" },
                { value: "intermediate", label: "Intermedio", desc: "1 a 3 años entrenando", icon: "fa-dumbbell", color: "#00f0ff" },
                { value: "advanced", label: "Avanzado", desc: "Más de 3 años entrenando", icon: "fa-fire", color: "#ffb700" }
            ]
        },
        {
            id: "goal",
            title: "¿Cuál es tu objetivo principal?",
            subtitle: "Tu meta define los rangos de repeticiones, volumen y distribución de macros.",
            type: "single",
            options: [
                { value: "hypertrophy", label: "Ganar Músculo", desc: "Hipertrofia máxima y crecimiento", icon: "fa-up-right-and-down-left-from-center", color: "#00ff9d" },
                { value: "strength", label: "Ganar Fuerza", desc: "Mejorar 1RM en los básicos", icon: "fa-bolt-lightning", color: "#ffb700" },
                { value: "cut", label: "Perder Grasa", desc: "Definición muscular con déficit calórico", icon: "fa-fire-flame-curved", color: "#ff2e63" },
                { value: "recomp", label: "Recomposición", desc: "Ganar músculo y perder grasa a la vez", icon: "fa-scale-balanced", color: "#00f0ff" }
            ]
        },
        {
            id: "days",
            title: "¿Cuántos días puedes entrenar por semana?",
            subtitle: "El split se adapta automáticamente a tu disponibilidad.",
            type: "single",
            options: [
                { value: 3, label: "3 días", desc: "Full Body o Torso/Pierna/Full", icon: "fa-3", color: "#00f0ff" },
                { value: 4, label: "4 días", desc: "Upper / Lower (Torso / Pierna)", icon: "fa-4", color: "#00ff9d" },
                { value: 5, label: "5 días", desc: "Powerbuilding o PPL modificado", icon: "fa-5", color: "#ffb700" },
                { value: 6, label: "6 días", desc: "PPL completo (Frecuencia 2)", icon: "fa-6", color: "#d946ef" }
            ]
        },
        {
            id: "duration",
            title: "¿Cuánto tiempo tienes por sesión?",
            subtitle: "Ajustamos el número de ejercicios y descansos.",
            type: "single",
            options: [
                { value: 45, label: "45 minutos", desc: "Sesión compacta y eficiente", icon: "fa-bolt", color: "#ff2e63" },
                { value: 60, label: "60 minutos", desc: "Sesión estándar equilibrada", icon: "fa-clock", color: "#00f0ff" },
                { value: 75, label: "75 minutos", desc: "Sesión completa con accesorios", icon: "fa-hourglass-half", color: "#00ff9d" },
                { value: 90, label: "90 minutos", desc: "Sesión de alto volumen élite", icon: "fa-stopwatch", color: "#ffb700" }
            ]
        },
        {
            id: "equipment",
            title: "¿Qué equipamiento tienes disponible?",
            subtitle: "Seleccionamos ejercicios adecuados a tu entorno.",
            type: "single",
            options: [
                { value: "full", label: "Gimnasio Completo", desc: "Barras, mancuernas, poleas, máquinas", icon: "fa-building", color: "#00ff9d" },
                { value: "home", label: "Home Gym", desc: "Barra, mancuernas, banco ajustable", icon: "fa-house", color: "#00f0ff" },
                { value: "minimal", label: "Mínimo", desc: "Solo mancuernas y peso corporal", icon: "fa-hand-fist", color: "#ffb700" }
            ]
        },
        {
            id: "injuries",
            title: "¿Tienes alguna lesión o limitación?",
            subtitle: "Excluiremos ejercicios que puedan agravarlo. Puedes seleccionar varias.",
            type: "multi",
            options: [
                { value: "none", label: "Ninguna", desc: "Estoy 100% sano", icon: "fa-shield-halved", color: "#00ff9d" },
                { value: "shoulder", label: "Hombro", desc: "Dolor o limitación de movilidad", icon: "fa-user-injured", color: "#ff2e63" },
                { value: "knee", label: "Rodilla", desc: "Dolor en flexión profunda", icon: "fa-user-injured", color: "#ffb700" },
                { value: "lower_back", label: "Zona Lumbar", desc: "Dolor o hernias discales", icon: "fa-user-injured", color: "#d946ef" }
            ]
        },
        {
            id: "priority",
            title: "¿Qué músculo quieres priorizar?",
            subtitle: "Añadiremos +2 series semanales en ese grupo.",
            type: "single",
            options: [
                { value: "balanced", label: "Todo Equilibrado", desc: "Desarrollo proporcional", icon: "fa-scale-balanced", color: "#00f0ff" },
                { value: "chest", label: "Pecho", desc: "Más volumen para pectoral", icon: "fa-heart-pulse", color: "#ff2e63" },
                { value: "back", label: "Espalda", desc: "Más ancho y grosor dorsal", icon: "fa-child-reaching", color: "#00ff9d" },
                { value: "legs", label: "Piernas", desc: "Cuádriceps, isquios y glúteos", icon: "fa-person-walking", color: "#ffb700" },
                { value: "arms", label: "Brazos", desc: "Más volumen para bíceps y tríceps", icon: "fa-hand-fist", color: "#d946ef" }
            ]
        },
        {
            id: "strength_test",
            title: "Test de Fuerza — Tus Marcas Actuales",
            subtitle: "Introduce el peso y las repeticiones que haces en los 3 básicos. Esto calcula tus pesos exactos.",
            type: "strength",
            lifts: [
                { id: "bench", name: "Press de Banca", icon: "fa-dumbbell" },
                { id: "squat", name: "Sentadilla Trasera", icon: "fa-person-arrow-down-to-line" },
                { id: "deadlift", name: "Peso Muerto", icon: "fa-arrow-up-from-ground-water" }
            ]
        }
    ],

    init: (containerId) => {
        OnboardingWizard.containerId = containerId;
        const savedAnswers = StorageUtil.get("apexlab_wizard_answers", null);
        if (savedAnswers) {
            OnboardingWizard.answers = savedAnswers;
        }
    },

    startWizard: () => {
        OnboardingWizard.currentStep = 0;
        OnboardingWizard.answers = {};
        OnboardingWizard.renderStep();
    },

    renderStep: () => {
        const container = document.getElementById(OnboardingWizard.containerId);
        if (!container) return;

        const step = OnboardingWizard.steps[OnboardingWizard.currentStep];
        const progress = ((OnboardingWizard.currentStep + 1) / OnboardingWizard.totalSteps) * 100;

        let optionsHtml = "";

        if (step.type === "single" || step.type === "multi") {
            optionsHtml = `<div class="wizard-options-grid">`;
            step.options.forEach(opt => {
                const selected = step.type === "multi"
                    ? (OnboardingWizard.answers[step.id] || []).includes(opt.value)
                    : OnboardingWizard.answers[step.id] === opt.value;

                optionsHtml += `
                    <div class="wizard-option-card ${selected ? 'selected' : ''}" 
                         onclick="OnboardingWizard.selectOption('${step.id}', '${opt.value}', '${step.type}')"
                         style="--card-accent: ${opt.color};">
                        <div class="wizard-option-icon" style="color: ${opt.color};">
                            <i class="fa-solid ${opt.icon}"></i>
                        </div>
                        <div class="wizard-option-text">
                            <h4>${opt.label}</h4>
                            <p>${opt.desc}</p>
                        </div>
                        <div class="wizard-check ${selected ? 'active' : ''}">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                    </div>
                `;
            });
            optionsHtml += `</div>`;
        } else if (step.type === "strength") {
            const saved = OnboardingWizard.answers.strength_test || {};
            optionsHtml = `<div class="strength-test-grid">`;
            step.lifts.forEach(lift => {
                const w = saved[lift.id + "_weight"] || "";
                const r = saved[lift.id + "_reps"] || "";
                optionsHtml += `
                    <div class="strength-test-card glass-card-epic">
                        <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
                            <i class="fa-solid ${lift.icon}" style="font-size:22px; color: var(--accent-cyan);"></i>
                            <h4 style="font-size:16px;">${lift.name}</h4>
                        </div>
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <div>
                                <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Peso (kg)</label>
                                <input type="number" class="form-control-epic" id="str-${lift.id}-w" value="${w}" placeholder="ej: 80">
                            </div>
                            <div>
                                <label style="font-size:12px; color:var(--text-muted); display:block; margin-bottom:6px;">Repeticiones</label>
                                <input type="number" class="form-control-epic" id="str-${lift.id}-r" value="${r}" placeholder="ej: 6">
                            </div>
                        </div>
                        <div style="margin-top:8px; font-size:12px; color:var(--text-muted);">
                            1RM Estimado: <strong style="color:var(--primary-emerald);" id="str-${lift.id}-1rm">—</strong>
                        </div>
                    </div>
                `;
            });
            optionsHtml += `</div>`;
        }

        container.innerHTML = `
            <div class="wizard-container">
                <div class="wizard-progress-bar">
                    <div class="wizard-progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="wizard-step-indicator">
                    Paso ${OnboardingWizard.currentStep + 1} de ${OnboardingWizard.totalSteps}
                </div>

                <div class="wizard-step-content">
                    <h2 class="wizard-step-title">${step.title}</h2>
                    <p class="wizard-step-subtitle">${step.subtitle}</p>
                    ${optionsHtml}
                </div>

                <div class="wizard-nav-buttons">
                    ${OnboardingWizard.currentStep > 0
                        ? `<button class="btn-epic-secondary" onclick="OnboardingWizard.prevStep()"><i class="fa-solid fa-arrow-left"></i> Atrás</button>`
                        : `<div></div>`
                    }
                    ${OnboardingWizard.currentStep < OnboardingWizard.totalSteps - 1
                        ? `<button class="btn-epic-primary" onclick="OnboardingWizard.nextStep()">Siguiente <i class="fa-solid fa-arrow-right"></i></button>`
                        : `<button class="btn-epic-primary" onclick="OnboardingWizard.finishWizard()" style="background: linear-gradient(135deg, #00ff9d, #00f0ff);"><i class="fa-solid fa-wand-magic-sparkles"></i> Generar Mi Plan Personalizado</button>`
                    }
                </div>
            </div>
        `;

        // Bind strength test real-time 1RM calculation
        if (step.type === "strength") {
            step.lifts.forEach(lift => {
                const wInput = document.getElementById(`str-${lift.id}-w`);
                const rInput = document.getElementById(`str-${lift.id}-r`);
                const update = () => {
                    const w = parseFloat(wInput.value) || 0;
                    const r = parseInt(rInput.value) || 1;
                    const rm = r === 1 ? w : Math.round(w * (36 / (37 - r)) * 10) / 10;
                    document.getElementById(`str-${lift.id}-1rm`).innerText = rm > 0 ? `${rm} kg` : "—";
                };
                wInput.addEventListener("input", update);
                rInput.addEventListener("input", update);
                update();
            });
        }
    },

    selectOption: (stepId, value, type) => {
        if (type === "multi") {
            if (!OnboardingWizard.answers[stepId]) OnboardingWizard.answers[stepId] = [];
            const arr = OnboardingWizard.answers[stepId];

            if (value === "none") {
                OnboardingWizard.answers[stepId] = ["none"];
            } else {
                OnboardingWizard.answers[stepId] = arr.filter(v => v !== "none");
                const idx = arr.indexOf(value);
                if (idx > -1) arr.splice(idx, 1);
                else arr.push(value);
            }
        } else {
            OnboardingWizard.answers[stepId] = isNaN(value) ? value : parseInt(value);
        }

        if (App.soundEnabled) SoundFX.playCheck();
        OnboardingWizard.renderStep();
    },

    nextStep: () => {
        const step = OnboardingWizard.steps[OnboardingWizard.currentStep];

        // Validate current step
        if (step.type === "strength") {
            OnboardingWizard.saveStrengthData();
        } else if (!OnboardingWizard.answers[step.id] ||
            (Array.isArray(OnboardingWizard.answers[step.id]) && OnboardingWizard.answers[step.id].length === 0)) {
            alert("Por favor selecciona una opción antes de continuar.");
            return;
        }

        if (OnboardingWizard.currentStep < OnboardingWizard.totalSteps - 1) {
            OnboardingWizard.currentStep++;
            OnboardingWizard.renderStep();
        }
    },

    prevStep: () => {
        if (OnboardingWizard.currentStep > 0) {
            OnboardingWizard.currentStep--;
            OnboardingWizard.renderStep();
        }
    },

    saveStrengthData: () => {
        const data = {};
        OnboardingWizard.steps[7].lifts.forEach(lift => {
            data[lift.id + "_weight"] = parseFloat(document.getElementById(`str-${lift.id}-w`).value) || 0;
            data[lift.id + "_reps"] = parseInt(document.getElementById(`str-${lift.id}-r`).value) || 1;
            const w = data[lift.id + "_weight"];
            const r = data[lift.id + "_reps"];
            data[lift.id + "_1rm"] = r === 1 ? w : Math.round(w * (36 / (37 - r)) * 10) / 10;
        });
        OnboardingWizard.answers.strength_test = data;
    },

    finishWizard: () => {
        OnboardingWizard.saveStrengthData();
        StorageUtil.set("apexlab_wizard_answers", OnboardingWizard.answers);
        StorageUtil.set("apexlab_wizard_completed", true);

        if (App.soundEnabled) SoundFX.playTimerAlarm();
        App.triggerConfetti();

        // Generate the plan
        PlanGenerator.generatePlan(OnboardingWizard.answers);
    }
};
