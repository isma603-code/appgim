/**
 * MOTOR DE ESTIMACIÓN DE 1RM Y ESTÁNDARES DE FUERZA ABSOLUTA
 * Fórmulas: Brzycki y Epley.
 */

const StrengthEngine = {
    calculateBrzycki: (w, r) => {
        if (r === 1) return w;
        return Math.round(w / (1.0278 - (0.0278 * r)));
    },

    calculateEpley: (w, r) => {
        if (r === 1) return w;
        return Math.round(w * (1 + (r / 30)));
    },

    getStrengthTier: (exerciseName, oneRm, bodyWeight) => {
        const ratio = oneRm / bodyWeight;

        if (exerciseName.includes("Banca")) {
            if (ratio >= 1.75) return "ÉLITE / COMPETICIÓN";
            if (ratio >= 1.4) return "AVANZADO";
            if (ratio >= 1.1) return "INTERMEDIO";
            return "PRINCIPIANTE";
        } else if (exerciseName.includes("Sentadilla")) {
            if (ratio >= 2.2) return "ÉLITE / COMPETICIÓN";
            if (ratio >= 1.8) return "AVANZADO";
            if (ratio >= 1.4) return "INTERMEDIO";
            return "PRINCIPIANTE";
        } else if (exerciseName.includes("Muerto")) {
            if (ratio >= 2.5) return "ÉLITE / COMPETICIÓN";
            if (ratio >= 2.0) return "AVANZADO";
            if (ratio >= 1.6) return "INTERMEDIO";
            return "PRINCIPIANTE";
        }

        return "AVANZADO";
    },

    initialPrs: [
        { exercise: "Press Banca Plano", weight: 100, reps: 6, rm: 117, date: "2026-07-20" },
        { exercise: "Sentadilla Trasera", weight: 140, reps: 5, rm: 160, date: "2026-07-18" },
        { exercise: "Peso Muerto", weight: 170, reps: 4, rm: 188, date: "2026-07-15" }
    ],

    renderPrTable: () => {
        const tbody = document.getElementById("pr-table-body");
        if (!tbody) return;

        const prs = StorageUtil.get(STORAGE_KEYS.PR_RECORDS, StrengthEngine.initialPrs);
        tbody.innerHTML = "";

        prs.forEach(pr => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${pr.exercise}</strong></td>
                <td>${pr.weight} kg</td>
                <td>${pr.reps} reps</td>
                <td><span style="color: var(--primary-neon); font-weight: 700;">${pr.rm} kg</span></td>
                <td>${pr.date}</td>
            `;
            tbody.appendChild(tr);
        });
    }
};
