import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TaskProps = {
  id: string;
  text: string;
  isCompleted?: boolean;
};

function TodoList() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const totalTasks = tasks.length;
  const hasValidTasks = tasks.length > 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const taskValue = task?.trim();

    if (!taskValue.length) {
      return;
    }

    const newTask = {
      id: uuidv4(),
      text: taskValue,
      isCompleted: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setTask("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const task = event.target.value;

    setTask(task);
  }

  function handleToggleDoneTask(taskId: string) {
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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your task..."
          value={task}
          onChange={handleChange}
        />
      </form>

      {hasValidTasks && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleDoneTask(task.id)}
              />

              <span
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>

              <button type="button" onClick={() => handleRemoveTask(task.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
