<script setup lang="ts">
import { computed, ref } from "vue";
import { TodoInput } from "../TodoInput";
import { TodoListItem } from "../TodoListItem";

type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
};

const tasks = ref<Task[]>([]);
const totalTasks = computed(() => tasks.value.length);
const hasValidTasks = computed(() => tasks.value.length > 0);

function handleSubmit(task: Task) {
  tasks.value = [...tasks.value, task];
}

function handleRemoveTask(taskId: number) {
  const updatedTasks = tasks.value.filter((task) => task.id !== taskId);

  tasks.value = updatedTasks;
}
</script>

<template>
  <div>
    <h1>Vue - TODO List</h1>

    <p>
      Total items: <span data-testid="total-tasks">{{ totalTasks }}</span>
    </p>

    <TodoInput :onSubmit="handleSubmit" />

    <ul v-if="hasValidTasks">
      <TodoListItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :onRemoveTask="handleRemoveTask"
      />
    </ul>
  </div>
</template>
