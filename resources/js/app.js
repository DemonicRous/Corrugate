// resources/js/app.js
import './bootstrap';
import '../css/app.css';

// Импортируем useTheme, чтобы запустилась инициализация
// (initTheme вызывается автоматически при импорте useTheme.js)
import { useTheme } from './Composables/useTheme';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        // Инициализация темы уже произошла выше при импорте

        // Если вы хотите использовать composable внутри компонентов:
        // const { themePreference, isDark, setThemePreference } = useTheme();

        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
