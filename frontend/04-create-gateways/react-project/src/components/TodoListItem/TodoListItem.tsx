export type TaskProps = {
  id: string;
  text: string;
  isCompleted: boolean;
};

type Props = {
  task: TaskProps;
  onToggleDone: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
};

function TodoListItem(props: Props) {
  const { task, onToggleDone, onRemoveTask } = props;

  return (
    <li>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleDone(task.id)}
      />

      <span
        style={{
          textDecoration: task.isCompleted ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>

      <button type="button" onClick={() => onRemoveTask(task.id)}>
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
