<script setup lang="ts">
import { ref } from "vue";

const { onSubmit } = defineProps<{
  onSubmit: (task: string) => void;
}>();

const task = ref<string>("");

function handleSubmit() {
  const taskValue = task.value?.trim();

  if (!taskValue.length) {
    return;
  }

  onSubmit(taskValue);
  task.value = "";
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="task" type="text" placeholder="Type your task..." />
  </form>
</template>
