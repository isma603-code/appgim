const CalendarView = {
    currentDate: new Date(),
    plan: null,
    containerId: null,

    init(containerId) {
        this.containerId = containerId;
        // StorageUtil should be globally available per system instructions
        this.plan = typeof StorageUtil !== 'undefined' ? StorageUtil.get('apexlab_generated_plan', null) : null;
        this.renderCalendar(containerId);
    },

    renderCalendar(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!this.plan) {
            container.innerHTML = `<div class="glass-card-epic p-6 text-center"><p class="text-text-muted">No hay un plan activo. Genera uno primero.</p></div>`;
            return;
        }

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        const startDate = new Date(this.plan.startDate);
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const currentWeek = Math.max(1, Math.min(Math.ceil(diffDays / 7), this.plan.durationWeeks));
        const mesocycle = Math.ceil(currentWeek / (this.plan.deloadEvery || 4)) || 1;

        let html = `
            <div class="glass-card-epic">
                <div class="calendar-header">
                    <button class="calendar-nav-btn" onclick="CalendarView.navigateMonth(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                    <h2 style="font-family: var(--font-heading); font-size: 22px; font-weight: 800;">${monthNames[month]} ${year}</h2>
                    <button class="calendar-nav-btn" onclick="CalendarView.navigateMonth(1)"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                <div style="margin-bottom: 20px; text-align: center;">
                    <p style="font-size: 13px; color: var(--text-muted); font-weight: 600;">Semana ${currentWeek} de ${this.plan.durationWeeks} • Mesociclo ${mesocycle}</p>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: var(--radius-full); margin-top: 8px; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, var(--primary-emerald), var(--accent-cyan)); border-radius: var(--radius-full); width: ${(currentWeek/this.plan.durationWeeks)*100}%;"></div>
                    </div>
                </div>
                <div class="calendar-grid" style="margin-bottom: 8px;">
                    <div class="calendar-weekday">Lun</div>
                    <div class="calendar-weekday">Mar</div>
                    <div class="calendar-weekday">Mié</div>
                    <div class="calendar-weekday">Jue</div>
                    <div class="calendar-weekday">Vie</div>
                    <div class="calendar-weekday">Sáb</div>
                    <div class="calendar-weekday">Dom</div>
                </div>
                <div class="calendar-grid">
        `;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let startOffset = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < startOffset; i++) {
            html += `<div class="calendar-day empty"></div>`;
        }

        const todayStr = today.toISOString().split('T')[0];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            const dayTypeInfo = this.getDayType(date);
            const isToday = dateStr === todayStr;

            let dayClass = 'calendar-day ' + dayTypeInfo.type;
            if (isToday) dayClass += ' today';

            html += `
                <div class="${dayClass}" onclick="CalendarView.openDayDetail('${dateStr}')">
                    <span>${day}</span>
                    <span class="day-dot"></span>
                </div>
            `;
        }

        html += `
                </div>
                <div class="calendar-legend">
                    <div class="legend-item"><span class="legend-dot training"></span> Entrenamiento</div>
                    <div class="legend-item"><span class="legend-dot rest"></span> Descanso</div>
                    <div class="legend-item"><span class="legend-dot deload"></span> Deload</div>
                </div>
                <div id="calendar-day-detail" style="margin-top: 20px; display: none;"></div>
            </div>
        `;

        container.innerHTML = html;
    },

    navigateMonth(offset) {
        this.currentDate.setMonth(this.currentDate.getMonth() + offset);
        if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined') SoundFX.playCheck();
        this.renderCalendar(this.containerId);
    },

    getDayType(date) {
        if (!this.plan || !this.plan.weekPlan) return { type: 'rest', detail: null };
        
        const startDate = new Date(this.plan.startDate);
        startDate.setHours(0,0,0,0);
        const checkDate = new Date(date);
        checkDate.setHours(0,0,0,0);

        if (checkDate < startDate) return { type: 'rest', detail: null };

        const diffTime = checkDate - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weekNumber = Math.floor(diffDays / 7) + 1;
        
        if (weekNumber > this.plan.durationWeeks) return { type: 'rest', detail: null };
        
        let dayOfWeek = checkDate.getDay();
        dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek; // 1-7 for Mon-Sun

        const isDeload = weekNumber % (this.plan.deloadEvery || 4) === 0;

        const dayPlan = this.plan.weekPlan.find(d => d.dayOfWeek === dayOfWeek);

        if (dayPlan) {
            return {
                type: isDeload ? 'deload' : 'training',
                detail: dayPlan,
                weekNumber
            };
        }

        if (dayOfWeek === 7) {
            return { type: 'review', detail: null };
        }

        return { type: 'rest', detail: null };
    },

    openDayDetail(dateStr) {
        if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined') SoundFX.playCheck();
        const date = new Date(dateStr);
        const typeInfo = this.getDayType(date);
        const detailContainer = document.getElementById('calendar-day-detail');
        if (!detailContainer) return;

        detailContainer.classList.remove('hidden');

        if (typeInfo.type === 'training' || typeInfo.type === 'deload') {
            const plan = typeInfo.detail;
            const titleColor = typeInfo.type === 'deload' ? 'color: var(--accent-amber);' : 'color: var(--primary-emerald);';
            const borderColor = typeInfo.type === 'deload' ? 'border-color: var(--accent-amber);' : 'border-color: var(--primary-emerald);';
            
            let html = `
                <div class="glass-card-epic" style="padding: 20px; border: 1px solid; ${borderColor} border-radius: var(--radius-md);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                        <h3 style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; ${titleColor}">
                            <i class="fa-solid fa-dumbbell"></i> ${plan.name} ${typeInfo.type === 'deload' ? '<span style="font-size: 11px; background: rgba(255,183,0,0.15); padding: 3px 8px; border-radius: 99px;">Descarga (Deload)</span>' : ''}
                        </h3>
                        <button class="btn-sm btn-epic-primary" onclick="WorkoutPlanner.startSessionByName('${plan.name}')">
                            <i class="fa-solid fa-play"></i> Entrenar Este Día
                        </button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
            `;
            
            if (plan.exercises && plan.exercises.length > 0) {
                plan.exercises.forEach(ex => {
                    const exData = typeof EXERCISES_DATABASE !== "undefined" ? EXERCISES_DATABASE.find(e => e.id === ex.exerciseId) : null;
                    const name = exData ? exData.name : (ex.name || ex.exerciseId);
                    const imgSrc = exData ? exData.image : 'img/ex_bench.jpg';
                    const reps = ex.targetReps || ex.reps || "8-10";
                    const rir = ex.targetRir !== undefined ? ex.targetRir : 2;
                    const weightStr = ex.prescribedWeight > 0 ? `<strong style="color: var(--accent-cyan);">${ex.prescribedWeight} kg</strong>` : 'Peso corporal / RIR ' + rir;

                    html += `
                        <div style="display: flex; gap: 14px; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 10px 14px; border-radius: var(--radius-sm);">
                            <img src="${imgSrc}" style="width: 56px; height: 42px; object-fit: cover; border-radius: 6px;" alt="${name}">
                            <div style="flex: 1;">
                                <div style="font-weight: 700; font-size: 14px;">${name}</div>
                                <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                                    ${ex.sets} series × ${reps} reps | RIR ${rir} | Objetivo: ${weightStr}
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += `<div style="font-size: 13px; color: var(--text-muted);">No hay ejercicios configurados para este día.</div>`;
            }
            
            html += `
                    </div>
                </div>
            `;
            detailContainer.innerHTML = html;
        } else if (typeInfo.type === 'rest') {
            detailContainer.innerHTML = `<div class="glass-card-epic" style="padding: 18px; text-align: center; color: var(--text-muted);"><i class="fa-solid fa-bed" style="font-size: 24px; margin-bottom: 8px; display: block; opacity: 0.5;"></i> Día de descanso y recuperación celular activa.</div>`;
        } else if (typeInfo.type === 'review') {
            detailContainer.innerHTML = `<div class="glass-card-epic" style="padding: 18px; text-align: center; color: var(--accent-cyan);"><i class="fa-solid fa-clipboard-check" style="font-size: 24px; margin-bottom: 8px; display: block;"></i> Día de revisión semanal. Completa tu Check-in en la sección de Evolución.</div>`;
        }
    },

    exportToICS() {
        if (!this.plan) return;
        if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined') SoundFX.playCheck();

        let icsData = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//APEXLAB//Fitness Plan//ES\n";

        const startDate = new Date(this.plan.startDate);
        startDate.setHours(0,0,0,0);
        
        for (let day = 0; day < this.plan.durationWeeks * 7; day++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + day);
            
            const typeInfo = this.getDayType(currentDate);
            if (typeInfo.type === 'training' || typeInfo.type === 'deload') {
                const dateStr = currentDate.toISOString().split('T')[0].replace(/-/g, '');
                const plan = typeInfo.detail;
                const title = `APEXLAB: ${plan.name} ${typeInfo.type === 'deload' ? '(Descarga)' : ''}`;
                
                let desc = `Entrenamiento: ${plan.name}\\n`;
                if (plan.exercises) {
                    plan.exercises.forEach(ex => {
                        desc += `- ${ex.name}: ${ex.sets}x${ex.reps}\\n`;
                    });
                }

                icsData += "BEGIN:VEVENT\n";
                icsData += `DTSTART;VALUE=DATE:${dateStr}\n`;
                icsData += `DTEND;VALUE=DATE:${dateStr}\n`;
                icsData += `SUMMARY:${title}\n`;
                icsData += `DESCRIPTION:${desc}\n`;
                icsData += "END:VEVENT\n";
            }
        }

        icsData += "END:VCALENDAR";

        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'apexlab_plan.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        if (typeof App !== 'undefined' && typeof App.triggerConfetti === 'function') {
            App.triggerConfetti();
        }
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = CalendarView;
}
