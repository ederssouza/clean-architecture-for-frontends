import { useState } from "react";

type TaskProps = {
  id: number;
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

    if (!task.length) {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const task = event.target.value.trim();

    setTask(task);
  }

  function handleToggleDoneTask(taskId: number) {
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

  function handleRemoveTask(taskId: number) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(updatedTasks);
  }

  return (
    <div>
      <h1>React - TODO List</h1>

      <p>
        Total items: <span data-testid="total-tasks">{totalTasks}</span>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your task and press Enter"
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
