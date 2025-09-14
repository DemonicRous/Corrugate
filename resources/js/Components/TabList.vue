<!-- resources/js/Components/TabList.vue -->
<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        default: () => []
    },
    activeTab: {
        type: [String, Number],
        default: 0
    }
});

const emit = defineEmits(['navigate']);

const isMobile = ref(false);
const checkIfMobile = () => {
    isMobile.value = window.innerWidth < 768;
};

// Инициализируем с -1, чтобы отличать "не инициализировано" от "первая группа"
const currentGroupStartIndex = ref(-1);

const sortedTabs = computed(() => {
    return [...props.tabs].sort((a, b) => {
        const aIndex = typeof a.index === 'number' ? a.index : Number(a.index);
        const bIndex = typeof b.index === 'number' ? b.index : Number(b.index);
        return aIndex - bIndex;
    });
});

const visibleTabs = computed(() => {
    if (isMobile.value || currentGroupStartIndex.value === -1) return []; // Не показываем, если не инициализировано
    const startIndex = currentGroupStartIndex.value;
    return sortedTabs.value.slice(startIndex, startIndex + 3);
});

const canGoPrev = computed(() => {
    return !isMobile.value && currentGroupStartIndex.value > 0;
});

const canGoNext = computed(() => {
    return !isMobile.value && currentGroupStartIndex.value < sortedTabs.value.length - 3;
});

const navigateGroup = (direction) => {
    if (isMobile.value) return;

    if (direction === 'prev' && canGoPrev.value) {
        currentGroupStartIndex.value = Math.max(0, currentGroupStartIndex.value - 3);
    } else if (direction === 'next' && canGoNext.value) {
        const maxStartIndex = Math.max(0, sortedTabs.value.length - 3);
        currentGroupStartIndex.value = Math.min(maxStartIndex, currentGroupStartIndex.value + 3);
    }
};

const navigateSingleTab = (direction) => {
    if (isMobile.value || sortedTabs.value.length === 0) return;

    const sortedTabsLocal = sortedTabs.value;
    const currentIndex = sortedTabsLocal.findIndex(tab => tab.index === props.activeTab);

    if (currentIndex === -1) {
        if (sortedTabsLocal.length > 0) {
            const firstTab = sortedTabsLocal[0];
            emit('navigate', firstTab.index);
        }
        return;
    }

    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : sortedTabsLocal.length - 1;
    } else {
        newIndex = currentIndex < sortedTabsLocal.length - 1 ? currentIndex + 1 : 0;
    }

    const newTab = sortedTabsLocal[newIndex];
    if (newTab) {
        emit('navigate', newTab.index);
    }
};

// --- ОСНОВНАЯ ЛОГИКА ИНИЦИАЛИЗАЦИИ ГРУППЫ ---
const initializeGroupForActiveTab = (activeTabValue) => {
    const activeTabToUse = activeTabValue ?? props.activeTab;
    const activeTabIndex = sortedTabs.value.findIndex(t => t.index === activeTabToUse);

    if (activeTabIndex !== -1) {
        // Вычисляем, с какой позиции должна начинаться группа для этой вкладки
        const groupIndex = Math.floor(activeTabIndex / 3) * 3;
        const clampedGroupIndex = Math.max(0, Math.min(groupIndex, sortedTabs.value.length - 3));

        // Устанавливаем начальную группу
        currentGroupStartIndex.value = clampedGroupIndex;
    } else {
        // Если активная вкладка не найдена, показываем первую группу
        currentGroupStartIndex.value = 0;
    }
};
// ------------------------------------------

const mobileNavigate = (direction) => {
    navigateSingleTab(direction);
};

const activeTabLabel = computed(() => {
    const activeTab = props.tabs.find(tab => tab.index === props.activeTab);
    return activeTab ? activeTab.label : 'Tab';
});

const handleKeyDown = (event) => {
    const activeElement = document.activeElement;
    const isInputActive = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true' ||
        activeElement.tagName === 'SELECT'
    );

    if (isInputActive) return;

    if ((event.ctrlKey || event.metaKey) && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        if (event.key === 'ArrowLeft') {
            navigateSingleTab('prev');
        } else if (event.key === 'ArrowRight') {
            navigateSingleTab('next');
        }
    }
    else if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        if (event.key === 'ArrowLeft') {
            navigateGroup('prev');
        } else if (event.key === 'ArrowRight') {
            navigateGroup('next');
        }
    }
};

