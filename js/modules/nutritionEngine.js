/**
 * MOTOR DE NUTRICIÓN DEPORTIVA Y CÁLCULO METABÓLICO ESTRICTO
 * Algoritmos: Mifflin-St Jeor y Katch-McArdle para masa magra.
 */

const NutritionEngine = {
    /**
     * Calcula la Tasa Metabólica Basal (BMR)
     */
    calculateBmr: (profile) => {
        const { weight, height, age, gender, bodyFat } = profile;

        // Si se conoce el % de grasa corporal, usar Katch-McArdle (más precisa para atletas)
        if (bodyFat && bodyFat > 0) {
            const lbm = weight * (1 - (bodyFat / 100)); // Masa Magra
            const bmrKatch = 370 + (21.6 * lbm);
            return { bmr: Math.round(bmrKatch), lbm: Math.round(lbm * 10) / 10 };
        }

        // Si no, fórmula Mifflin-St Jeor
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr += (gender === "male") ? 5 : -161;

        const estimatedLbm = gender === "male" ? weight * 0.85 : weight * 0.75;
        return { bmr: Math.round(bmr), lbm: Math.round(estimatedLbm * 10) / 10 };
    },

    /**
     * Calcula TDEE y Metas Estrictas de Macros con soporte para Ciclado de Carbohidratos (Carb Cycling)
     */
    calculateMetabolicTargets: (profile, dayType = "training") => {
        const { bmr, lbm } = NutritionEngine.calculateBmr(profile);
        const activityMultiplier = parseFloat(profile.activityLevel || 1.55);
        const tdee = Math.round(bmr * activityMultiplier);

        let targetCalories = tdee;
        const goal = profile.goal || "recomp";

        // Ajuste calórico según objetivo
        if (goal === "hypertrophy") {
            targetCalories += 250; // Superávit Magro
        } else if (goal === "cut") {
            targetCalories -= 400; // Déficit Moderado
        } else if (goal === "aggressive-cut") {
            targetCalories -= 600; // Déficit Estricto
        }

        // Carb Cycling Adjustment (Día de Entrenamiento vs Descanso)
        if (dayType === "rest") {
            targetCalories -= 150; // Ligera reducción en día de descanso
        }

        // Cálculo Estricto de Macronutrientes por kg de peso corporal
        const proteinMultiplier = (goal === "cut" || goal === "aggressive-cut" || goal === "recomp") ? 2.3 : 2.0;
        const proteinGrams = Math.round(profile.weight * proteinMultiplier);
        const proteinKcal = proteinGrams * 4;

        // Grasas: 0.8 g/kg en entrenamiento, 1.0 g/kg en descanso
        const fatGrams = Math.round(profile.weight * (dayType === "rest" ? 1.0 : 0.8));
        const fatKcal = fatGrams * 9;

        // Carbohidratos: El resto de las calorías para glucógeno
        const remainingKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal));
        const carbGrams = Math.round(remainingKcal / 4);

        return {
            bmr,
            lbm,
            tdee,
            targetCalories,
            dayType,
            macros: {
                protein: proteinGrams,
                carbs: carbGrams,
                fats: fatGrams
            }
        };
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = NutritionEngine;
}
