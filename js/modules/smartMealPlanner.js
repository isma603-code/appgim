/**
 * ══════════════════════════════════════════════════════════════════
 *  GENERADOR DE MENÚS INTELIGENTES POR MACRONUTRIENTES
 *  Ajusta matemáticamente los gramajes de alimentos reales para
 *  clavar las calorías, proteínas, carbohidratos y grasas objetivo.
 * ══════════════════════════════════════════════════════════════════
 */

const SmartMealPlanner = {
    generatedPlan: null,

    /**
     * Alimentos base utilizados para la generación con sus datos por 100g
     */
    foods: {
        oats: { id: "avena-integral", name: "Copos de Avena", p: 13.5, c: 58.7, f: 7.0, kcal: 372, unit: "g" },
        whey: { id: "whey-protein", name: "Proteína Whey Isolada", p: 80.0, c: 3.5, f: 1.5, kcal: 375, unit: "g" },
        banana: { id: "platano", name: "Plátano Fresco", p: 1.1, c: 20.0, f: 0.3, kcal: 89, unit: "g" },
        almonds: { id: "almendras-crudas", name: "Almendras Naturales", p: 21.0, c: 9.0, f: 50.0, kcal: 579, unit: "g" },
        chicken: { id: "pechuga-pollo", name: "Pechuga de Pollo a la Plancha", p: 31.0, c: 0.0, f: 3.6, kcal: 165, unit: "g" },
        rice: { id: "arroz-basmati", name: "Arroz Basmati (en seco)", p: 7.5, c: 77.0, f: 1.0, kcal: 350, unit: "g" },
        oliveOil: { id: "aove", name: "Aceite de Oliva Virgen Extra", p: 0.0, c: 0.0, f: 100.0, kcal: 884, unit: "ml" },
        eggs: { id: "huevo-entero", name: "Huevos Enteros L (2 uds = ~100g)", p: 12.5, c: 0.7, f: 10.0, kcal: 145, unit: "g" },
        salmon: { id: "salmon-fresco", name: "Lomo de Salmón a la Plancha", p: 20.0, c: 0.0, f: 13.0, kcal: 206, unit: "g" },
        sweetPotato: { id: "boniato-camote", name: "Boniato / Batata Asada", p: 1.6, c: 20.0, f: 0.1, kcal: 86, unit: "g" }
    },

    /**
     * Genera un menú de 4 comidas ajustado a los targets metabólicos del usuario
     */
    generateMealPlan: () => {
        const targets = NutritionEngine.calculateMetabolicTargets(App.userProfile);
        const { targetCalories, macros } = targets;

        const targetP = macros.protein;
        const targetC = macros.carbs;
        const targetF = macros.fats;

        // Distribución de Macros por Comida:
        // Desayuno (25% C, 25% P, 25% F)
        // Almuerzo  (40% C, 35% P, 30% F)
        // Merienda  (15% C, 15% P, 15% F)
        // Cena      (20% C, 25% P, 30% F)

        // 1. DESAYUNO
        const desP = targetP * 0.25;
        const desC = targetC * 0.25;
        const desF = targetF * 0.25;

        // Gramajes para Desayuno (Avena, Whey, Plátano, Almendras)
        const gWheyDes = Math.round((desP * 0.65 / SmartMealPlanner.foods.whey.p) * 100);
        const gOatsDes = Math.round((desC * 0.70 / SmartMealPlanner.foods.oats.c) * 100);
        const gBananaDes = Math.round((desC * 0.30 / SmartMealPlanner.foods.banana.c) * 100);
        const gAlmondsDes = Math.max(10, Math.round((desF / SmartMealPlanner.foods.almonds.f) * 100));

        // 2. ALMUERZO
        const almP = targetP * 0.35;
        const almC = targetC * 0.40;
        const almF = targetF * 0.30;

        const gChickenAlm = Math.round((almP / SmartMealPlanner.foods.chicken.p) * 100);
        const gRiceAlm = Math.round((almC / SmartMealPlanner.foods.rice.c) * 100);
        const gOilAlm = Math.max(5, Math.round((almF / SmartMealPlanner.foods.oliveOil.f) * 100));

        // 3. MERIENDA (Snack Pre-Workout)
        const merP = targetP * 0.15;
        const merC = targetC * 0.15;

        const gEggsMer = Math.max(100, Math.round((merP / SmartMealPlanner.foods.eggs.p) * 100));
        const gBananaMer = Math.round((merC / SmartMealPlanner.foods.banana.c) * 100);

        // 4. CENA
        const cenP = targetP * 0.25;
        const cenC = targetC * 0.20;
        const cenF = Math.max(10, targetF * 0.30);

        const gSalmonCen = Math.round((cenP / SmartMealPlanner.foods.salmon.p) * 100);
        const gSweetPotCen = Math.round((cenC / SmartMealPlanner.foods.sweetPotato.c) * 100);
        const gOilCen = Math.max(5, Math.round((cenF * 0.4 / SmartMealPlanner.foods.oliveOil.f) * 100));

        // Construir objeto de plan
        const plan = {
            targets: { kcal: targetCalories, p: targetP, c: targetC, f: targetF },
            meals: [
                {
                    name: "Desayuno Acelerador de Glucógeno",
                    time: "08:30 AM",
                    icon: "fa-sun",
                    items: [
                        { food: SmartMealPlanner.foods.oats, grams: gOatsDes },
                        { food: SmartMealPlanner.foods.whey, grams: gWheyDes },
                        { food: SmartMealPlanner.foods.banana, grams: gBananaDes },
                        { food: SmartMealPlanner.foods.almonds, grams: gAlmondsDes }
                    ]
                },
                {
                    name: "Almuerzo Anabólico Principal",
                    time: "14:00 PM",
                    icon: "fa-utensils",
                    items: [
                        { food: SmartMealPlanner.foods.chicken, grams: gChickenAlm },
                        { food: SmartMealPlanner.foods.rice, grams: gRiceAlm },
                        { food: SmartMealPlanner.foods.oliveOil, grams: gOilAlm }
                    ]
                },
                {
                    name: "Merienda Pre-Entrenamiento",
                    time: "17:30 PM",
                    icon: "fa-bolt",
                    items: [
                        { food: SmartMealPlanner.foods.eggs, grams: gEggsMer },
                        { food: SmartMealPlanner.foods.banana, grams: gBananaMer }
                    ]
                },
                {
                    name: "Cena Reparadora Nocturna",
                    time: "21:30 PM",
                    icon: "fa-moon",
                    items: [
                        { food: SmartMealPlanner.foods.salmon, grams: gSalmonCen },
                        { food: SmartMealPlanner.foods.sweetPotato, grams: gSweetPotCen },
                        { food: SmartMealPlanner.foods.oliveOil, grams: gOilCen }
                    ]
                }
            ]
        };

        // Calcular totales calculados reales
        let totalP = 0, totalC = 0, totalF = 0, totalKcal = 0;
        plan.meals.forEach(m => {
            m.p = 0; m.c = 0; m.f = 0; m.kcal = 0;
            m.items.forEach(it => {
                const ratio = it.grams / 100;
                it.itemP = Math.round(it.food.p * ratio);
                it.itemC = Math.round(it.food.c * ratio);
                it.itemF = Math.round(it.food.f * ratio);
                it.itemKcal = Math.round(it.food.kcal * ratio);

                m.p += it.itemP;
                m.c += it.itemC;
                m.f += it.itemF;
                m.kcal += it.itemKcal;
            });
            totalP += m.p;
            totalC += m.c;
            totalF += m.f;
            totalKcal += m.kcal;
        });

        plan.totals = { p: Math.round(totalP), c: Math.round(totalC), f: Math.round(totalF), kcal: Math.round(totalKcal) };
        SmartMealPlanner.generatedPlan = plan;

        return plan;
    },

    /**
     * Renderiza el menú generado en el contenedor UI
     */
    renderMealPlanModal: () => {
        const plan = SmartMealPlanner.generatePlan();
        let modal = document.getElementById("modal-smart-meal-plan");

        if (!modal) {
            modal = document.createElement("div");
            modal.id = "modal-smart-meal-plan";
            modal.className = "modal-backdrop";
            document.body.appendChild(modal);
        }

        let mealsHtml = "";
        plan.meals.forEach((meal, idx) => {
            let itemsHtml = "";
            meal.items.forEach(it => {
                itemsHtml += `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding: 8px 12px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 6px; font-size: 13px;">
                        <div>
                            <strong>${it.food.name}</strong>
                            <span style="color: var(--primary-emerald); font-weight:800; margin-left: 6px;">${it.grams} ${it.food.unit}</span>
                        </div>
                        <div style="font-size:11px; color: var(--text-muted);">
                            ${it.itemKcal} kcal | <span style="color: var(--primary-emerald);">${it.itemP}g P</span> | <span style="color: var(--accent-cyan);">${it.itemC}g C</span> | <span style="color: var(--accent-amber);">${it.itemF}g G</span>
                        </div>
                    </div>
                `;
            });

            mealsHtml += `
                <div class="glass-card-epic" style="padding: 16px; margin-bottom: 14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">
                        <h4 style="font-size:15px; font-weight:800; display:flex; align-items:center; gap:8px;">
                            <i class="fa-solid ${meal.icon} text-emerald"></i> ${meal.name}
                        </h4>
                        <span style="font-size:12px; background:rgba(0,255,157,0.15); color:var(--primary-emerald); padding:3px 10px; border-radius:var(--radius-full); font-weight:800;">
                            ${meal.kcal} kcal | ${meal.p}g P
                        </span>
                    </div>
                    ${itemsHtml}
                </div>
            `;
        });

        modal.innerHTML = `
            <div class="modal-card-epic glass-card-epic" style="max-width: 680px;">
                <div class="modal-header-epic">
                    <h3><i class="fa-solid fa-wand-magic-sparkles text-emerald"></i> Menú Diario Inteligente Calculado</h3>
                    <button class="modal-close-btn" onclick="document.getElementById('modal-smart-meal-plan').classList.remove('active')">&times;</button>
                </div>
                <div class="modal-body-epic">
                    <div style="background: rgba(0, 240, 255, 0.06); border: 1px solid rgba(0, 240, 255, 0.2); padding: 14px 18px; border-radius: var(--radius-sm); margin-bottom: 16px; text-align: center;">
                        <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">Target Ajustado a tu Perfil y Objetivos</div>
                        <div style="font-size: 18px; font-weight: 900; color: var(--text-main);">
                            <span style="color:var(--primary-emerald);">${plan.totals.kcal} kcal</span> | 
                            <span style="color:var(--primary-emerald);">${plan.totals.p}g Proteína</span> | 
                            <span style="color:var(--accent-cyan);">${plan.totals.c}g Carbos</span> | 
                            <span style="color:var(--accent-amber);">${plan.totals.f}g Grasas</span>
                        </div>
                    </div>

                    ${mealsHtml}

                    <div style="display:flex; gap:12px; margin-top:16px;">
                        <button class="btn-epic-primary" style="flex:1;" onclick="SmartMealPlanner.applyPlanToDiary()">
                            <i class="fa-solid fa-check"></i> Registrar Todo en mi Diario Nutricional
                        </button>
                        <button class="btn-epic-secondary" onclick="SmartMealPlanner.renderMealPlanModal()">
                            <i class="fa-solid fa-arrows-rotate"></i> Recalcular Gramajes
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.classList.add("active");
        if (App.soundEnabled) SoundFX.playCheck();
    },

    /**
     * Aplica el menú generado directamente al diario de comidas en localStorage
     */
    applyPlanToDiary: () => {
        if (!SmartMealPlanner.generatedPlan) return;

        SmartMealPlanner.generatedPlan.meals.forEach(m => {
            m.items.forEach(it => {
                FoodTracker.quickAddFood(it.food.id, it.grams, m.name);
            });
        });

        if (App.soundEnabled) SoundFX.playTimerAlarm();
        App.triggerConfetti();

        document.getElementById("modal-smart-meal-plan").classList.remove("active");
        alert("¡Menú inteligente registrado con éxito en tu diario de hoy!");
    }
};