const updateState = () => {
    checkIfMobile();
    // При изменении размера сбрасываем и повторно инициализируем
    if (!isMobile.value) {
        currentGroupStartIndex.value = -1; // Сброс
        nextTick(() => {
            initializeGroupForActiveTab(); // Повторная инициализация
        });
    }
};

// Следим за изменением активной вкладки и инициализируем/обновляем группу
watch(() => props.activeTab, (newActiveTab) => {
    if (!isMobile.value) {
        // nextTick гарантирует, что DOM обновлен
        nextTick(() => {
            initializeGroupForActiveTab(newActiveTab);
        });
    }
});

// Следим за изменением списка вкладок (например, при первой загрузке)
watch(() => props.tabs, () => {
    if (!isMobile.value && currentGroupStartIndex.value === -1) {
        // Инициализируем только если еще не инициализировано
        nextTick(() => {
            initializeGroupForActiveTab();
        });
    }
}, { immediate: true }); // immediate: true означает запуск при первом создании watcher'а

onMounted(() => {
    checkIfMobile();
    if (!isMobile.value) {
        // Инициализируем группу при монтировании
        // Watcher для props.tabs с { immediate: true } должен позаботиться об этом,
        // но добавим здесь дополнительную проверку на всякий случай
        if (currentGroupStartIndex.value === -1) {
            initializeGroupForActiveTab();
        }
    }
    window.addEventListener('resize', updateState);
    window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateState);
    window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
    <div class="relative w-full">
        <!-- Мобильный заголовок -->
        <div v-if="isMobile" class="flex items-center justify-between py-2">
            <button
                @click="mobileNavigate('prev')"
                type="button"
                class="p-2 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                :aria-label="'Предыдущая вкладка'"
            >
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
            </button>

            <span class="px-2 py-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                {{ activeTabLabel }}
            </span>

            <button
                @click="mobileNavigate('next')"
                type="button"
                class="p-2 rounded text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                :aria-label="'Следующая вкладка'"
            >
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- Десктоп: Группа из 3 вкладок по центру с кнопками прокрутки -->
        <div v-else class="flex items-center justify-between py-2">
            <!-- Кнопка прокрутки влево -->
            <button
                @click="navigateGroup('prev')"
                type="button"
                :disabled="!canGoPrev"
                :class="[
                    'p-2 rounded-md',
                    canGoPrev
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed opacity-70'
                ]"
                :aria-label="canGoPrev ? 'Предыдущие вкладки' : 'Нет предыдущих вкладок'"
            >
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                </svg>
            </button>

            <!-- Контейнер для вкладок по центру -->
            <div class="flex justify-center flex-grow mx-2 w-full max-w-md">
                <div class="grid grid-cols-3 w-full gap-1">
                    <button
                        v-for="tab in visibleTabs"
                        :key="tab.index"
                        @click="$emit('navigate', tab.index)"
                        type="button"
                        :class="[
                            'px-2 py-2 text-sm font-medium rounded-t-lg focus:outline-none transition-colors duration-200 relative',
                            'border border-transparent border-b-0 whitespace-nowrap overflow-hidden text-ellipsis',
                            'flex items-center justify-center',
                            tab.isActive
                                ? 'bg-white text-indigo-600 border-gray-200 dark:bg-gray-800 dark:text-indigo-400 dark:border-gray-700 shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        ]"
                        :aria-selected="tab.isActive"
                        role="tab"
                    >
                        <span v-if="tab.isActive" class="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 dark:bg-indigo-400"></span>
                        <span class="truncate">{{ tab.label }}</span>
                    </button>
                    <div v-for="i in (3 - visibleTabs.length)" :key="`placeholder-${i}`" class="px-2 py-2"></div>
                </div>
            </div>

            <!-- Кнопка прокрутки вправо -->
            <button
                @click="navigateGroup('next')"
                type="button"
                :disabled="!canGoNext"
                :class="[
                    'p-2 rounded-md',
                    canGoNext
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed opacity-70'
                ]"
                :aria-label="canGoNext ? 'Следующие вкладки' : 'Нет следующих вкладок'"
            >
                <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
