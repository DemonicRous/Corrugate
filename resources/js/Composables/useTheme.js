// resources/js/Composables/useTheme.js
import { ref, watch, onMounted } from 'vue';

const THEME_KEY = 'app-theme-preference';

// Используем ref для реактивности
export const themePreference = ref('system'); // 'light', 'dark', 'system'
export const isDark = ref(false); // Фактическая тема (true = темная)

/**
 * Применяет тему, добавляя/удаляя класс 'dark' на <html>
 * @param {boolean} dark - true для темной темы, false для светлой
 */
export const applyTheme = (dark) => {
    console.log('Applying theme:', dark ? 'dark' : 'light'); // Отладка
    if (dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    isDark.value = dark;
};

/**
 * Определяет, какая тема должна быть применена
 * @param {string} preference - Предпочтение пользователя ('light', 'dark', 'system')
 * @returns {boolean} - true если темная тема, false если светлая
 */
const resolveTheme = (preference) => {
    console.log('Resolving theme for preference:', preference); // Отладка
    if (preference === 'dark') return true;
    if (preference === 'light') return false;

    // Если 'system', проверяем системные настройки
    if (preference === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('System prefers dark:', systemPrefersDark); // Отладка
        return systemPrefersDark;
    }
    return false; // По умолчанию светлая
};

/**
 * Устанавливает предпочтение пользователя и применяет тему
 * @param {string} newPreference - 'light', 'dark', 'system'
 */
export const setThemePreference = (newPreference) => {
    console.log('Setting theme preference to:', newPreference); // Отладка
    themePreference.value = newPreference;
    localStorage.setItem(THEME_KEY, newPreference);
    applyTheme(resolveTheme(newPreference));
};

/**
 * Инициализирует тему при запуске приложения
 */
export const initTheme = () => {
    console.log('Initializing theme...'); // Отладка
    const savedPreference = localStorage.getItem(THEME_KEY);

    if (savedPreference) {
        themePreference.value = savedPreference;
        console.log('Loaded saved preference:', savedPreference); // Отладка
    } else {
        // Если нет сохраненного предпочтения, определяем из системных настроек
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        themePreference.value = systemPrefersDark ? 'dark' : 'light'; // Или 'system', если хотите именно системную
        console.log('No saved preference, using system:', themePreference.value); // Отладка
    }

    // Применяем тему
    applyTheme(resolveTheme(themePreference.value));

    // Слушаем изменения системной темы
    // Важно: слушатель должен быть внутри initTheme и использовать applyTheme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
        console.log('System theme changed. Is dark?', e.matches); // Отладка
        if (themePreference.value === 'system') {
            applyTheme(e.matches);
        }
    };
    // Удаляем предыдущий слушатель, если он был (на случай горячей перезагрузки)
    if (mediaQuery.__handler) {
        mediaQuery.removeEventListener('change', mediaQuery.__handler);
    }
    // Сохраняем ссылку на обработчик для возможности удаления
    mediaQuery.__handler = handleSystemThemeChange;
    mediaQuery.addEventListener('change', handleSystemThemeChange);
};

// Запускаем инициализацию при импорте этого модуля
// Это гарантирует, что тема будет установлена до создания приложения
initTheme();

// Также экспортируем функцию для использования в других местах, если нужно
export function useTheme() {
    return {
        themePreference,
        isDark,
        setThemePreference,
    };
}
