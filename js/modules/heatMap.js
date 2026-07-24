/**
 * ══════════════════════════════════════════════════════════════════
 *  MOTOR INTERACTIVO DE MAPA DE CALOR Y BALANCE MUSCULAR (MEV / MAV / MRV)
 *  Basado en la evidencia científica de RP (Renaissance Periodization)
 * ══════════════════════════════════════════════════════════════════
 */

const HeatMapEngine = {

    /**
     * Rangos científicos de volumen semanal (Mike Israetel)
     */
    ranges: {
        "Pecho": { mv: 6, mev: 10, mavMin: 12, mavMax: 20, mrv: 22 },
        "Espalda": { mv: 6, mev: 10, mavMin: 14, mavMax: 22, mrv: 25 },
        "Hombros": { mv: 6, mev: 8, mavMin: 12, mavMax: 20, mrv: 24 },
        "Cuádriceps": { mv: 6, mev: 8, mavMin: 12, mavMax: 18, mrv: 20 },
        "Isquios": { mv: 4, mev: 6, mavMin: 10, mavMax: 16, mrv: 18 },
        "Glúteos": { mv: 4, mev: 6, mavMin: 10, mavMax: 18, mrv: 22 },
        "Bíceps": { mv: 4, mev: 8, mavMin: 10, mavMax: 16, mrv: 20 },
        "Tríceps": { mv: 4, mev: 6, mavMin: 10, mavMax: 16, mrv: 18 },
        "Abdomen": { mv: 0, mev: 6, mavMin: 8, mavMax: 16, mrv: 20 }
    },

    weeklyVolumes: {
        "Pecho": 14,
        "Hombros": 16,
        "Espalda": 14,
        "Bíceps": 12,
        "Tríceps": 12,
        "Abdomen": 10,
        "Cuádriceps": 16,
        "Isquios": 12,
        "Glúteos": 12
    },

    registerCompletedDay: (day) => {
        day.exercises.forEach(exItem => {
            const exData = EXERCISES_DATABASE.find(e => e.id === exItem.exerciseId);
            if (exData && exData.muscleGroup) {
                const group = exData.muscleGroup;
                HeatMapEngine.weeklyVolumes[group] = (HeatMapEngine.weeklyVolumes[group] || 0) + exItem.sets;
            }
        });
        HeatMapEngine.updateSvgHeatmap();
        HeatMapEngine.renderVolumeDashboard("muscle-volume-dashboard-container");
    },

    updateSvgHeatmap: () => {
        const mappings = [
            { elementId: "muscle-chest", group: "Pecho" },
            { elementId: "muscle-delts", group: "Hombros" },
            { elementId: "muscle-lats", group: "Espalda" },
            { elementId: "muscle-biceps", group: "Bíceps" },
            { elementId: "muscle-abs", group: "Abdomen" },
            { elementId: "muscle-quads", group: "Cuádriceps" },
            { elementId: "muscle-hamstrings", group: "Isquios" }
        ];

        mappings.forEach(item => {
            const el = document.getElementById(item.elementId);
            if (el) {
                const vol = HeatMapEngine.weeklyVolumes[item.group] || 0;
                const r = HeatMapEngine.ranges[item.group] || { mev: 10, mrv: 22 };

                el.classList.remove("mev", "mav", "mrv");

                if (vol >= r.mrv) {
                    el.classList.add("mrv");
                } else if (vol >= r.mev) {
                    el.classList.add("mav");
                } else {
                    el.classList.add("mev");
                }
            }
        });
    },

    onMuscleClick: (muscleName) => {
        if (App.soundEnabled) SoundFX.playCheck();
        const detailTitle = document.getElementById("muscle-detail-name");
        const detailText = document.getElementById("muscle-detail-text");
        const detailBox = document.getElementById("muscle-info-card");

        if (!detailTitle || !detailText) return;

        const vol = HeatMapEngine.weeklyVolumes[muscleName] || 12;
        const r = HeatMapEngine.ranges[muscleName] || { mev: 8, mavMin: 12, mavMax: 18, mrv: 20 };

        let status = "MAV (Hipertrofia Óptima)";
        let rec = "Mantén este nivel de volumen semanal para una hipertrofia sostenida.";
        let badgeColor = "var(--primary-emerald)";

        if (vol >= r.mrv) {
            status = "MRV (Límite Máximo de Recuperación)";
            rec = "⚠️ Cuidado: Riesgo de sobreentrenamiento. Reduce 2 series la próxima semana.";
            badgeColor = "var(--danger-rose)";
        } else if (vol < r.mev) {
            status = "MEV (Volumen de Mantenimiento)";
            rec = "💡 Puedes añadir 2-4 series semanales adicionales para acelerar el crecimiento.";
            badgeColor = "var(--accent-cyan)";
        }

        detailTitle.innerText = `💪 Grupo Muscular: ${muscleName}`;
        detailText.innerHTML = `
            <strong>Volumen Acumulado:</strong> ${vol} series efectivas / semana.<br>
            <strong>Rango MAV Óptimo:</strong> ${r.mavMin} - ${r.mavMax} series.<br>
            <strong>Estatus Científico:</strong> <span style="color: ${badgeColor}; font-weight:800;">${status}</span>.<br>
            <em style="display:block; margin-top:6px; color:var(--text-main);">${rec}</em>
        `;

        if (detailBox) {
            detailBox.style.animation = "none";
            detailBox.offsetHeight;
            detailBox.style.animation = "pulseGlow 0.8s ease";
        }
    },

    /**
     * Renderiza el panel de barras de balance de volumen muscular
     */
    renderVolumeDashboard: (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div style="margin-bottom: 16px;">
                <h3 style="font-family:var(--font-heading); font-size:18px; margin-bottom:4px;">
                    <i class="fa-solid fa-chart-column text-emerald"></i> Balance Muscular Semanal (MEV / MAV / MRV)
                </h3>
                <p style="font-size:12px; color:var(--text-muted);">Conteo de series efectivas aplicadas esta semana vs. rangos científicos de hipertrofia.</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:12px;">
        `;

        Object.keys(HeatMapEngine.ranges).forEach(group => {
            const r = HeatMapEngine.ranges[group];
            const vol = HeatMapEngine.weeklyVolumes[group] || 0;

            const pct = Math.min(100, Math.round((vol / r.mrv) * 100));

            let statusTag = "";
            let barColor = "";

            if (vol >= r.mrv) {
                statusTag = `<span class="badge-pro" style="background:rgba(255,46,99,0.2); color:var(--danger-rose); border:1px solid var(--danger-rose);">MRV (Exceso)</span>`;
                barColor = "var(--danger-rose)";
            } else if (vol >= r.mavMin) {
                statusTag = `<span class="badge-pro" style="background:rgba(0,255,157,0.2); color:var(--primary-emerald); border:1px solid var(--primary-emerald);">MAV (Óptimo)</span>`;
                barColor = "var(--primary-emerald)";
            } else {
                statusTag = `<span class="badge-pro" style="background:rgba(0,240,255,0.2); color:var(--accent-cyan); border:1px solid var(--accent-cyan);">MEV (Mantenimiento)</span>`;
                barColor = "var(--accent-cyan)";
            }

            html += `
                <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); padding:12px 16px; border-radius:var(--radius-sm);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                        <div>
                            <strong style="font-size:14px;">${group}</strong>
                            <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">${vol} / ${r.mavMax} series</span>
                        </div>
                        ${statusTag}
                    </div>
                    <div class="bar-track" style="height:8px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden;">
                        <div class="bar-fill" style="width: ${pct}%; height:100%; background: ${barColor}; transition: width 0.6s ease;"></div>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    },

    getMiniMuscleSvgHtml: (activeGroup) => {
        const isChest = activeGroup === "Pecho";
        const isDelts = activeGroup === "Hombros";
        const isLats = activeGroup === "Espalda";
        const isBiceps = activeGroup === "Bíceps";
        const isAbs = activeGroup === "Abdomen";
        const isQuads = activeGroup === "Cuádriceps";
        const isHamstrings = activeGroup === "Isquios";
        const isGlutes = activeGroup === "Glúteos";

        const glowColor = "#34d399";
        const dimColor = "rgba(255,255,255,0.12)";

        return `
            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-glass); border-radius: var(--radius-sm); padding: 8px 16px; display: flex; align-items: center; justify-content: space-around; margin-bottom: 12px;">
                <svg viewBox="0 0 300 420" style="width: 50px; height: 75px; filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.5));">
                    <g fill="${isChest ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <path d="M 115 110 C 135 110, 148 115, 150 135 C 135 145, 115 140, 115 110 Z" />
                        <path d="M 185 110 C 165 110, 152 115, 150 135 C 165 145, 185 140, 185 110 Z" />
                    </g>
                    <g fill="${isDelts ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <path d="M 95 105 C 105 105, 115 110, 112 130 C 95 130, 90 118, 95 105 Z" />
                        <path d="M 205 105 C 195 105, 185 110, 188 130 C 205 130, 210 118, 205 105 Z" />
                    </g>
                    <g fill="${isLats ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <path d="M 110 145 C 120 150, 125 180, 130 200 C 115 190, 105 170, 110 145 Z" />
                        <path d="M 190 145 C 180 150, 175 180, 170 200 C 185 190, 195 170, 190 145 Z" />
                    </g>
                    <g fill="${isBiceps ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <path d="M 90 135 C 100 135, 102 165, 92 170 C 85 165, 83 145, 90 135 Z" />
                        <path d="M 210 135 C 200 135, 198 165, 208 170 C 215 165, 217 145, 210 135 Z" />
                    </g>
                    <g fill="${isAbs ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <rect x="135" y="145" width="30" height="60" rx="6" />
                    </g>
                    <g fill="${isQuads ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <path d="M 115 220 C 145 220, 140 310, 125 320 C 110 310, 105 240, 115 220 Z" />
                        <path d="M 185 220 C 155 220, 160 310, 175 320 C 190 310, 195 240, 185 220 Z" />
                    </g>
                    <g fill="${isHamstrings || isGlutes ? glowColor : dimColor}" stroke="#1e293b" stroke-width="2">
                        <path d="M 125 325 L 125 390 L 110 390 L 110 325 Z" />
                        <path d="M 175 325 L 175 390 L 190 390 L 190 325 Z" />
                    </g>
                </svg>

                <div style="text-align: left;">
                    <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 800; display: block;">MÚSCULO EN TRABAJO 2D 🔥</span>
                    <strong style="font-size: 15px; color: var(--primary-emerald); font-family: var(--font-heading);">${activeGroup || 'General'}</strong>
                    <p style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Carga activa reflejada en tu mapa anatómico</p>
                </div>
            </div>
        `;
    }
};
