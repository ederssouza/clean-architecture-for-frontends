import { useState } from "react";

type Props = {
  onSubmit: (task: string) => void;
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

    onSubmit(task);
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
