/**
 * js/modules/progressPhotos.js
 * APEXLAB Progress Photos Module
 */
const ProgressPhotos = {
    init: function() {
        this.photos = StorageUtil.get('apexlab_progress_photos', []);
        this.checkReminder();
    },

    checkReminder: function() {
        if (this.photos.length === 0) return;
        
        const lastPhoto = this.photos[this.photos.length - 1];
        const lastDate = new Date(lastPhoto.date);
        const today = new Date();
        const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 14) {
            this.showReminder();
        }
    },

    showReminder: function() {
        const toast = document.createElement('div');
        toast.className = 'glass-card-epic';
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.style.padding = '20px';
        toast.style.borderLeft = '4px solid var(--accent-cyan)';
        
        toast.innerHTML = `
            <div style="display: flex; gap: 15px; align-items: flex-start;">
                <div style="font-size: 2rem; color: var(--accent-cyan);"><i class="fa-solid fa-camera"></i></div>
                <div>
                    <h4 style="font-family: var(--font-heading); margin-bottom: 5px; color: var(--text-main);">¡Hora de Actualizar!</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 15px;">Han pasado 14 días desde tu última foto de progreso.</p>
                    <button class="btn-epic-primary" onclick="this.parentElement.parentElement.parentElement.remove()" style="font-size: 0.8rem; padding: 5px 15px;">Entendido</button>
                </div>
            </div>
        `;
        document.body.appendChild(toast);
    },

    showGallery: function(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = `
            <div style="margin-bottom: 20px;">
                <label class="btn-epic-primary" style="cursor: pointer; display: inline-block;">
                    <i class="fa-solid fa-plus"></i> Añadir Foto
                    <input type="file" accept="image/*" style="display: none;" onchange="ProgressPhotos.handleFileInput(event)">
                </label>
            </div>
            <div class="photos-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
        `;
        
        if (this.photos.length === 0) {
            html += `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px; border: 2px dashed var(--border-glass); border-radius: var(--radius-md);">No hay fotos de progreso aún. ¡Sube la primera!</div>`;
        } else {
            this.photos.forEach((photo, index) => {
                const dateStr = new Date(photo.date).toLocaleDateString();
                html += `
                    <div class="glass-card-epic photo-item" style="padding: 10px; position: relative;">
                        <button onclick="ProgressPhotos.deletePhoto(${index}); ProgressPhotos.showGallery('${containerId}')" style="position: absolute; top: -10px; right: -10px; background: var(--danger-rose); color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-times"></i></button>
                        <div style="height: 200px; border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 10px; background: var(--bg-card);">
                            <img src="${photo.dataUrl}" style="width: 100%; height: 100%; object-fit: contain;">
                        </div>
                        <div style="text-align: center;">
                            <div style="font-weight: bold; font-family: var(--font-heading); color: var(--text-main);">${dateStr}</div>
                            ${photo.note ? `<div style="font-size: 0.8rem; color: var(--text-muted);">${photo.note}</div>` : ''}
                        </div>
                    </div>
                `;
            });
        }
        
        html += '</div>';
        container.innerHTML = html;
    },

    handleFileInput: function(event) {
        const file = event.target.files[0];
        if (file) {
            this.addPhoto(file);
        }
    },

    addPhoto: function(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            const note = prompt("Añade una nota corta (opcional):", "Semana " + (this.photos.length + 1));
            
            this.photos.push({
                date: new Date().toISOString(),
                dataUrl: dataUrl,
                note: note || ''
            });
            
            StorageUtil.set('apexlab_progress_photos', this.photos);
            
            if (typeof App !== 'undefined' && App.soundEnabled && typeof SoundFX !== 'undefined' && typeof SoundFX.playCheck === 'function') {
                SoundFX.playCheck();
            }
            
            const grid = document.querySelector('.photos-grid');
            if (grid && grid.parentElement) {
                this.showGallery(grid.parentElement.id);
            }
        };
        reader.readAsDataURL(file);
    },

    deletePhoto: function(index) {
        if (confirm("¿Seguro que quieres eliminar esta foto?")) {
            this.photos.splice(index, 1);
            StorageUtil.set('apexlab_progress_photos', this.photos);
        }
    }
};
