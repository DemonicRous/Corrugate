<!-- resources/js/Components/TabPanel.vue -->
<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
    index: {
        type: [String, Number],
        required: true
    }
});

const tabGroupState = inject('tabGroupState');

if (!tabGroupState) {
    console.error('TabPanel must be used within a TabGroup');
}

const isVisible = computed(() => tabGroupState && tabGroupState.activeTab.value === props.index);
</script>

<template>
    <div v-if="tabGroupState && isVisible" role="tabpanel" :aria-hidden="!isVisible">
        <slot />
    </div>
</template>
