/**
 * APEXLAB - PRINCIPAL APPLICATION ORCHESTRATOR AAA VISUAL EDITION
 */

document.addEventListener("DOMContentLoaded", () => {
    App.init();
});

const App = {
    userProfile: {
        name: "Atleta Apex",
        age: 26,
        gender: "male",
        weight: 78.5,
        height: 178,
        bodyFat: 14.0,
        activityLevel: "1.55",
        goal: "recomp"
    },

    soundEnabled: true,
    beginnerMode: true,

    init: () => {
        App.userProfile = StorageUtil.get(STORAGE_KEYS.USER_PROFILE, App.userProfile);
        App.beginnerMode = StorageUtil.get("apexlab_beginner_mode", true);

        App.setupCursorGlow();
        App.setupTabNavigation();

        App.updateProfileUI();
        App.updateBeginnerModeUI();
        App.renderDailyChecklist();

        WorkoutPlanner.init();
        FoodTracker.init();
        HeatMapEngine.updateSvgHeatmap();
        HeatMapEngine.renderVolumeDashboard("muscle-volume-dashboard-container");
        StrengthEngine.renderPrTable();
        AnalyticsModule.initSupplements(App.userProfile.weight);

        // Inicializar Módulos Entrenador Personal Inteligente
        OnboardingWizard.init("ai-plan-wizard-container");

        const hasPlan = StorageUtil.get("apexlab_has_plan", false);
        if (hasPlan) {
            PlanGenerator.renderPlanSummary("ai-plan-summary-container");
        } else {
            OnboardingWizard.startWizard();
            App.showPlanSubTab("wizard");
        }

        if (typeof CalendarView !== "undefined") CalendarView.init();
        if (typeof WeeklyCheckIn !== "undefined") WeeklyCheckIn.init();
        if (typeof AchievementsModule !== "undefined") AchievementsModule.init();
        if (typeof ProgressPhotos !== "undefined") ProgressPhotos.init();

        App.setupEventListeners();
    },

    toggleBeginnerMode: () => {
        App.beginnerMode = !App.beginnerMode;
        StorageUtil.set("apexlab_beginner_mode", App.beginnerMode);
        App.updateBeginnerModeUI();
        App.renderDailyChecklist();
        if (App.soundEnabled) SoundFX.playCheck();
    },

    updateBeginnerModeUI: () => {
        const btn = document.getElementById("btn-mode-toggle");
        if (btn) {
            if (App.beginnerMode) {
                btn.innerHTML = `<i class="fa-solid fa-graduation-cap text-amber"></i> Modo Guiado (Novato)`;
                btn.className = "sub-tab-btn active";
            } else {
                btn.innerHTML = `<i class="fa-solid fa-microscope text-cyan"></i> Modo Científico (Pro)`;
                btn.className = "sub-tab-btn";
            }
        }
    },

    renderDailyChecklist: () => {
        const container = document.getElementById("daily-guided-checklist-container");
        if (!container) return;

        const hasPlan = StorageUtil.get("apexlab_has_plan", false);
        const stats = StorageUtil.get("stats", { workoutsCompleted: 0 });
        const waterMl = StorageUtil.get("apexlab_water_ml", 0);
        const waterTarget = Math.round(App.userProfile.weight * 35);
        const waterDone = waterMl >= (waterTarget * 0.7);

        container.innerHTML = `
            <div class="glass-card-epic" style="padding: 24px; border: 1px solid var(--border-highlight); margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
                    <div>
                        <h3 style="font-family: var(--font-heading); font-size: 19px; display: flex; align-items: center; gap: 10px;">
                            <i class="fa-solid fa-compass text-amber"></i> Tu Guía Paso a Paso de Hoy (Asistente Personal)
                        </h3>
                        <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Completa estos 4 sencillos pasos para no dejar nada pendiente hoy</p>
                    </div>
                    <span class="badge-pro" style="color: var(--primary-emerald);">Paso a Paso Interactivo</span>
                </div>

                <div class="grid-layout cols-4">
                    <!-- Paso 1: Test SNC -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 16px; cursor: pointer;" onclick="App.switchTab('fatigue')">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--accent-cyan);">PASO 1</span>
                            <span style="font-size: 11px; color: var(--primary-emerald); font-weight: 800;">✓ Listo</span>
                        </div>
                        <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 4px;">1. Test de Sueño</h4>
                        <p style="font-size: 12px; color: var(--text-muted);">Evalúa tu recuperación en 30 seg</p>
                    </div>

                    <!-- Paso 2: Entrenar -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 16px; cursor: pointer;" onclick="App.switchTab('workout')">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--accent-amber);">PASO 2</span>
                            <span style="font-size: 11px; color: var(--accent-amber); font-weight: 800;">⚡ Hoy</span>
                        </div>
                        <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 4px;">2. Entrenamiento</h4>
                        <p style="font-size: 12px; color: var(--text-muted);">${hasPlan ? 'Sesión guiada lista' : 'Haz tu test o elige rutina'}</p>
                    </div>

                    <!-- Paso 3: Post Workout Nutrición -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 16px; cursor: pointer;" onclick="App.switchTab('nutrition')">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--primary-emerald);">PASO 3</span>
                            <span style="font-size: 11px; color: var(--text-muted); font-weight: 800;">🥤 Batido / Comida</span>
                        </div>
                        <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 4px;">3. Post-Workout</h4>
                        <p style="font-size: 12px; color: var(--text-muted);">Registra tu recarga muscular</p>
                    </div>

                    <!-- Paso 4: Agua -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 16px; cursor: pointer;" onclick="App.switchTab('nutrition')">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="font-size: 11px; font-weight: 800; color: var(--accent-cyan);">PASO 4</span>
                            <span style="font-size: 11px; color: ${waterDone ? 'var(--primary-emerald)' : 'var(--accent-amber)'}; font-weight: 800;">${waterDone ? '✓ 100%' : '💧 ' + (waterMl/1000).toFixed(1) + 'L'}</span>
                        </div>
                        <h4 style="font-size: 14px; font-weight: 800; margin-bottom: 4px;">4. Hidratación</h4>
                        <p style="font-size: 12px; color: var(--text-muted);">Completa tus vasos de agua</p>
                    </div>
                </div>
            </div>
        `;
    },

    /* ── Sub-tab switcher: Mi Plan IA & Calendario ── */
    showPlanSubTab: (subTabId) => {
        const section = document.getElementById("tab-myplan");
        if (!section) return;

        const btns = section.querySelectorAll(".sub-tab-btn");
        const panes = section.querySelectorAll(".sub-pane");

        btns.forEach(b => b.classList.remove("active"));
        panes.forEach(sp => sp.style.display = "none");

        const target = document.getElementById("plan-sub-" + subTabId);
        if (target) target.style.display = "block";

        const map = { summary: 0, calendar: 1, wizard: 2 };
        if (btns[map[subTabId]]) btns[map[subTabId]].classList.add("active");

        if (subTabId === "calendar" && typeof CalendarView !== "undefined") {
            CalendarView.renderCalendar("calendar-view-container");
        } else if (subTabId === "wizard") {
            OnboardingWizard.startWizard();
        } else if (subTabId === "summary") {
            const hasPlan = StorageUtil.get("apexlab_has_plan", false);
            if (hasPlan) PlanGenerator.renderPlanSummary("ai-plan-summary-container");
        }

        if (App.soundEnabled) SoundFX.playCheck();
    },

    /* ── Sub-tab switcher: Evolución & Logros ── */
    showProgressSubTab: (subTabId) => {
        const section = document.getElementById("tab-progress");
        if (!section) return;

        const btns = section.querySelectorAll(".sub-tab-btn");
        const panes = section.querySelectorAll(".sub-pane");

        btns.forEach(b => b.classList.remove("active"));
        panes.forEach(sp => sp.style.display = "none");

        const target = document.getElementById("prog-sub-" + subTabId);
        if (target) target.style.display = "block";

        const map = { checkin: 0, photos: 1, achievements: 2, volume: 3, anatomy: 4 };
        if (btns[map[subTabId]]) btns[map[subTabId]].classList.add("active");

        if (subTabId === "checkin" && typeof WeeklyCheckIn !== "undefined") {
            WeeklyCheckIn.showCheckInForm("weekly-checkin-container");
            WeeklyCheckIn.renderProgressChart("weight-chart-container");
        } else if (subTabId === "photos" && typeof ProgressPhotos !== "undefined") {
            ProgressPhotos.showGallery("progress-photos-container");
        } else if (subTabId === "achievements" && typeof AchievementsModule !== "undefined") {
            AchievementsModule.renderAchievementsPanel("achievements-panel-container");
        } else if (subTabId === "volume") {
            HeatMapEngine.renderVolumeDashboard("muscle-volume-dashboard-container");
        } else if (subTabId === "anatomy") {
            // Copy anatomy content from original hidden section
            const anatomySource = document.getElementById("tab-anatomy");
            const anatomyDest = document.getElementById("anatomy-relocated-container");
            if (anatomySource && anatomyDest && !anatomyDest.hasChildNodes()) {
                anatomyDest.innerHTML = anatomySource.innerHTML;
            }
            HeatMapEngine.updateSvgHeatmap();
        }

        if (App.soundEnabled) SoundFX.playCheck();
    },

    setTheme: (themeName) => {
        document.body.classList.remove("theme-emerald", "theme-cyan", "theme-amber", "theme-purple");
        document.body.classList.add(`theme-${themeName}`);

        document.querySelectorAll(".theme-dot").forEach(d => d.classList.remove("active"));
        const activeDot = document.querySelector(`.theme-dot.${themeName}`);
        if (activeDot) activeDot.classList.add("active");

        if (App.soundEnabled) SoundFX.playCheck();
    },

    setupCursorGlow: () => {
        const glow = document.getElementById("cursor-glow");
        if (!glow) return;

        window.addEventListener("mousemove", (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    },

    triggerConfetti: () => {
        if (typeof confetti === "function") {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    },

    switchTab: (tabId) => {
        const navBtn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
        if (navBtn) {
            navBtn.click();
        } else {
            // Hidden tabs (fatigue, profile, anatomy) — show directly
            const panes = document.querySelectorAll(".tab-pane");
            const navBtns = document.querySelectorAll(".nav-btn");
            panes.forEach(p => p.classList.remove("active"));
            navBtns.forEach(b => b.classList.remove("active"));
            const pane = document.getElementById(`tab-${tabId}`);
            if (pane) pane.classList.add("active");
            if (App.soundEnabled) SoundFX.playCheck();
        }
    },

    setupTabNavigation: () => {
        const navBtns = document.querySelectorAll(".nav-btn");
        const panes = document.querySelectorAll(".tab-pane");
        const mobBtns = document.querySelectorAll(".mobile-nav-btn");

        const updateMobNav = (targetTab) => {
            mobBtns.forEach(m => m.classList.remove("active"));
            const targetMob = document.getElementById("mob-nav-" + targetTab);
            if (targetMob) targetMob.classList.add("active");
        };

        navBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetTab = btn.getAttribute("data-tab");

                navBtns.forEach(b => b.classList.remove("active"));
                panes.forEach(p => p.classList.remove("active"));

                btn.classList.add("active");
                updateMobNav(targetTab);

                const pane = document.getElementById(`tab-${targetTab}`);
                if (pane) pane.classList.add("active");

                // Refresh dynamic content on main-tab switch
                if (targetTab === "myplan") {
                    const hp = StorageUtil.get("apexlab_has_plan", false);
                    if (hp) PlanGenerator.renderPlanSummary("ai-plan-summary-container");
                } else if (targetTab === "progress") {
                    App.showProgressSubTab("checkin");
                }

                if (App.soundEnabled) SoundFX.playCheck();
            });
        });
    },

    setupEventListeners: () => {
        const soundBtn = document.getElementById("btn-sound-toggle");
        if (soundBtn) {
            soundBtn.addEventListener("click", () => {
                App.soundEnabled = !App.soundEnabled;
                soundBtn.innerHTML = App.soundEnabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
                soundBtn.style.color = App.soundEnabled ? 'var(--primary-emerald)' : 'var(--danger-rose)';
            });
        }

        const quickStartBtn = document.getElementById("btn-quick-start-workout");
        if (quickStartBtn) {
            quickStartBtn.addEventListener("click", () => App.switchTab("workout"));
        }

        const quickAddFoodDashBtn = document.getElementById("btn-quick-add-food-dash");
        if (quickAddFoodDashBtn) {
            quickAddFoodDashBtn.addEventListener("click", () => {
                const modal = document.getElementById("modal-add-food");
                if (modal) {
                    modal.classList.add("active");
                    App.renderFoodSearchResults("");
                }
            });
        }

        const profileForm = document.getElementById("profile-form");
        if (profileForm) {
            profileForm.addEventListener("submit", (e) => {
                e.preventDefault();
                App.userProfile.age = parseInt(document.getElementById("user-age").value);
                App.userProfile.gender = document.getElementById("user-gender").value;
                App.userProfile.weight = parseFloat(document.getElementById("user-weight").value);
                App.userProfile.height = parseInt(document.getElementById("user-height").value);
                App.userProfile.bodyFat = parseFloat(document.getElementById("user-bodyfat").value);
                App.userProfile.activityLevel = document.getElementById("user-activity").value;
                App.userProfile.goal = document.getElementById("user-goal").value;

                StorageUtil.set(STORAGE_KEYS.USER_PROFILE, App.userProfile);
                App.updateProfileUI();
                FoodTracker.updateMacroSummary();
                AnalyticsModule.initSupplements(App.userProfile.weight);

                if (App.soundEnabled) SoundFX.playCheck();
                App.triggerConfetti();
                alert("¡Perfil biométrico actualizado! Metas calóricas y de macronutrientes recalibradas.");
            });
        }

        const readinessForm = document.getElementById("readiness-form");
        if (readinessForm) {
            ["sleep", "soreness", "stress", "energy"].forEach(id => {
                const input = document.getElementById(`${id}-score`);
                const label = document.getElementById(`${id}-score-val`);
                if (input && label) {
                    input.addEventListener("input", () => {
                        label.innerText = `${input.value} / 10`;
                    });
                }
            });

            readinessForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const sleep = parseInt(document.getElementById("sleep-score").value);
                const soreness = parseInt(document.getElementById("soreness-score").value);
                const stress = parseInt(document.getElementById("stress-score").value);
                const energy = parseInt(document.getElementById("energy-score").value);

                const readinessScore = FatigueEngine.calculateReadiness(sleep, soreness, stress, energy);
                FatigueEngine.updateReadinessUI(readinessScore);
                if (App.soundEnabled) SoundFX.playCheck();
            });
        }

        const calcForm = document.getElementById("form-calc-1rm");
        if (calcForm) {
            const update1Rm = () => {
                const exName = document.getElementById("calc-exercise").value;
                const weight = parseFloat(document.getElementById("calc-weight").value) || 0;
                const reps = parseInt(document.getElementById("calc-reps").value) || 1;

                const rmBrzycki = StrengthEngine.calculateBrzycki(weight, reps);
                const rmEpley = StrengthEngine.calculateEpley(weight, reps);
                const tier = StrengthEngine.getStrengthTier(exName, rmBrzycki, App.userProfile.weight);

                document.getElementById("res-1rm-brzycki").innerText = `${rmBrzycki} kg`;
                document.getElementById("res-1rm-epley").innerText = `${rmEpley} kg`;
                document.getElementById("res-strength-tier").innerText = tier;
            };

            document.getElementById("calc-weight").addEventListener("input", update1Rm);
            document.getElementById("calc-reps").addEventListener("input", update1Rm);
            document.getElementById("calc-exercise").addEventListener("change", update1Rm);
            update1Rm();
        }

        const openFoodBtn = document.getElementById("btn-open-food-modal");
        const closeFoodBtn = document.getElementById("btn-close-food-modal");
        const foodModal = document.getElementById("modal-add-food");

        if (openFoodBtn && foodModal) {
            openFoodBtn.addEventListener("click", () => {
                foodModal.classList.add("active");
                App.renderFoodSearchResults("");
            });
        }

        if (closeFoodBtn && foodModal) {
            closeFoodBtn.addEventListener("click", () => {
                foodModal.classList.remove("active");
            });
        }

        const foodSearchInput = document.getElementById("food-search-input");
        if (foodSearchInput) {
            foodSearchInput.addEventListener("input", (e) => {
                App.renderFoodSearchResults(e.target.value);
            });
        }

        const changeRoutineBtn = document.getElementById("btn-change-routine");
        const routineModal = document.getElementById("modal-select-routine");
        const closeRoutineBtn = document.getElementById("btn-close-routine-modal");

        if (changeRoutineBtn && routineModal) {
            changeRoutineBtn.addEventListener("click", () => {
                routineModal.classList.add("active");
                App.renderRoutineOptions();
            });
        }

        if (closeRoutineBtn && routineModal) {
            closeRoutineBtn.addEventListener("click", () => {
                routineModal.classList.remove("active");
            });
        }

        const finishWorkoutBtn = document.getElementById("btn-finish-workout");
        if (finishWorkoutBtn) {
            finishWorkoutBtn.addEventListener("click", () => {
                WorkoutPlanner.finishSession();
                App.triggerConfetti();
            });
        }
    },

    updateProfileUI: () => {
        const { bmr, lbm, tdee, targetCalories, macros } = NutritionEngine.calculateMetabolicTargets(App.userProfile);

        document.getElementById("user-age").value = App.userProfile.age;
        document.getElementById("user-gender").value = App.userProfile.gender;
        document.getElementById("user-weight").value = App.userProfile.weight;
        document.getElementById("user-height").value = App.userProfile.height;
        document.getElementById("user-bodyfat").value = App.userProfile.bodyFat;
        document.getElementById("user-activity").value = App.userProfile.activityLevel;
        document.getElementById("user-goal").value = App.userProfile.goal;

        document.getElementById("res-bmr").innerText = `${bmr.toLocaleString()} kcal/día`;
        document.getElementById("res-lbm").innerText = `${lbm} kg`;
        document.getElementById("res-tdee").innerText = `${tdee.toLocaleString()} kcal/día`;
        document.getElementById("res-target-calories").innerText = `${targetCalories.toLocaleString()} kcal/día`;

        document.getElementById("summary-prot").innerText = `${(macros.protein / App.userProfile.weight).toFixed(1)} g/kg (${macros.protein}g)`;
        document.getElementById("summary-fat").innerText = `0.8 g/kg (${macros.fats}g)`;
        document.getElementById("summary-carb").innerText = `Restante (${macros.carbs}g)`;
    },

    toggleCustomFoodForm: () => {
        const form = document.getElementById("custom-food-form");
        if (!form) return;
        form.style.display = form.style.display === "none" ? "block" : "none";
    },

    saveCustomFood: () => {
        const name = document.getElementById("custom-food-name").value.trim();
        const kcal = parseFloat(document.getElementById("custom-food-kcal").value) || 0;
        const prot = parseFloat(document.getElementById("custom-food-prot").value) || 0;
        const carb = parseFloat(document.getElementById("custom-food-carb").value) || 0;
        const fat = parseFloat(document.getElementById("custom-food-fat").value) || 0;

        if (!name || kcal <= 0) {
            alert("Por favor, introduce al menos un nombre y las calorías por 100g.");
            return;
        }

        const newFood = {
            id: "custom-" + Date.now(),
            name: name + " (Personalizado)",
            category: "Personalizado",
            per100g: { calories: kcal, protein: prot, carbs: carb, fat: fat, fiber: 0 },
            tags: [name.toLowerCase(), "personalizado", "propio"]
        };

        const customFoods = StorageUtil.get("apexlab_custom_foods", []);
        customFoods.push(newFood);
        StorageUtil.set("apexlab_custom_foods", customFoods);

        // Reset form & hide
        document.getElementById("custom-food-name").value = "";
        document.getElementById("custom-food-kcal").value = "";
        document.getElementById("custom-food-prot").value = "";
        document.getElementById("custom-food-carb").value = "";
        document.getElementById("custom-food-fat").value = "";
        App.toggleCustomFoodForm();

        if (App.soundEnabled) SoundFX.playCheck();
        App.renderFoodSearchResults(name);
        alert("¡Alimento guardado en tu base de datos personal!");
    },

    foodSearchTimeout: null,

    renderFoodSearchResults: (query) => {
        const container = document.getElementById("food-search-results");
        if (!container) return;

        const q = query.toLowerCase().trim();
        const customFoods = StorageUtil.get("apexlab_custom_foods", []);
        const allLocal = [...FOOD_DATABASE, ...customFoods];

        const localFiltered = allLocal.filter(f => 
            f.name.toLowerCase().includes(q) || (f.tags && f.tags.some(t => t.toLowerCase().includes(q)))
        );

        container.innerHTML = "";
        
        // Render local matches first
        localFiltered.forEach(food => {
            const item = document.createElement("div");
            item.className = "food-card-interactive";
            item.innerHTML = `
                <div style="flex: 1;">
                    <h4 style="font-size: 15px;">${food.name} ${food.category === "Personalizado" ? '<span class="badge-pro" style="color:var(--primary-emerald);">Personalizado</span>' : ''}</h4>
                    <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                        Por 100g: <span style="color: var(--accent-amber);">${food.per100g.calories} kcal</span> | 
                        <span style="color: var(--danger-rose);">${food.per100g.protein}g P</span> | 
                        <span style="color: var(--accent-cyan);">${food.per100g.carbs}g C</span> | 
                        <span style="color: var(--primary-emerald);">${food.per100g.fat}g G</span>
                    </div>
                </div>
                <button class="btn-sm btn-epic-primary"><i class="fa-solid fa-plus"></i> Añadir</button>
            `;

            item.addEventListener("click", () => {
                const grams = parseFloat(document.getElementById("food-grams-input").value) || 100;
                const mealCat = document.getElementById("food-meal-select").value;

                FoodTracker.addFoodItem(food, grams, mealCat);
                document.getElementById("modal-add-food").classList.remove("active");
            });

            container.appendChild(item);
        });

        // Remote lookup via Open Food Facts API if query is 2+ chars
        if (q.length >= 2) {
            clearTimeout(App.foodSearchTimeout);
            App.foodSearchTimeout = setTimeout(() => {
                const apiHeader = document.createElement("div");
                apiHeader.style.cssText = "font-size: 11px; color: var(--text-muted); margin: 12px 0 6px; text-align: center; border-top: 1px solid var(--border-glass); padding-top: 10px;";
                apiHeader.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-cyan"></i> Consultando base de datos mundial Open Food Facts (3M+ productos)...';
                container.appendChild(apiHeader);

                fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(q)}&search_simple=1&action=process&json=1&page_size=8&fields=product_name,brands,nutriments`)
                    .then(res => res.json())
                    .then(data => {
                        apiHeader.remove();
                        if (data && data.products && data.products.length > 0) {
                            const sectionTitle = document.createElement("div");
                            sectionTitle.style.cssText = "font-size: 12px; font-weight: 800; color: var(--accent-cyan); margin: 14px 0 8px;";
                            sectionTitle.innerHTML = '<i class="fa-solid fa-globe"></i> Resultados en Marcas & Supermercados (Open Food Facts):';
                            container.appendChild(sectionTitle);

                            data.products.forEach(prod => {
                                const n = prod.nutriments || {};
                                const pName = prod.product_name || "Producto sin nombre";
                                const brand = prod.brands ? ` (${prod.brands})` : "";
                                const kcal = Math.round(n["energy-kcal_100g"] || n["energy-kcal_value"] || n["energy-kcal"] || 0);
                                const prot = parseFloat(n.proteins_100g || n.proteins_value || 0).toFixed(1);
                                const carb = parseFloat(n.carbohydrates_100g || n.carbohydrates_value || 0).toFixed(1);
                                const fat = parseFloat(n.fat_100g || n.fat_value || 0).toFixed(1);

                                if (kcal <= 0 && parseFloat(prot) <= 0) return; // Skip empty nutriments

                                const remoteFood = {
                                    id: "off-" + Math.random().toString(36).substr(2, 9),
                                    name: pName + brand,
                                    category: "Procesado / Supermercado",
                                    per100g: { calories: kcal, protein: parseFloat(prot), carbs: parseFloat(carb), fat: parseFloat(fat), fiber: 0 },
                                    tags: ["online", "supermercado"]
                                };

                                const item = document.createElement("div");
                                item.className = "food-card-interactive";
                                item.innerHTML = `
                                    <div style="flex: 1;">
                                        <h4 style="font-size: 14px;">${remoteFood.name} <span class="badge-pro" style="color:var(--accent-cyan);">Supermercado</span></h4>
                                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                                            Por 100g: <span style="color: var(--accent-amber);">${kcal} kcal</span> | 
                                            <span style="color: var(--danger-rose);">${prot}g P</span> | 
                                            <span style="color: var(--accent-cyan);">${carb}g C</span> | 
                                            <span style="color: var(--primary-emerald);">${fat}g G</span>
                                        </div>
                                    </div>
                                    <button class="btn-sm btn-epic-primary"><i class="fa-solid fa-plus"></i> Añadir</button>
                                `;

                                item.addEventListener("click", () => {
                                    const grams = parseFloat(document.getElementById("food-grams-input").value) || 100;
                                    const mealCat = document.getElementById("food-meal-select").value;

                                    FoodTracker.addFoodItem(remoteFood, grams, mealCat);
                                    document.getElementById("modal-add-food").classList.remove("active");
                                });

                                container.appendChild(item);
                            });
                        }
                    })
                    .catch(err => {
                        console.warn("Open Food Facts API search notice:", err);
                        if (apiHeader) apiHeader.remove();
                    });
            }, 350);
        }

        if (localFiltered.length === 0 && q.length < 2) {
            container.innerHTML = `<p style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 20px;">Escribe al menos 2 letras para buscar en la base de datos mundial.</p>`;
        }
    },

    renderRoutineOptions: () => {
        const container = document.getElementById("routines-options-list");
        if (!container) return;

        container.innerHTML = "";
        SCIENTIFIC_ROUTINES.forEach(routine => {
            const card = document.createElement("div");
            card.className = "routine-card-option";
            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <h4 style="font-size: 17px; color: var(--primary-emerald); font-weight: 800;">${routine.name}</h4>
                    <span class="badge-pro">${routine.frequency}</span>
                </div>
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 10px;">${routine.description}</p>
                <div style="font-size: 12px; color: var(--accent-cyan);"><strong>Objetivo:</strong> ${routine.targetGoal}</div>
            `;

            card.addEventListener("click", () => {
                WorkoutPlanner.setActiveRoutine(routine.id);
                document.getElementById("modal-select-routine").classList.remove("active");
                if (App.soundEnabled) SoundFX.playCheck();
            });

            container.appendChild(card);
        });
    }
};
