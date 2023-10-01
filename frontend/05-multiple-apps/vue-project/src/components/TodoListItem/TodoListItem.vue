<script setup lang="ts">
import { Task } from "../../entities";

defineProps<{
  task: Task;
  onToggleDone: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
}>();
</script>

<template>
  <li>
    <input
      :checked="task.isCompleted"
      type="checkbox"
      @change="onToggleDone(task.id)"
    />
    <span :class="{ 'task-completed': task.isCompleted }">{{ task.text }}</span>
    <button type="button" @click="onRemoveTask(task.id)">Remove</button>
  </li>
</template>

<style scoped>
.task-completed {
  text-decoration: line-through;
}
</style>
