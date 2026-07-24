/**
 * PROTOCOLOS Y SUPLEMENTACIÓN ERGOGÉNICA BASADA EN EVIDENCIA CIENTÍFICA
 * Algoritmo de dosificación exacta según peso corporal.
 */

const EVIDENCE_SUPPLEMENTS = [
    {
        id: "creatine",
        name: "Creatina Monohidrato (Creapure)",
        evidenceTier: "Nivel A (Máxima evidencia ISSN / Examine)",
        calculateDose: (weightKg) => {
            const dailyGrams = (weightKg * 0.05).toFixed(1);
            return `${dailyGrams}g / día (${dailyGrams > 5 ? '5-7g' : '3-5g'}) tomada diariamente sin interrupción`;
        },
        timing: "A cualquier hora (acumulación celular por saturación). Post-entreno con carbohidratos optimiza captación.",
        benefits: "Aumenta depósitos de fosfocreatina intracelular en un 20-40%. Incrementa fuerza máxima, potencia explosiva e hidratación celular (volumización muscular)."
    },
    {
        id: "caffeine",
        name: "Cafeína Anhidra / Pre-Workout",
        evidenceTier: "Nivel A (Ergogénico Estimulante)",
        calculateDose: (weightKg) => {
            const minDose = Math.round(weightKg * 3);
            const maxDose = Math.round(weightKg * 5);
            return `${minDose}mg - ${maxDose}mg pre-entrenamiento`;
        },
        timing: "45 a 60 minutos antes de la sesión de entrenamiento. Evitar en las 6 horas previas al sueño.",
        benefits: "Antagonista de receptores de adenosina en el SNC. Reduce la percepción de esfuerzo (RPE), incrementa el reclutamiento de unidades motoras y el volumen total de repeticiones."
    },
    {
        id: "whey-isolate",
        name: "Proteína de Suero (Whey Isolate / Concentrado)",
        evidenceTier: "Nivel A (Macronutriente de rápida digestión)",
        calculateDose: (weightKg) => {
            return `30g - 40g (1 cazo) para aportar ~2.5g-3g de Leucina (Umbral de Síntesis Proteica MPS)`;
        },
        timing: "Post-entreno o entre comidas para cubrir requerimientos proteicos diarios (1.8-2.4 g/kg).",
        benefits: "Valor biológico de 104. Rápido pico de aminoacidemia estimulando la vía mTORC1 para la reparación microfibrilar."
    },
    {
        id: "omega3",
        name: "Omega-3 (EPA / DHA de Alta Concentración)",
        evidenceTier: "Nivel A (Salud Sistémica y Antiinflamatorio)",
        calculateDose: (weightKg) => {
            return `2.000mg a 3.000mg diarios de Aceite de Pescado (con al menos 1.200mg de EPA + DHA combinados)`;
        },
        timing: "Junto con una comida principal rica en grasas saludables para maximizar su absorción intestinal.",
        benefits: "Mejora la sensibilidad a la insulina muscular, reduce la inflamación articular sistémica tras entrenamientos pesados y apoya la salud cardiovascular."
    },
    {
        id: "vit-d3-k2",
        name: "Vitamina D3 + K2 (MK-7)",
        evidenceTier: "Nivel A (Optimizador Hormonal)",
        calculateDose: (weightKg) => {
            return `2.000 UI - 4.000 UI diarias de Vitamina D3 + 100mcg de Vitamina K2`;
        },
        timing: "En el desayuno con alimentos grasa (vitamina liposoluble).",
        benefits: "Optimiza los niveles circulantes de testosterona total y libre en atletas, refuerza la densidad ósea y apoya el sistema inmune."
    }
];
