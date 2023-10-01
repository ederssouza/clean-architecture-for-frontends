<script setup lang="ts">
import { computed, inject, onMounted, ref } from "vue";
import { TodoInput } from "../TodoInput";
import { TodoListItem } from "../TodoListItem";
import { TodoList } from "../../entities";
import { TodosGateway } from "../../gateways";

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
      const todosGateway = inject<TodosGateway>("todosGateway");
      const tasks = await todosGateway?.getTodos();

      tasks?.forEach((task) => todoList.value.add(task.text));
    } catch (error) {
      alert("An error has occurred");
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
