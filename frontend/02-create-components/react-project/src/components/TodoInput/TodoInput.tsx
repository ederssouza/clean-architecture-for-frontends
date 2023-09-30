import { useState } from "react";
import { TaskProps } from "../TodoListItem";

type Props = {
  onSubmit: (task: TaskProps) => void;
};

function TodoInput(props: Props) {
  const { onSubmit } = props;

  const [task, setTask] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const task = event.target.value.trim();

    setTask(task);
  }

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

    onSubmit(newTask);
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your task and press Enter"
        value={task}
        onChange={handleChange}
      />
    </form>
  );
}

export default TodoInput;
