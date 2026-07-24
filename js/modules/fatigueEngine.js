/**
 * MOTOR DE EVALUACIÓN DE FATIGA CENTRAL (SNC) Y AUTO-DELOAD
 */

const FatigueEngine = {
    calculateReadiness: (sleep, soreness, stress, energy) => {
        // Ponderación de variables:
        // Sueño (30%), Soreness/Agujetas inversas (25%), Estrés inverso (20%), Energía (25%)
        const sleepScore = (sleep / 10) * 30;
        const sorenessScore = ((11 - soreness) / 10) * 25;
        const stressScore = ((11 - stress) / 10) * 20;
        const energyScore = (energy / 10) * 25;

        const totalPercent = Math.round(sleepScore + sorenessScore + stressScore + energyScore);
        return totalPercent;
    },

    updateReadinessUI: (percent) => {
        const circle = document.getElementById("readiness-circle");
        const valText = document.getElementById("readiness-percent");
        const statusText = document.getElementById("readiness-status");
        const quickVal = document.getElementById("quick-readiness-val");
        const recBox = document.getElementById("readiness-recommendation");

        if (valText) valText.innerText = `${percent}%`;
        if (quickVal) quickVal.innerText = `${percent}%`;

        // Actualizar el círculo SVG (circunferencia ~ 251.2px)
        if (circle) {
            const offset = 251.2 - (251.2 * (percent / 100));
            circle.style.strokeDashoffset = offset;

            if (percent >= 80) {
                circle.style.stroke = "#00ff88"; // Verde Neón
                if (statusText) { statusText.innerText = "ÓPTIMO"; statusText.style.color = "#00ff88"; }
                if (recBox) {
                    recBox.innerHTML = `
                        <h3><i class="fa-solid fa-shield-halved"></i> Estado: Máximo Rendimiento (SNC Recuperado)</h3>
                        <p>Tu sistema nervioso está al 100%. Estás preparado para aplicar <strong>Sobrecarga Progresiva</strong> e intentar batir récords personales (PRs) con RIR 1-0 en tus primeros ejercicios.</p>
                    `;
                }
            } else if (percent >= 60) {
                circle.style.stroke = "#00d9ff"; // Cyan
                if (statusText) { statusText.innerText = "MODERADO"; statusText.style.color = "#00d9ff"; }
                if (recBox) {
                    recBox.innerHTML = `
                        <h3><i class="fa-solid fa-shield-halved"></i> Estado: Recuperación Aceptable</h3>
                        <p>Nivel de preparación medio. Mantén las cargas planificadas pero mantén un RIR conservador (RIR 2) sin llegar al fallo muscular estricto.</p>
                    `;
                }
            } else {
                circle.style.stroke = "#ff3b5c"; // Rojo Alerta
                if (statusText) { statusText.innerText = "ALTA FATIGA"; statusText.style.color = "#ff3b5c"; }
                if (recBox) {
                    recBox.innerHTML = `
                        <h3><i class="fa-solid fa-triangle-exclamation" style="color: #ff3b5c;"></i> Estado: Fatiga SNC Detectada</h3>
                        <p>Atención: Tu cuerpo presenta signos claros de sobrecarga. El motor de entrenamiento recomienda <strong>reducir 1 serie por ejercicio hoy</strong> o realizar una sesión de recuperación activa.</p>
                    `;
                }
            }
        }
    }
};
