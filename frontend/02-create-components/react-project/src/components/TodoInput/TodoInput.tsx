import { useState } from "react";

type Props = {
  onSubmit: (task: string) => void;
};

function TodoInput(props: Props) {
  const { onSubmit } = props;

  const [task, setTask] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const task = event.target.value;

    setTask(task);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const taskValue = task?.trim();

    if (!taskValue.length) {
      return;
    }

    onSubmit(taskValue);
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your task..."
        value={task}
        onChange={handleChange}
      />
    </form>
  );
}

export default TodoInput;
