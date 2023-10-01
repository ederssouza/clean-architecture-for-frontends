<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { TodoInput } from "../TodoInput";
import { TodoListItem } from "../TodoListItem";

type Task = {
  id: string;
  text: string;
  isCompleted: boolean;
};

const tasks = ref<Task[]>([]);
const totalTasks = computed(() => tasks.value.length);
const hasValidTasks = computed(() => tasks.value.length > 0);

function handleSubmit(task: string) {
  const newTask = {
    id: uuidv4(),
    text: task,
    isCompleted: false,
  };

  tasks.value = [...tasks.value, newTask];
}

function handleRemoveTask(taskId: string) {
  const updatedTasks = tasks.value.filter((task) => task.id !== taskId);

  tasks.value = updatedTasks;
}

onMounted(() => {
  async function fetchTodos() {
    try {
      const { data } = await axios.get("http://localhost:3000/todos");
      tasks.value = [...tasks.value, ...data];

      /**
       * WARNING: catch was ignored in the test on purpose,
       * don't do this in real applications
       */
      /* c8 ignore next 3 */
    } catch (error) {
      tasks.value = [];
    }
  }

  fetchTodos();
});
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
