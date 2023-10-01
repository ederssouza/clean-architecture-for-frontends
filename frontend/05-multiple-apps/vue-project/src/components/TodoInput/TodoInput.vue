<script setup lang="ts">
import { ref } from "vue";

type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const { onSubmit } = defineProps<{
  onSubmit: (task: Task) => void;
}>();

const task = ref<string>("");

function handleSubmit() {
  const taskValue = task.value?.trim();

  if (!taskValue.length) {
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskValue,
    isCompleted: false,
  };

  onSubmit(newTask);
  task.value = "";
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="task"
      type="text"
      placeholder="Type your task and press Enter"
    />
  </form>
</template>
