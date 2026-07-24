/**
|--------------------------------------------------------------------------
| CATÁLOGO COMPLETO DE PROGRAMAS DE ENTRENAMIENTO CIENTÍFICOS ÉLITE
| 6 Programas con días completos y uso masivo de la base de 51 ejercicios
|--------------------------------------------------------------------------
*/

const SCIENTIFIC_ROUTINES = [

    // ═══════════════════════════════════════════════════════════════
    //  1. PUSH / PULL / LEGS — 6 DÍAS HIPERTROFIA ÉLITE
    // ═══════════════════════════════════════════════════════════════
    {
        id: "ppl-6day",
        name: "Push / Pull / Legs (PPL) — 6 Días Hipertrofia",
        frequency: "6 días / semana",
        targetGoal: "Hipertrofia Máxima — Frecuencia 2 por músculo",
        description: "El estándar de oro en evidencia científica (Renaissance Periodization). Cada músculo se entrena 2x/semana en rango MAV óptimo (14-20 series/semana).",
        days: [
            {
                dayId: "ppl-push1", name: "Día 1: PUSH A — Pecho, Hombro, Tríceps",
                exercises: [
                    { exerciseId: "bench-press-barbell", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "incline-dumbbell-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "chest-flyes-cable", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "overhead-press", sets: 3, targetReps: "8-10", targetRir: 2 },
                    { exerciseId: "lateral-raises-dumbbell", sets: 4, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "triceps-pushdown-rope", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "overhead-triceps-extension", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "ppl-pull1", name: "Día 2: PULL A — Espalda, Bíceps, Deltoides Post",
                exercises: [
                    { exerciseId: "pullups-weighted", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "barbell-row", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lat-pulldown-neutral", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "face-pulls", sets: 3, targetReps: "15-20", targetRir: 1 },
                    { exerciseId: "barbell-biceps-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "hammer-curl", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "ppl-legs1", name: "Día 3: LEGS A — Cuádriceps, Isquios, Gemelos",
                exercises: [
                    { exerciseId: "back-squat-barbell", sets: 4, targetReps: "6-8", targetRir: 2 },
                    { exerciseId: "romanian-deadlift", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "leg-extensions", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "leg-curl-lying", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "standing-calf-raises", sets: 4, targetReps: "12-15", targetRir: 0 }
                ]
            },
            {
                dayId: "ppl-push2", name: "Día 4: PUSH B — Pecho Clavicular, Hombro, Tríceps",
                exercises: [
                    { exerciseId: "incline-dumbbell-press", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "pec-deck-machine", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "incline-cable-fly", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "arnold-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lateral-raises-cable", sets: 4, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "skull-crushers", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "triceps-pushdown-bar", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "ppl-pull2", name: "Día 5: PULL B — Densidad Espalda, Bíceps, Delt Post",
                exercises: [
                    { exerciseId: "single-arm-dumbbell-row", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "seated-cable-row", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "lat-pulldown-wide", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "rear-delt-fly-machine", sets: 3, targetReps: "15-20", targetRir: 0 },
                    { exerciseId: "incline-dumbbell-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "cable-curl", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "ppl-legs2", name: "Día 6: LEGS B — Glúteos, Isquios, Gemelos, Abs",
                exercises: [
                    { exerciseId: "hip-thrust-barbell", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "bulgarian-split-squat", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "seated-leg-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "leg-extensions", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "seated-calf-raises", sets: 4, targetReps: "15-20", targetRir: 0 },
                    { exerciseId: "hanging-leg-raise", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    //  2. ARNOLD SPLIT — 6 DÍAS ESTÉTICO
    // ═══════════════════════════════════════════════════════════════
    {
        id: "arnold-split-6day",
        name: "Arnold Split — 6 Días V-Taper Estético",
        frequency: "6 días / semana",
        targetGoal: "Volumen Estético V-Taper y Desarrollo de Brazos",
        description: "El mítico reparto antagonista de Arnold Schwarzenegger. Pecho/Espalda juntos, Hombros/Brazos juntos, Piernas aparte. Bombeo brutal en el torso.",
        days: [
            {
                dayId: "arnold-ch-back1", name: "Día 1: Pecho & Espalda (Supersets Antagonistas)",
                exercises: [
                    { exerciseId: "bench-press-barbell", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "pullups-weighted", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "incline-dumbbell-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "barbell-row", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "chest-flyes-cable", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "seated-cable-row", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "dumbbell-pullover", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            },
            {
                dayId: "arnold-shoulders-arms1", name: "Día 2: Hombros & Brazos Completos",
                exercises: [
                    { exerciseId: "overhead-press", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "lateral-raises-dumbbell", sets: 4, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "rear-delt-fly-machine", sets: 3, targetReps: "15-20", targetRir: 0 },
                    { exerciseId: "barbell-biceps-curl", sets: 3, targetReps: "8-10", targetRir: 0 },
                    { exerciseId: "triceps-pushdown-rope", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "hammer-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "overhead-triceps-extension", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "arnold-legs1", name: "Día 3: Piernas Completas & Abdomen",
                exercises: [
                    { exerciseId: "back-squat-barbell", sets: 4, targetReps: "6-8", targetRir: 2 },
                    { exerciseId: "romanian-deadlift", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "leg-extensions", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "leg-curl-lying", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "standing-calf-raises", sets: 4, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "cable-crunch", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    //  3. POWERBUILDING HÍBRIDO — 5 DÍAS
    // ═══════════════════════════════════════════════════════════════
    {
        id: "powerbuilding-5day",
        name: "Powerbuilding Híbrido — 5 Días Fuerza + Volumen",
        frequency: "5 días / semana",
        targetGoal: "Fuerza Máxima en Básicos + Hipertrofia de Aislamiento",
        description: "Combina 2 días de fuerza pura pesada en los 3 grandes (Sentadilla, Banca, Peso Muerto con RIR 2-3) con 3 días de hipertrofia con más volumen.",
        days: [
            {
                dayId: "pb-upper-str", name: "Día 1: Torso FUERZA (Banca & Remo Pesado)",
                exercises: [
                    { exerciseId: "bench-press-barbell", sets: 5, targetReps: "3-5", targetRir: 2 },
                    { exerciseId: "pullups-weighted", sets: 4, targetReps: "5-6", targetRir: 1 },
                    { exerciseId: "overhead-press", sets: 3, targetReps: "5-6", targetRir: 2 },
                    { exerciseId: "barbell-row", sets: 3, targetReps: "5-6", targetRir: 2 },
                    { exerciseId: "close-grip-bench-press", sets: 3, targetReps: "6-8", targetRir: 1 }
                ]
            },
            {
                dayId: "pb-lower-str", name: "Día 2: Pierna FUERZA (Sentadilla & PM Pesado)",
                exercises: [
                    { exerciseId: "back-squat-barbell", sets: 5, targetReps: "3-5", targetRir: 2 },
                    { exerciseId: "deadlift-barbell", sets: 4, targetReps: "3-5", targetRir: 2 },
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "standing-calf-raises", sets: 4, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "pb-push-hyp", name: "Día 3: Push HIPERTROFIA",
                exercises: [
                    { exerciseId: "incline-dumbbell-press", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "pec-deck-machine", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "dumbbell-shoulder-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lateral-raises-cable", sets: 4, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "triceps-pushdown-rope", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "skull-crushers", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "pb-pull-hyp", name: "Día 4: Pull HIPERTROFIA",
                exercises: [
                    { exerciseId: "lat-pulldown-wide", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "single-arm-dumbbell-row", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "t-bar-row", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "face-pulls", sets: 3, targetReps: "15-20", targetRir: 1 },
                    { exerciseId: "incline-dumbbell-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "preacher-curl", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "pb-legs-hyp", name: "Día 5: Pierna HIPERTROFIA & Abs",
                exercises: [
                    { exerciseId: "front-squat-barbell", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "hip-thrust-barbell", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "bulgarian-split-squat", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "seated-leg-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "leg-extensions", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "seated-calf-raises", sets: 4, targetReps: "15-20", targetRir: 0 },
                    { exerciseId: "hanging-leg-raise", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    //  4. TORSO / PIERNA (UPPER / LOWER) — 4 DÍAS
    // ═══════════════════════════════════════════════════════════════
    {
        id: "upper-lower-4day",
        name: "Torso / Pierna (Upper / Lower) — 4 Días Eficiente",
        frequency: "4 días / semana",
        targetGoal: "Fuerza y Masa Muscular con máxima eficiencia",
        description: "Frecuencia 2 perfecta para compaginar gimnasio con vida laboral o estudios. Sesiones de 60-75 minutos.",
        days: [
            {
                dayId: "ul-upper1", name: "Día 1: Torso A (Fuerza Compuesta)",
                exercises: [
                    { exerciseId: "bench-press-barbell", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "pullups-weighted", sets: 4, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "overhead-press", sets: 3, targetReps: "8-10", targetRir: 2 },
                    { exerciseId: "barbell-row", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lateral-raises-dumbbell", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "triceps-pushdown-rope", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "barbell-biceps-curl", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "ul-lower1", name: "Día 2: Pierna A (Sentadilla & Cadena Posterior)",
                exercises: [
                    { exerciseId: "back-squat-barbell", sets: 4, targetReps: "6-8", targetRir: 2 },
                    { exerciseId: "romanian-deadlift", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "leg-curl-lying", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "leg-extensions", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "standing-calf-raises", sets: 4, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "cable-crunch", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            },
            {
                dayId: "ul-upper2", name: "Día 3: Torso B (Hipertrofia & Aislamiento)",
                exercises: [
                    { exerciseId: "incline-dumbbell-press", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lat-pulldown-wide", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "dumbbell-shoulder-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "seated-cable-row", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "chest-flyes-cable", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "hammer-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "overhead-triceps-extension", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "ul-lower2", name: "Día 4: Pierna B (Glúteos & Unilateral)",
                exercises: [
                    { exerciseId: "hip-thrust-barbell", sets: 4, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "bulgarian-split-squat", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "hack-squat-machine", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "seated-leg-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "walking-lunges", sets: 3, targetReps: "12-14", targetRir: 1 },
                    { exerciseId: "seated-calf-raises", sets: 4, targetReps: "15-20", targetRir: 0 },
                    { exerciseId: "pallof-press", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    //  5. FULL BODY — 3 DÍAS FRECUENCIA MÁXIMA
    // ═══════════════════════════════════════════════════════════════
    {
        id: "fullbody-3day",
        name: "Full Body (Cuerpo Completo) — 3 Días Alta Frecuencia",
        frequency: "3 días / semana (L-X-V)",
        targetGoal: "Síntesis Proteica Máxima y Eficiencia Total",
        description: "Trabaja todo el cuerpo cada sesión con días de descanso intercalados. Ideal para principiantes avanzados y personas con poco tiempo.",
        days: [
            {
                dayId: "fb-day1", name: "Día 1: Full Body A (Fuerza Compuesta)",
                exercises: [
                    { exerciseId: "back-squat-barbell", sets: 3, targetReps: "6-8", targetRir: 2 },
                    { exerciseId: "bench-press-barbell", sets: 3, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "pullups-weighted", sets: 3, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "overhead-press", sets: 3, targetReps: "8-10", targetRir: 2 },
                    { exerciseId: "lateral-raises-dumbbell", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "standing-calf-raises", sets: 3, targetReps: "12-15", targetRir: 0 }
                ]
            },
            {
                dayId: "fb-day2", name: "Día 2: Full Body B (Hipertrofia Compuesta)",
                exercises: [
                    { exerciseId: "deadlift-barbell", sets: 3, targetReps: "5-6", targetRir: 2 },
                    { exerciseId: "incline-dumbbell-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "barbell-row", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "barbell-biceps-curl", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "triceps-pushdown-rope", sets: 3, targetReps: "10-12", targetRir: 0 }
                ]
            },
            {
                dayId: "fb-day3", name: "Día 3: Full Body C (Volumen & Aislamiento)",
                exercises: [
                    { exerciseId: "front-squat-barbell", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "weighted-dips-chest", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lat-pulldown-wide", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "romanian-deadlift", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "lateral-raises-cable", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "hanging-leg-raise", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            }
        ]
    },

    // ═══════════════════════════════════════════════════════════════
    //  6. TORSO / PIERNA / DESCANSO (3 DÍAS PARA PRINCIPIANTES)
    // ═══════════════════════════════════════════════════════════════
    {
        id: "upper-lower-3day",
        name: "Torso + Pierna + Full — 3 Días Principiante-Intermedio",
        frequency: "3 días / semana",
        targetGoal: "Fundamentos de Fuerza y Aprendizaje Motor",
        description: "Programa ideal para principiantes o personas que solo pueden entrenar 3 días. Combina 1 día de Torso, 1 de Pierna y 1 Full Body.",
        days: [
            {
                dayId: "beg-upper", name: "Día 1: Torso Completo",
                exercises: [
                    { exerciseId: "bench-press-barbell", sets: 3, targetReps: "8-10", targetRir: 2 },
                    { exerciseId: "lat-pulldown-wide", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "dumbbell-shoulder-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "seated-cable-row", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "barbell-biceps-curl", sets: 2, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "triceps-pushdown-rope", sets: 2, targetReps: "10-12", targetRir: 1 }
                ]
            },
            {
                dayId: "beg-lower", name: "Día 2: Pierna Completa",
                exercises: [
                    { exerciseId: "back-squat-barbell", sets: 3, targetReps: "8-10", targetRir: 2 },
                    { exerciseId: "romanian-deadlift", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "leg-curl-lying", sets: 3, targetReps: "10-12", targetRir: 0 },
                    { exerciseId: "standing-calf-raises", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "cable-crunch", sets: 3, targetReps: "12-15", targetRir: 1 }
                ]
            },
            {
                dayId: "beg-full", name: "Día 3: Full Body Ligero",
                exercises: [
                    { exerciseId: "leg-press-45", sets: 3, targetReps: "10-12", targetRir: 1 },
                    { exerciseId: "incline-dumbbell-press", sets: 3, targetReps: "8-10", targetRir: 1 },
                    { exerciseId: "pullups-weighted", sets: 3, targetReps: "6-8", targetRir: 1 },
                    { exerciseId: "lateral-raises-dumbbell", sets: 3, targetReps: "12-15", targetRir: 0 },
                    { exerciseId: "face-pulls", sets: 3, targetReps: "15-20", targetRir: 1 }
                ]
            }
        ]
    }
];
