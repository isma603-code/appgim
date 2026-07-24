/**
 * js/modules/achievements.js
 * APEXLAB Achievements Module
 */
const AchievementsModule = {
    ACHIEVEMENTS_LIST: [
        { id: 'first_workout', name: 'Primera Sesión Completada', description: 'Completa tu primer entrenamiento.', icon: 'fa-solid fa-dumbbell' },
        { id: 'streak_7', name: 'Constancia Semanal', description: 'Entrena durante 7 días seguidos.', icon: 'fa-solid fa-fire' },
        { id: 'streak_30', name: 'Máquina Imparable', description: 'Entrena durante 30 días seguidos.', icon: 'fa-solid fa-fire-flame-curved' },
        { id: 'pr_broken', name: 'Nuevo Récord Personal', description: 'Supera un Récord Personal (PR).', icon: 'fa-solid fa-trophy' },
        { id: 'mesocycle_complete', name: 'Mesociclo Conquistado', description: 'Completa un mesociclo entero.', icon: 'fa-solid fa-calendar-check' },
        { id: 'perfect_week', name: 'Semana Perfecta', description: 'Completa todas las sesiones planificadas en una semana.', icon: 'fa-solid fa-star' },
        { id: 'nutrition_streak_7', name: 'Dieta de Hierro', description: 'Cumple tus macros durante 7 días seguidos.', icon: 'fa-solid fa-apple-whole' },
        { id: 'first_checkin', name: 'Primer Check-In', description: 'Completa tu primer check-in semanal.', icon: 'fa-solid fa-clipboard-check' }
    ],

    init: function() {
        this.achievements = StorageUtil.get('apexlab_achievements', this.ACHIEVEMENTS_LIST.map(a => ({ ...a, unlocked: false, unlockedDate: null })));
        this.checkAchievements();
    },

    checkAchievements: function() {
        // Integrate with app state here. Placeholder conditions for demonstration:
        const stats = StorageUtil.get('stats', { workoutsCompleted: 0, checkIns: 0 });
        if (stats.workoutsCompleted >= 1 && !this.isUnlocked('first_workout')) {
            this.unlockAchievement('first_workout');
        }
        if (stats.checkIns >= 1 && !this.isUnlocked('first_checkin')) {
            this.unlockAchievement('first_checkin');
        }
        
        const streak = this.getStreak();
        if (streak >= 7 && !this.isUnlocked('streak_7')) {
            this.unlockAchievement('streak_7');
        }
        if (streak >= 30 && !this.isUnlocked('streak_30')) {
            this.unlockAchievement('streak_30');
        }
    },

    isUnlocked: function(id) {
        const ach = this.achievements.find(a => a.id === id);
        return ach ? ach.unlocked : false;
    },

    unlockAchievement: function(id) {
        const index = this.achievements.findIndex(a => a.id === id);
        if (index !== -1 && !this.achievements[index].unlocked) {
            this.achievements[index].unlocked = true;
            this.achievements[index].unlockedDate = new Date().toISOString();
            StorageUtil.set('apexlab_achievements', this.achievements);
            
            this.showToast(this.achievements[index]);
            if (typeof App !== 'undefined' && typeof App.triggerConfetti === 'function') {
                App.triggerConfetti();
            }
            if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined' && typeof SoundFX.playCheck === 'function') {
                SoundFX.playCheck();
            }
        }
    },

    showToast: function(achievement) {
        const toast = document.createElement('div');
        toast.className = 'glass-card-epic achievement-toast';
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.zIndex = '9999';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '15px';
        toast.style.padding = '15px 25px';
        toast.style.borderRadius = 'var(--radius-full)';
        toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        toast.style.animation = 'slideDown 0.5s ease forwards, fadeOut 0.5s ease 4.5s forwards';

        toast.innerHTML = `
            <div style="font-size: 2rem; color: var(--accent-amber);">
                <i class="${achievement.icon}"></i>
            </div>
            <div>
                <div style="font-family: var(--font-heading); font-size: 0.9rem; color: var(--accent-cyan);">¡LOGRO DESBLOQUEADO!</div>
                <div style="font-family: var(--font-main); font-weight: bold; color: var(--text-main); font-size: 1.1rem;">${achievement.name}</div>
            </div>
        `;

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    },

    renderAchievementsPanel: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '<div class="achievements-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">';
        
        this.achievements.forEach(ach => {
            const isUnlocked = ach.unlocked;
            const dateStr = isUnlocked && ach.unlockedDate ? new Date(ach.unlockedDate).toLocaleDateString() : '';
            
            html += `
                <div class="glass-card-epic" style="padding: 20px; text-align: center; opacity: ${isUnlocked ? '1' : '0.5'}; filter: ${isUnlocked ? 'none' : 'grayscale(1)'}; border: 1px solid ${isUnlocked ? 'var(--accent-amber)' : 'var(--border-glass)'};">
                    <div style="font-size: 2.5rem; color: ${isUnlocked ? 'var(--accent-amber)' : 'var(--text-muted)'}; margin-bottom: 10px;">
                        <i class="${ach.icon}"></i>
                    </div>
                    <h4 style="font-family: var(--font-heading); margin-bottom: 5px; color: var(--text-main);">${ach.name}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: ${isUnlocked ? '10px' : '0'};">${ach.description}</p>
                    ${isUnlocked ? `<span style="font-size: 0.75rem; color: var(--accent-cyan);"><i class="fa-solid fa-check"></i> Desbloqueado el ${dateStr}</span>` : `<span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-solid fa-lock"></i> Bloqueado</span>`}
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    },

    getStreak: function() {
        const history = StorageUtil.get('workout_history', []);
        if (!history || history.length === 0) return 0;
        
        const dates = [...new Set(history.map(h => new Date(h.date).toDateString()))].map(d => new Date(d));
        dates.sort((a, b) => b - a);
        
        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        
        const firstDate = dates[0];
        const diffDays = Math.floor((currentDate - firstDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) return 0;
        
        streak = 1;
        for (let i = 1; i < dates.length; i++) {
            const diff = Math.floor((dates[i-1] - dates[i]) / (1000 * 60 * 60 * 24));
            if (diff === 1) {
                streak++;
            } else {
                break;
            }
        }
        return streak;
    }
};
