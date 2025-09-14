<!-- resources/js/Components/TabScrollButton.vue -->
<script setup>
import { computed } from 'vue';

const props = defineProps({
    direction: {
        type: String,
        required: true,
        validator: (value) => ['left', 'right'].includes(value)
    }
});

// Вычисляемые свойства для классов и атрибутов
const buttonClasses = computed(() => [
    'absolute top-0 z-10 flex h-full w-10 items-center justify-center',
    'bg-gradient-to-r from-white via-white/90 to-transparent dark:from-gray-800 dark:via-gray-800/90 dark:to-transparent',
    'hover:from-gray-50 hover:via-gray-50/90 hover:to-transparent dark:hover:from-gray-700 dark:hover:via-gray-700/90 dark:hover:to-transparent', // Эффект при наведении
    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 dark:focus:ring-indigo-400', // Фокус
    'transition-all duration-200 ease-in-out', // Плавные переходы
    'shadow-sm', // Небольшая тень для выделения
    // Стили для состояний
    'active:scale-95', // Эффект нажатия
    {
        'left-0': props.direction === 'left',
        'right-0': props.direction === 'right',
        // 'rotate-180': props.direction === 'right' // Уберем поворот, сделаем разные иконки
    }
]);

const iconContainerClasses = computed(() => [
    'flex items-center justify-center',
    'size-8 rounded-full', // Размер и форма контейнера иконки
    'bg-white/80 dark:bg-gray-700/80', // Фон контейнера иконки
    'border border-gray-200 dark:border-gray-600', // Граница
    'text-gray-700 dark:text-gray-200', // Цвет иконки
    'shadow-sm', // Тень для иконки
    'transition-all duration-200', // Плавные переходы для иконки
    'group-hover:bg-white dark:group-hover:bg-gray-600', // Фон при наведении на кнопку
    'group-hover:text-gray-900 dark:group-hover:text-white', // Цвет иконки при наведении
    'group-focus:ring-2 group-focus:ring-indigo-500 group-focus:ring-opacity-50 dark:group-focus:ring-indigo-400', // Фокус на иконке
]);

const iconClasses = computed(() => [
    'size-4 transition-transform duration-200', // Размер и плавное изменение
    // 'group-hover:scale-110', // Увеличение иконки при наведении
]);

const ariaLabel = computed(() =>
    props.direction === 'left' ? 'Прокрутить вкладки влево' : 'Прокрутить вкладки вправо'
);
</script>

<template>
    <button
        type="button"
        :class="buttonClasses"
        :aria-label="ariaLabel"
        role="scrollbar"
        class="group"
    >
    <div :class="iconContainerClasses">
        <!-- Используем разные иконки для каждой стороны для лучшей ясности -->
        <svg
            v-if="direction === 'left'"
            :class="iconClasses"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <!-- Chevron Left -->
            <path
                fill-rule="evenodd"
                d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                clip-rule="evenodd"
            />
        </svg>
        <svg
            v-else
            :class="iconClasses"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <!-- Chevron Right -->
            <path
                fill-rule="evenodd"
                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd"
            />
        </svg>
    </div>
    </button>
</template>

<style scoped>
/* Для темной темы градиент будет темнее */
/* .dark .bg-gradient-to-r { ... } */

/* Улучшенное скрытие скроллбара */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
}
</style>
