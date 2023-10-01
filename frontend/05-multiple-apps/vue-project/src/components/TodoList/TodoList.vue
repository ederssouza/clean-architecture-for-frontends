<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { TodoInput } from "../TodoInput";
import { TodoListItem } from "../TodoListItem";
import { Task, TodoList } from "../../entities";

const todoList = ref(new TodoList());
const hasValidTasks = computed(() => todoList.value.getTotal() > 0);

function handleSubmit(task: string) {
  todoList.value.add(task);
}

function handleToggleDone(taskId: string) {
  todoList.value.toggleDone(taskId);
}

function handleRemoveTask(taskId: string) {
  todoList.value.remove(taskId);
}

onMounted(() => {
  async function fetchTodos() {
    try {
      const { data: tasks } = await axios.get<Task[]>(
        "http://localhost:3000/todos"
      );

      tasks.forEach((task) => todoList.value.add(task.text));

      /**
       * WARNING: catch was ignored in the test on purpose,
       * don't do this in real applications
       */
      /* c8 ignore next 3 */
    } catch (error) {
      // error...
    }
  }

  fetchTodos();
});
</script>

<template>
  <div>
    <h1>Vue - TODO List</h1>

    <p>
      Total items:
      <span data-testid="total-tasks">{{ todoList.getTotal() }}</span>
    </p>

    <TodoInput :onSubmit="handleSubmit" />

    <ul v-if="hasValidTasks">
      <TodoListItem
        v-for="task in todoList.getTasks()"
        :key="task.id"
        :task="task"
        :onToggleDone="handleToggleDone"
        :onRemoveTask="handleRemoveTask"
      />
    </ul>
  </div>
</template>
