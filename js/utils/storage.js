/**
 * MÓDULO DE ALMACENAMIENTO Y PERSISTENCIA (LOCALSTORAGE)
 */

const STORAGE_KEYS = {
    USER_PROFILE: "apexfit_user_profile",
    ACTIVE_ROUTINE: "apexfit_active_routine",
    WORKOUT_LOGS: "apexfit_workout_logs",
    NUTRITION_LOG: "apexfit_nutrition_today",
    READINESS_LOGS: "apexfit_readiness_history",
    PR_RECORDS: "apexfit_pr_records",
    SUPPLEMENTS_CHECKED: "apexfit_supplements_checked"
};

const StorageUtil = {
    get: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`Error leyendo de LocalStorage key: ${key}`, e);
            return defaultValue;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error guardando en LocalStorage key: ${key}`, e);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(`Error eliminando de LocalStorage key: ${key}`, e);
        }
    }
};
