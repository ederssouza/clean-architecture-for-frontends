import { useEffect, useMemo, useState } from "react";
import { TaskProps, TodoListItem } from "../TodoListItem";
import { TodoInput } from "../TodoInput";
import { TodoList as TodoListClass } from "../../entities";
import { TodosGateway } from "../../gateways";

type Props = {
  todosGateway: TodosGateway;
};

function TodoList(props: Props) {
  const { todosGateway } = props;

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const todoList = useMemo(() => {
    return new TodoListClass();
  }, []);

  const totalTasks = todoList.getTotal();
  const hasValidTasks = totalTasks > 0;

  function handleSubmit(task: string) {
    const newTask = todoList.add(task);
    setTasks((prevState) => [...prevState, newTask]);
  }

  function handleToggleDone(taskId: string) {
    const updatedTasks = todoList.toggleDone(taskId);
    setTasks(updatedTasks);
  }

  function handleRemoveTask(taskId: string) {
    const updatedTasks = todoList.remove(taskId);
    setTasks(updatedTasks);
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await todosGateway.getTodos();
        const tasks = res.map((task) => todoList.add(task.text));

        setTasks(tasks);
      } catch (error) {
        alert("An error has occurred");
      }
    }

    fetchTodos();
  }, [todoList, todosGateway]);

  return (
    <div>
      <h1>React - TODO List</h1>

      <p>
        Total items: <span data-testid="total-tasks">{totalTasks}</span>
      </p>

      <TodoInput onSubmit={handleSubmit} />

      {hasValidTasks && (
        <ul>
          {tasks.map((task) => (
            <TodoListItem
              key={task.id}
              task={task}
              onToggleDone={handleToggleDone}
              onRemoveTask={handleRemoveTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
