    waterIntakeMl: 0,
    dayType: "training", // "training" vs "rest"

    init: () => {
        FoodTracker.todayLog = StorageUtil.get(STORAGE_KEYS.NUTRITION_LOG, FoodTracker.todayLog);
        FoodTracker.waterIntakeMl = StorageUtil.get("apexlab_water_ml", 0);
        FoodTracker.dayType = StorageUtil.get("apexlab_carb_daytype", "training");

        FoodTracker.renderMeals();
        FoodTracker.updateMacroSummary();
        FoodTracker.updateWaterUI();
    },

    setDayType: (type) => {
        FoodTracker.dayType = type;
        StorageUtil.set("apexlab_carb_daytype", type);
        FoodTracker.updateMacroSummary();
        if (typeof App !== "undefined" && App.soundEnabled && typeof SoundFX !== "undefined") SoundFX.playCheck();
    },

    addWater: (ml) => {
        FoodTracker.waterIntakeMl += ml;
        StorageUtil.set("apexlab_water_ml", FoodTracker.waterIntakeMl);
        FoodTracker.updateWaterUI();

        const profile = StorageUtil.get(STORAGE_KEYS.USER_PROFILE, { weight: 78.5 });
        const targetMl = Math.round(profile.weight * 35);
        if (FoodTracker.waterIntakeMl >= targetMl && (FoodTracker.waterIntakeMl - ml) < targetMl) {
            if (typeof App !== "undefined" && typeof App.triggerConfetti === "function") App.triggerConfetti();
        }
        if (typeof App !== "undefined" && App.soundEnabled && typeof SoundFX !== "undefined") SoundFX.playCheck();
    },

    resetWater: () => {
        FoodTracker.waterIntakeMl = 0;
        StorageUtil.set("apexlab_water_ml", 0);
        FoodTracker.updateWaterUI();
        if (typeof App !== "undefined" && App.soundEnabled && typeof SoundFX !== "undefined") SoundFX.playCheck();
    },

    updateWaterUI: () => {
        const profile = StorageUtil.get(STORAGE_KEYS.USER_PROFILE, { weight: 78.5 });
        const targetMl = Math.round(profile.weight * 35);
        const pct = Math.min(100, Math.round((FoodTracker.waterIntakeMl / targetMl) * 100));

        const countEl = document.getElementById("water-current-ml");
        const targetEl = document.getElementById("water-target-ml");
        const barEl = document.getElementById("water-progress-bar");
        const pctEl = document.getElementById("water-pct-text");

        if (countEl) countEl.innerText = (FoodTracker.waterIntakeMl / 1000).toFixed(2) + " L";
        if (targetEl) targetEl.innerText = (targetMl / 1000).toFixed(2) + " L";
        if (barEl) barEl.style.width = pct + "%";
        if (pctEl) pctEl.innerText = pct + "%";
    },

    addFitnessComboPlate: (comboKey, mealCat = "almuerzo") => {
        const combos = {
            "bowl-pollo": [
                { id: "pechuga-pollo", grams: 200 },
                { id: "arroz-basmati", grams: 90 },
                { id: "aove", grams: 10 },
                { id: "brocoli-fresco", grams: 100 }
            ],
            "porridge-proteico": [
                { id: "avena-integral", grams: 80 },
                { id: "whey-protein", grams: 30 },
                { id: "platano", grams: 100 },
                { id: "almendras-crudas", grams: 15 }
            ],
            "huevos-tostada": [
                { id: "huevo-entero", grams: 120 },
                { id: "pan-masa-madre", grams: 80 },
                { id: "pechuga-pavo", grams: 50 },
                { id: "aguacate", grams: 40 }
            ],
            "salmon-quinoa": [
                { id: "salmon-fresco", grams: 180 },
                { id: "quinoa-real", grams: 80 },
                { id: "espárragos-trigueros", grams: 100 }
            ]
        };

        const items = combos[comboKey];
        if (!items) return;

        items.forEach(it => {
            const foodObj = FOOD_DATABASE.find(f => f.id === it.id);
            if (foodObj) {
                FoodTracker.addFoodItem(foodObj, it.grams, mealCat);
            }
        });

        if (typeof App !== "undefined" && typeof App.triggerConfetti === "function") App.triggerConfetti();
        alert("¡Plato Fitness Completo sumado a tu diario!");
    },

    quickAddFood: (foodId, grams, mealCategory = "almuerzo") => {
        const foodObj = FOOD_DATABASE.find(f => f.id === foodId);
        if (!foodObj) return;

        FoodTracker.addFoodItem(foodObj, grams, mealCategory);
        if (typeof SoundFX !== "undefined") SoundFX.playFoodAdd();
    },

    addFoodItem: (foodObj, grams, mealCategory) => {
        const factor = grams / 100;
        const entry = {
            id: foodObj.id,
            name: foodObj.name,
            grams: parseInt(grams),
            calories: Math.round(foodObj.per100g.calories * factor),
            protein: Math.round(foodObj.per100g.protein * factor * 10) / 10,
            carbs: Math.round(foodObj.per100g.carbs * factor * 10) / 10,
            fat: Math.round(foodObj.per100g.fat * factor * 10) / 10
        };

        if (!FoodTracker.todayLog[mealCategory]) {
            FoodTracker.todayLog[mealCategory] = [];
        }

        FoodTracker.todayLog[mealCategory].push(entry);
        StorageUtil.set(STORAGE_KEYS.NUTRITION_LOG, FoodTracker.todayLog);

        FoodTracker.renderMeals();
        FoodTracker.updateMacroSummary();
        if (typeof SoundFX !== "undefined") SoundFX.playFoodAdd();
    },

    removeFoodItem: (mealCategory, index) => {
        if (FoodTracker.todayLog[mealCategory]) {
            FoodTracker.todayLog[mealCategory].splice(index, 1);
            StorageUtil.set(STORAGE_KEYS.NUTRITION_LOG, FoodTracker.todayLog);
            FoodTracker.renderMeals();
            FoodTracker.updateMacroSummary();
        }
    },

    renderMeals: () => {
        const container = document.getElementById("meals-container");
        if (!container) return;

        const categories = [
            { key: "desayuno", title: "Desayuno", icon: "fa-mug-saucer" },
            { key: "almuerzo", title: "Almuerzo", icon: "fa-bowl-rice" },
            { key: "pre-workout", title: "Pre-Entrenamiento", icon: "fa-bolt-lightning" },
            { key: "post-workout", title: "Post-Entrenamiento", icon: "fa-heart-pulse" },
            { key: "cena", title: "Cena", icon: "fa-utensils" },
            { key: "snacks", title: "Snacks / Colación", icon: "fa-apple-whole" }
        ];

        container.innerHTML = "";

        categories.forEach(cat => {
            const items = FoodTracker.todayLog[cat.key] || [];
            let rowsHtml = "";

            items.forEach((item, idx) => {
                rowsHtml += `
                    <tr>
                        <td><strong>${item.name}</strong> (${item.grams}g)</td>
                        <td style="color: var(--accent-gold);">${item.calories} kcal</td>
                        <td style="color: var(--danger-red);">${item.protein}g P</td>
                        <td style="color: var(--accent-cyan);">${item.carbs}g C</td>
                        <td style="color: var(--primary-neon);">${item.fat}g G</td>
                        <td>
                            <button class="remove-food-btn" onclick="FoodTracker.removeFoodItem('${cat.key}', ${idx})">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });

            const catCard = document.createElement("div");
            catCard.className = "meal-category-card";
            catCard.innerHTML = `
                <div class="meal-category-header">
                    <div class="meal-title"><i class="fa-solid ${cat.icon}"></i> ${cat.title}</div>
                    <span class="subtitle">${items.length} alimentos</span>
                </div>
                ${items.length === 0 ? '<p style="font-size: 12px; color: var(--text-muted);">Sin registro todavía.</p>' : `
                    <table class="meal-items-table">
                        <tbody>${rowsHtml}</tbody>
                    </table>
                `}
            `;

            container.appendChild(catCard);
        });
    },

    updateMacroSummary: () => {
        let totalKcal = 0, totalProt = 0, totalCarb = 0, totalFat = 0;

        Object.keys(FoodTracker.todayLog).forEach(key => {
            (FoodTracker.todayLog[key] || []).forEach(item => {
                totalKcal += item.calories;
                totalProt += item.protein;
                totalCarb += item.carbs;
                totalFat += item.fat;
            });
        });

        const profile = StorageUtil.get(STORAGE_KEYS.USER_PROFILE, {
            weight: 78.5, height: 178, age: 26, gender: "male", activityLevel: 1.55, goal: "recomp"
        });

        const targets = NutritionEngine.calculateMetabolicTargets(profile, FoodTracker.dayType);

        // Update carb cycling toggle UI state
        const btnTrain = document.getElementById("btn-carb-train");
        const btnRest = document.getElementById("btn-carb-rest");
        if (btnTrain && btnRest) {
            if (FoodTracker.dayType === "training") {
                btnTrain.className = "sub-tab-btn active";
                btnRest.className = "sub-tab-btn";
            } else {
                btnTrain.className = "sub-tab-btn";
                btnRest.className = "sub-tab-btn active";
            }
        }

        // Actualizar UI del Tab Nutrición
        document.getElementById("kcal-consumed").innerText = Math.round(totalKcal);
        document.getElementById("kcal-target").innerText = targets.targetCalories;
        document.getElementById("prot-consumed").innerText = Math.round(totalProt);
        document.getElementById("prot-target").innerText = targets.macros.protein;
        document.getElementById("carb-consumed").innerText = Math.round(totalCarb);
        document.getElementById("carb-target").innerText = targets.macros.carbs;
        document.getElementById("fat-consumed").innerText = Math.round(totalFat);
        document.getElementById("fat-target").innerText = targets.macros.fats;

        // Barras de progreso
        document.getElementById("kcal-bar").style.width = `${Math.min(100, (totalKcal / targets.targetCalories) * 100)}%`;
        document.getElementById("prot-bar").style.width = `${Math.min(100, (totalProt / targets.macros.protein) * 100)}%`;
        document.getElementById("carb-bar").style.width = `${Math.min(100, (totalCarb / targets.macros.carbs) * 100)}%`;
        document.getElementById("fat-bar").style.width = `${Math.min(100, (totalFat / targets.macros.fats) * 100)}%`;

        // Actualizar Anillos Circulares en Dashboard Hero
        FoodTracker.updateCircularRings(totalKcal, targets.targetCalories, totalProt, targets.macros.protein, totalCarb, targets.macros.carbs, totalFat, targets.macros.fats);

        // Dictamen y sugerencias
        FoodTracker.generateNutritionistFeedback(totalProt, targets.macros.protein, totalKcal, targets.targetCalories);
        FoodTracker.generateMacroSuggestions(targets.macros.protein - totalProt, targets.macros.carbs - totalCarb);
    },

    updateCircularRings: (kcal, kcalTarget, prot, protTarget, carb, carbTarget, fat, fatTarget) => {
        const setRing = (ringId, textId, curr, target) => {
            const circle = document.getElementById(ringId);
            const text = document.getElementById(textId);
            if (!circle || !text) return;

            const pct = Math.min(100, Math.round((curr / target) * 100));
            text.innerText = `${pct}%`;

            // Circunferencia del anillo = 263.8px
            const offset = 263.8 - (263.8 * (pct / 100));
            circle.style.strokeDashoffset = offset;
        };

        setRing("ring-kcal", "ring-kcal-pct", kcal, kcalTarget);
        setRing("ring-prot", "ring-prot-pct", prot, protTarget);
        setRing("ring-carb", "ring-carb-pct", carb, carbTarget);
        setRing("ring-fat", "ring-fat-pct", fat, fatTarget);

        document.getElementById("dash-kcal-curr").innerText = Math.round(kcal);
        document.getElementById("dash-kcal-target").innerText = kcalTarget;
        document.getElementById("dash-prot-curr").innerText = Math.round(prot);
        document.getElementById("dash-prot-target").innerText = protTarget;
        document.getElementById("dash-carb-curr").innerText = Math.round(carb);
        document.getElementById("dash-carb-target").innerText = carbTarget;
        document.getElementById("dash-fat-curr").innerText = Math.round(fat);
        document.getElementById("dash-fat-target").innerText = fatTarget;
    },

    generateNutritionistFeedback: (currentProt, targetProt, currentKcal, targetKcal) => {
        const box = document.getElementById("nutritionist-feedback");
        if (!box) return;

        const protDiff = Math.round(targetProt - currentProt);

        if (protDiff <= 5) {
            box.innerHTML = `
                <div class="feedback-status status-success">
                    <i class="fa-solid fa-circle-check" style="font-size: 22px;"></i>
                    <div>
                        <h4>¡Nutrición Óptima Cumplida!</h4>
                        <p>Has alcanzado el umbral proteico exacto (${Math.round(currentProt)}g) para maximizar la síntesis muscular.</p>
                    </div>
                </div>
            `;
        } else {
            box.innerHTML = `
                <div class="feedback-status status-warning">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 22px;"></i>
                    <div>
                        <h4>Déficit de Proteína Detectado</h4>
                        <p>Te faltan <strong>${protDiff}g de proteína</strong>. Utiliza los botones de 1-clic abajo para completar tu meta.</p>
                    </div>
                </div>
            `;
        }
    },

    generateMacroSuggestions: (neededProt, neededCarb) => {
        const container = document.getElementById("macro-suggestions-list");
        if (!container) return;

        container.innerHTML = "";

        if (neededProt <= 0 && neededCarb <= 0) {
            container.innerHTML = `<p style="font-size: 13px; color: var(--primary-neon); padding: 10px;"><i class="fa-solid fa-check-double"></i> ¡Has cubierto todos tus macros diarios!</p>`;
            return;
        }

        const suggestions = [];

        if (neededProt > 10) {
            const skyrGrams = Math.round((neededProt / 10) * 100);
            suggestions.push({
                foodId: "queso-batido-0",
                grams: skyrGrams,
                meal: "cena",
                title: `${skyrGrams}g Queso Fresco Batido 0%`,
                detail: `+${Math.round(neededProt)}g Proteína Caseína lenta`
            });

            suggestions.push({
                foodId: "whey-protein",
                grams: 30,
                meal: "post-workout",
                title: `1 Cazo (30g) Proteína Whey`,
                detail: `+24g Proteína de suero rápida`
            });
        }

        if (neededCarb > 20) {
            const oatsGrams = Math.round((neededCarb / 60) * 100);
            suggestions.push({
                foodId: "avena-integral",
                grams: oatsGrams,
                meal: "desayuno",
                title: `${oatsGrams}g Copos de Avena Integral`,
                detail: `Recarga de glucógeno muscular`
            });
        }

        suggestions.forEach(s => {
            const card = document.createElement("div");
            card.className = "suggestion-card";
            card.innerHTML = `
                <div>
                    <strong>${s.title}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${s.detail}</div>
                </div>
                <button class="btn-sm btn-primary" onclick="FoodTracker.quickAddFood('${s.foodId}', ${s.grams}, '${s.meal}')">
                    <i class="fa-solid fa-plus"></i> Añadir 1-Clic
                </button>
            `;
            container.appendChild(card);
        });
    }
};
