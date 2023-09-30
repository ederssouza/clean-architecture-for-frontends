import { useState } from "react";
import { TaskProps, TodoListItem } from "../TodoListItem";
import { TodoInput } from "../TodoInput";

function TodoList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const totalTasks = tasks.length;
  const hasValidTasks = tasks.length > 0;

  function handleSubmit(task: TaskProps) {
    setTasks([...tasks, task]);
  }

  function handleToggleDone(taskId: number) {
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
