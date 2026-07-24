/**
 * MÓDULO DE ANALÍTICAS, SUPLEMENTACIÓN Y RENDIMIENTO GLOBAL
 */

const AnalyticsModule = {
    initSupplements: (userWeight) => {
        const listContainer = document.getElementById("supplements-list");
        const checklistContainer = document.getElementById("supplements-checklist");

        if (!listContainer || !checklistContainer) return;

        listContainer.innerHTML = "";
        checklistContainer.innerHTML = "";

        const savedChecked = StorageUtil.get(STORAGE_KEYS.SUPPLEMENTS_CHECKED, {});

        EVIDENCE_SUPPLEMENTS.forEach(supp => {
            const doseText = supp.calculateDose(userWeight);

            // Card informativa
            const card = document.createElement("div");
            card.className = "supplement-card";
            card.innerHTML = `
                <h4>${supp.name}</h4>
                <div class="supplement-dose"><i class="fa-solid fa-prescription-bottle"></i> Dosis recomendada: ${doseText}</div>
                <div style="font-size: 11px; color: var(--accent-cyan); margin-bottom: 6px;"><strong>Evidencia:</strong> ${supp.evidenceTier}</div>
                <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 6px;"><strong>Timing:</strong> ${supp.timing}</p>
                <p style="font-size: 12px; color: var(--text-main);">${supp.benefits}</p>
            `;
            listContainer.appendChild(card);

            // Item de checklist
            const checkItem = document.createElement("div");
            checkItem.className = "checklist-item";
            const isChecked = !!savedChecked[supp.id];

            checkItem.innerHTML = `
                <input type="checkbox" id="check-${supp.id}" ${isChecked ? 'checked' : ''} onchange="AnalyticsModule.toggleSupplement('${supp.id}', this.checked)">
                <label for="check-${supp.id}" style="cursor: pointer; flex: 1;">
                    <strong>${supp.name}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">${doseText}</div>
                </label>
            `;
            checklistContainer.appendChild(checkItem);
        });
    },

    toggleSupplement: (suppId, isChecked) => {
        const saved = StorageUtil.get(STORAGE_KEYS.SUPPLEMENTS_CHECKED, {});
        saved[suppId] = isChecked;
        StorageUtil.set(STORAGE_KEYS.SUPPLEMENTS_CHECKED, saved);
    }
};
