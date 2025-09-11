<!-- resources/js/Components/ThemeToggle.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue';
// Импортируем нужные переменные и функции напрямую
import { themePreference, setThemePreference } from '@/Composables/useTheme';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

// Локальное состояние для отображения в выпадающем списке (не обязательно, но полезно для UI)
const localTheme = ref(themePreference.value);

// Следим за изменением глобального состояния и обновляем локальное
onMounted(() => {
    localTheme.value = themePreference.value;
});

// Следим за изменением themePreference и обновляем localTheme
// watch(themePreference, (newVal) => {
//     localTheme.value = newVal;
// });

const handleThemeChange = (selectedTheme) => {
    console.log('Handle theme change to:', selectedTheme); // Отладка
    localTheme.value = selectedTheme;
    setThemePreference(selectedTheme); // <-- Здесь вызывается функция из useTheme
};

const currentThemeLabel = computed(() => {
    switch (themePreference.value) {
        case 'light': return 'Светлая';
        case 'dark': return 'Тёмная';
        case 'system': return 'Системная';
        default: return 'Системная';
    }
});
</script>

<template>
    <div class="relative">
        <Dropdown align="right" width="48">
            <template #trigger>
                <button
                    type="button"
                    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                    </svg>
                    <span class="ml-2 hidden md:inline">{{ currentThemeLabel }}</span>
                    <svg class="ml-2 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                </button>
            </template>

            <template #content>
                <DropdownLink as="button" type="button" @click="handleThemeChange('light')" :class="{ 'bg-gray-100 dark:bg-gray-800': localTheme === 'light' }" href="">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        Светлая
                    </div>
                </DropdownLink>

                <DropdownLink as="button" type="button" @click="handleThemeChange('dark')" :class="{ 'bg-gray-100 dark:bg-gray-800': localTheme === 'dark' }" href="">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                        Тёмная
                    </div>
                </DropdownLink>

                <DropdownLink as="button" type="button" @click="handleThemeChange('system')" :class="{ 'bg-gray-100 dark:bg-gray-800': localTheme === 'system' }" href="">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                        </svg>
                        Системная
                    </div>
                </DropdownLink>
            </template>
        </Dropdown>
    </div>
</template>
