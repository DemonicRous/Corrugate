<!-- resources/js/Components/TabGroup.vue -->
<script setup>
import { ref, provide, watch, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    storageKey: {
        type: String,
        default: 'active-tab'
    },
    defaultTab: {
        type: [String, Number],
        default: 0
    },
    // Новый prop для включения/выключения горячих клавиш
    enableHotkeys: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['change']);

const getInitialActiveTab = () => {
    const saved = localStorage.getItem(props.storageKey);
    if (saved !== null) {
        if (!isNaN(Number(saved))) {
            return Number(saved);
        }
        return saved;
    }
    return props.defaultTab;
};

const activeTab = ref(getInitialActiveTab());
const tabs = ref([]);

const registerTab = (tabInfo) => {
    const existingIndex = tabs.value.findIndex(t => t.index === tabInfo.index);
    if (existingIndex !== -1) {
        tabs.value[existingIndex] = { ...tabInfo, isActive: tabInfo.index === activeTab.value };
    } else {
        tabs.value.push({ ...tabInfo, isActive: tabInfo.index === activeTab.value });
    }
};

const computedTabs = computed(() => {
    return tabs.value.map(tab => ({
        ...tab,
        isActive: tab.index === activeTab.value
    }));
});

// Функция для перехода к следующей/предыдущей вкладке
const navigateTabs = (direction) => {
    if (tabs.value.length === 0) return;

    const sortedTabs = [...tabs.value].sort((a, b) => {
        // Сортируем по index, предполагая, что index - это число
        // Если index строка, нужно другое правило сортировки
        const aIndex = typeof a.index === 'number' ? a.index : parseInt(a.index, 10);
        const bIndex = typeof b.index === 'number' ? b.index : parseInt(b.index, 10);
        return aIndex - bIndex;
    });

    const currentIndex = sortedTabs.findIndex(tab => tab.index === activeTab.value);

    if (currentIndex === -1) {
        // Если текущая вкладка не найдена, активируем первую
        setActiveTab(sortedTabs[0].index);
        return;
    }

    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % sortedTabs.length;
    } else { // 'prev'
        newIndex = (currentIndex - 1 + sortedTabs.length) % sortedTabs.length;
    }

    setActiveTab(sortedTabs[newIndex].index);
};

const setActiveTab = (index) => {
    activeTab.value = index;
};

// Обработчик горячих клавиш
const handleKeyDown = (event) => {
    // Проверяем, активен ли элемент ввода (input, textarea, etc.)
    const activeElement = document.activeElement;
    const isInputActive = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true'
    );

    // Если активен элемент ввода, не обрабатываем горячие клавиши
    if (isInputActive) return;

    // Проверяем комбинации Ctrl/Cmd + Arrow
    if ((event.ctrlKey || event.metaKey) && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault(); // Предотвращаем стандартное поведение (например, перемещение курсора в input)
        if (event.key === 'ArrowLeft') {
            navigateTabs('prev');
        } else if (event.key === 'ArrowRight') {
            navigateTabs('next');
        }
    }
};

// Управление слушателем событий
onMounted(() => {
    if (props.enableHotkeys) {
        window.addEventListener('keydown', handleKeyDown);
    }
});

onUnmounted(() => {
    if (props.enableHotkeys) {
        window.removeEventListener('keydown', handleKeyDown);
    }
});

// Если enableHotkeys изменится, добавляем/удаляем слушатель
watch(() => props.enableHotkeys, (newVal) => {
    if (newVal) {
        window.addEventListener('keydown', handleKeyDown);
    } else {
        window.removeEventListener('keydown', handleKeyDown);
    }
});

watch(activeTab, (newVal) => {
    localStorage.setItem(props.storageKey, String(newVal));
    emit('change', newVal);

    tabs.value = tabs.value.map(tab => ({
        ...tab,
        isActive: tab.index === newVal
    }));
});

provide('tabGroupState', {
    activeTab,
    setActiveTab,
    registerTab
});

const tabListRef = ref(null);
provide('tabListRef', tabListRef);
</script>

<template>
    <div class="tab-group">
        <slot
            :active-tab="activeTab"
            :set-active-tab="setActiveTab"
            :tabs="computedTabs"
            :tab-list-ref="tabListRef"
            :navigate-tabs="navigateTabs"
        />
    </div>
</template>
