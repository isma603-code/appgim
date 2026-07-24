/**
 * js/modules/autoRegulator.js
 * APEXLAB Auto-Regulation Module
 */
const AutoRegulator = {
    showPostSessionFeedback: function() {
        const modal = document.createElement('div');
        modal.id = 'feedback-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.backdropFilter = 'blur(5px)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';

        modal.innerHTML = `
            <div class="glass-card-epic" style="max-width: 400px; width: 90%; padding: 30px; text-align: center;">
                <h2 style="font-family: var(--font-heading); color: var(--accent-cyan); margin-bottom: 10px;">¡Entrenamiento Completado!</h2>
                <p style="color: var(--text-muted); margin-bottom: 25px;">¿Cómo sentiste la sesión en general?</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <button class="btn-epic-secondary" onclick="AutoRegulator.processFeedback('easy')" style="display: flex; flex-direction: column; align-items: center; padding: 15px;">
                        <span style="font-size: 2.5rem; margin-bottom: 5px;">😎</span>
                        <span>Muy Fácil</span>
                    </button>
                    <button class="btn-epic-secondary" onclick="AutoRegulator.processFeedback('good')" style="display: flex; flex-direction: column; align-items: center; padding: 15px;">
                        <span style="font-size: 2.5rem; margin-bottom: 5px;">💪</span>
                        <span>Óptimo</span>
                    </button>
                    <button class="btn-epic-secondary" onclick="AutoRegulator.processFeedback('hard')" style="display: flex; flex-direction: column; align-items: center; padding: 15px;">
                        <span style="font-size: 2.5rem; margin-bottom: 5px;">😤</span>
                        <span>Difícil</span>
                    </button>
                    <button class="btn-epic-secondary" onclick="AutoRegulator.processFeedback('brutal')" style="display: flex; flex-direction: column; align-items: center; padding: 15px;">
                        <span style="font-size: 2.5rem; margin-bottom: 5px;">💀</span>
                        <span>Brutal</span>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        if (typeof App !== 'undefined' && typeof App.triggerConfetti === 'function') {
            App.triggerConfetti();
        }
    },

    processFeedback: function(rating) {
        const modal = document.getElementById('feedback-modal');
        if (modal) modal.remove();
        
        if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined' && typeof SoundFX.playCheck === 'function') {
            SoundFX.playCheck();
        }

        let message = "";
        switch(rating) {
            case 'easy':
                message = "¡Demasiado fácil! Se añadirán +2.5kg a los ejercicios compuestos en tu próxima sesión.";
                break;
            case 'good':
                message = "Ritmo perfecto. Mantendremos tu progresión estándar.";
                break;
            case 'hard':
                message = "Sesión dura. Mantendremos los pesos actuales la próxima semana para asentar fuerza.";
                break;
            case 'brutal':
                message = "Has llegado al límite. Reduciremos 1 serie por ejercicio la próxima semana (descarga parcial).";
                break;
        }

        const toast = document.createElement('div');
        toast.className = 'glass-card-epic';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.zIndex = '9999';
        toast.style.padding = '15px 25px';
        toast.style.textAlign = 'center';
        toast.style.color = 'var(--accent-amber)';
        toast.innerHTML = `<i class="fa-solid fa-robot" style="margin-right: 10px;"></i> ${message}`;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 6000);
        
        StorageUtil.set('apexlab_autoregulation', {
            lastRating: rating,
            date: new Date().toISOString()
        });
    },

    getSubstitutes: function(exerciseId) {
        if (typeof EXERCISES_DATABASE === 'undefined') return [];
        
        const currentExercise = EXERCISES_DATABASE.find(e => e.id === exerciseId);
        if (!currentExercise) return [];

        const targetMuscle = currentExercise.muscleGroup;
        
        return EXERCISES_DATABASE
            .filter(e => e.muscleGroup === targetMuscle && e.id !== exerciseId)
            .sort(() => 0.5 - Math.random()) // Mezclar aleatoriamente
            .slice(0, 3);
    },

    showSubstituteModal: function(exerciseId) {
        const oldModal = document.getElementById('substitute-modal');
        if (oldModal) oldModal.remove();

        const substitutes = this.getSubstitutes(exerciseId);
        if (substitutes.length === 0) {
            alert("No se encontraron alternativas para este ejercicio.");
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'substitute-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0,0,0,0.8)';
        modal.style.backdropFilter = 'blur(5px)';
        modal.style.zIndex = '10000';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';

        let html = `
            <div class="glass-card-epic" style="max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; padding: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3 style="font-family: var(--font-heading); color: var(--text-main); margin: 0;">Alternativas</h3>
                    <button onclick="document.getElementById('substitute-modal').remove()" style="background: transparent; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div style="display: flex; flex-direction: column; gap: 15px;">
        `;

        substitutes.forEach(sub => {
            const imgPath = sub.image || 'img/ex_bench.jpg';
            html += `
                <div class="glass-card-epic" style="padding: 14px; border: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                    <img src="${imgPath}" onerror="this.src='img/ex_bench.jpg'" alt="${sub.name}" style="width: 54px; height: 54px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-glass);">
                    <div style="flex: 1;">
                        <h4 style="color: var(--accent-cyan); font-size: 14px; margin: 0 0 4px 0;">${sub.name}</h4>
                        <span style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-solid fa-layer-group"></i> ${sub.category} | <i class="fa-solid fa-child"></i> ${sub.muscleGroup}</span>
                    </div>
                    <button class="btn-epic-primary" onclick="AutoRegulator.swapExercise('${exerciseId}', '${sub.id}')" style="padding: 8px 14px; font-size: 0.85rem;">Cambiar</button>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;
        
        modal.innerHTML = html;
        document.body.appendChild(modal);
    },

    swapExercise: function(oldId, newId) {
        document.getElementById('substitute-modal').remove();
        
        if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined' && typeof SoundFX.playCheck === 'function') {
            SoundFX.playCheck();
        }
        
        const toast = document.createElement('div');
        toast.className = 'glass-card-epic';
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.zIndex = '9999';
        toast.style.padding = '15px 25px';
        toast.innerHTML = `<i class="fa-solid fa-exchange-alt" style="color: var(--accent-cyan); margin-right: 10px;"></i> Ejercicio cambiado exitosamente.`;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
        
        document.dispatchEvent(new CustomEvent('exerciseSwapped', { 
            detail: { oldId: oldId, newId: newId } 
        }));
    }
};
