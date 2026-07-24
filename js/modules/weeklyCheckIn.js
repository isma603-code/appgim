const WeeklyCheckIn = {
    checkIns: [],
    
    init() {
        this.checkIns = typeof StorageUtil !== 'undefined' ? StorageUtil.get('apexlab_weekly_checkins', []) : [];
        this.checkNotification();
    },

    checkNotification() {
        if (!this.checkIns || this.checkIns.length === 0) return;
        const lastCheckIn = new Date(this.checkIns[this.checkIns.length - 1].date);
        const today = new Date();
        const diffTime = Math.abs(today - lastCheckIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays >= 7) {
            console.log("¡Toca revisión semanal!");
            // Potential UI notification hook here
        }
    },

    showCheckInForm(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="glass-card-epic" style="max-width: 500px; margin: 0 auto;">
                <h2 style="font-family: var(--font-heading); font-size: 22px; margin-bottom: 20px; text-align: center;">
                    <i class="fa-solid fa-clipboard-check text-amber"></i> Revisión Semanal
                </h2>
                
                <div style="display: flex; flex-direction: column; gap: 18px;">
                    <div class="form-group-epic">
                        <label>Peso Corporal Actual (kg)</label>
                        <input type="number" id="checkin-weight" step="0.1" placeholder="Ej. 78.5" class="form-control-epic">
                    </div>
                    
                    <div class="form-group-epic">
                        <label><i class="fa-solid fa-moon text-cyan"></i> Media Horas de Sueño</label>
                        <div style="display: flex; align-items: center; gap: 14px;">
                            <input type="range" id="checkin-sleep" min="1" max="10" step="0.5" value="7" class="range-slider-epic" style="flex:1;" oninput="document.getElementById('sleep-val').innerText=this.value + 'h'">
                            <span id="sleep-val" style="font-weight: 800; min-width: 40px; text-align: right;">7h</span>
                        </div>
                    </div>
                    
                    <div class="form-group-epic">
                        <label><i class="fa-solid fa-brain text-amber"></i> Nivel de Estrés (1-10)</label>
                        <div style="display: flex; align-items: center; gap: 14px;">
                            <input type="range" id="checkin-stress" min="1" max="10" value="5" class="range-slider-epic" style="flex:1;" oninput="document.getElementById('stress-val').innerText=this.value">
                            <span id="stress-val" style="font-weight: 800; min-width: 30px; text-align: right;">5</span>
                        </div>
                    </div>

                    <div class="form-group-epic">
                        <label><i class="fa-solid fa-utensils text-emerald"></i> ¿Has seguido la dieta?</label>
                        <div class="checkin-emoji-row" id="diet-btns">
                            <button class="checkin-emoji-btn" data-val="yes" type="button">😎 Sí</button>
                            <button class="checkin-emoji-btn" data-val="so-so" type="button">😐 A medias</button>
                            <button class="checkin-emoji-btn" data-val="no" type="button">😔 No</button>
                        </div>
                        <input type="hidden" id="checkin-diet" value="">
                    </div>

                    <button class="btn-epic-primary" style="width: 100%; margin-top: 10px;" onclick="WeeklyCheckIn.submitForm()">
                        <i class="fa-solid fa-floppy-disk"></i> Guardar Registro Semanal
                    </button>
                </div>
            </div>
        `;

        const dietBtns = document.querySelectorAll('#diet-btns button');
        dietBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                dietBtns.forEach(b => b.classList.remove('selected'));
                const target = e.target.closest('button');
                target.classList.add('selected');
                document.getElementById('checkin-diet').value = target.getAttribute('data-val');
                if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined') SoundFX.playCheck();
            });
        });
    },

    submitForm() {
        const weightInput = document.getElementById('checkin-weight').value;
        const sleep = parseFloat(document.getElementById('checkin-sleep').value);
        const stress = parseInt(document.getElementById('checkin-stress').value);
        const diet = document.getElementById('checkin-diet').value;

        if (!weightInput || !diet) {
            alert('Por favor, indica tu peso actual y si has seguido la dieta.');
            return;
        }

        const data = {
            date: new Date().toISOString(),
            weight: parseFloat(weightInput),
            sleep,
            stress,
            diet
        };

        this.saveCheckIn(data);

        // Actualizar peso en el perfil del usuario
        if (typeof App !== 'undefined' && App.userProfile) {
            App.userProfile.weight = data.weight;
            if (typeof StorageUtil !== 'undefined') StorageUtil.set(STORAGE_KEYS.USER_PROFILE, App.userProfile);
            App.updateProfileUI();
        }

        // Incrementar estadisticas y verificar logros
        if (typeof StorageUtil !== 'undefined') {
            const stats = StorageUtil.get('stats', { workoutsCompleted: 0, checkIns: 0 });
            stats.checkIns += 1;
            StorageUtil.set('stats', stats);
        }
        if (typeof AchievementsModule !== 'undefined') {
            AchievementsModule.checkAchievements();
        }
        
        if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined') SoundFX.playCheck();
        if (typeof App !== 'undefined' && typeof App.triggerConfetti === 'function') App.triggerConfetti();

        // Limpiar formulario y re-renderizar la gráfica
        const weightEl = document.getElementById('checkin-weight');
        if (weightEl) weightEl.value = '';
        const dietBtns = document.querySelectorAll('#diet-btns button');
        dietBtns.forEach(b => b.classList.remove('selected'));
        const dietEl = document.getElementById('checkin-diet');
        if (dietEl) dietEl.value = '';
        
        this.renderProgressChart('weight-chart-container');
    },

    saveCheckIn(data) {
        this.checkIns.push(data);
        if (typeof StorageUtil !== 'undefined') {
            StorageUtil.set('apexlab_weekly_checkins', this.checkIns);
        }
    },

    renderProgressChart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (this.checkIns.length < 2) {
            container.innerHTML = `
                <div class="glass-card-epic" style="padding: 24px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-glass);">
                    <i class="fa-solid fa-chart-line" style="font-size: 28px; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
                    Registra al menos 2 revisiones semanales para visualizar tu curva de tendencia de peso corporal.
                </div>
            `;
            return;
        }

        const width = 400;
        const height = 200;
        const padding = 35;
        
        const weights = this.checkIns.map(c => c.weight);
        const minWeight = Math.min(...weights) - 1.5;
        const maxWeight = Math.max(...weights) + 1.5;
        
        const points = weights.map((w, i) => {
            const x = padding + (i / (weights.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((w - minWeight) / (maxWeight - minWeight)) * (height - 2 * padding);
            return `${x},${y}`;
        }).join(' ');

        let svgHtml = `
            <h4 style="font-family: var(--font-heading); font-size: 16px; margin-bottom: 12px; text-align: center; color: var(--text-main);">
                <i class="fa-solid fa-chart-line text-emerald"></i> Curva de Progreso Ponderado
            </h4>
            <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; background: rgba(8, 14, 26, 0.6); border-radius: var(--radius-md); border: 1px solid var(--border-glass); padding: 10px;">
                <!-- Grid line -->
                <line x1="${padding}" y1="${height/2}" x2="${width-padding}" y2="${height/2}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="4"/>
                
                <!-- Polyline -->
                <polyline fill="none" stroke="var(--primary-emerald)" stroke-width="3" points="${points}" stroke-linecap="round" stroke-linejoin="round"/>
                
                <!-- Data points -->
                ${weights.map((w, i) => {
                    const x = padding + (i / (weights.length - 1)) * (width - 2 * padding);
                    const y = height - padding - ((w - minWeight) / (maxWeight - minWeight)) * (height - 2 * padding);
                    return `
                        <g style="cursor: pointer;">
                            <circle cx="${x}" cy="${y}" r="5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.5"/>
                            <text x="${x}" y="${y - 10}" fill="var(--text-main)" font-size="11" font-weight="800" text-anchor="middle">${w}kg</text>
                        </g>
                    `;
                }).join('')}
            </svg>
        `;
        
        container.innerHTML = svgHtml;
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = WeeklyCheckIn;
}
