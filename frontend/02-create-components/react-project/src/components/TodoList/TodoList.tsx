import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TaskProps, TodoListItem } from "../TodoListItem";
import { TodoInput } from "../TodoInput";

function TodoList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const totalTasks = tasks.length;
  const hasValidTasks = tasks.length > 0;

  function handleSubmit(task: string) {
    const newTask = {
      id: uuidv4(),
      text: task,
      isCompleted: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
  }

  function handleToggleDone(taskId: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleRemoveTask(taskId: string) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        const tasks = res.data;

        setTasks(tasks);
      } catch (error) {
        alert("An error has occurred");
      }
    }

    fetchTodos();
  }, []);

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
