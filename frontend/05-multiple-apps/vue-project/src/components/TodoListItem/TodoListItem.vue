<script setup lang="ts">
type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

defineProps<{
  task: Task;
  onRemoveTask: (taskId: number) => void;
}>();
</script>

<template>
  <li>
    <input v-model="task.isCompleted" type="checkbox" />
    <span :class="{ 'task-completed': task.isCompleted }">{{ task.text }}</span>
    <button type="button" @click="onRemoveTask(task.id)">Remove</button>
  </li>
</template>

<style scoped>
.task-completed {
  text-decoration: line-through;
}
</style>
