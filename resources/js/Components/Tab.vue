<!-- resources/js/Components/Tab.vue -->
<script setup>
import { inject, onMounted } from 'vue';

const props = defineProps({
  index: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});

const tabGroupState = inject('tabGroupState');

if (!tabGroupState) {
  console.error('Tab must be used within a TabGroup');
}

// Регистрируем вкладку в группе при монтировании
onMounted(() => {
  if (tabGroupState && tabGroupState.registerTab) {
    // Просто регистрируем, отображение будет управляться TabList
    tabGroupState.registerTab({
      index: props.index,
      label: props.label || `Tab ${props.index}` // fallback
    });
  }
});
</script>

<template>
  <!-- На десктопе содержимое не отображается, только регистрируется -->
  <!-- На мобильном можно использовать слот, если нужно отобразить что-то другое -->
  <div v-if="false">
    <slot />
  </div>
</template>
