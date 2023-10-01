import { v4 as uuidv4 } from "uuid";

class Task {
  readonly id: string = uuidv4();
  readonly isCompleted: boolean = false;

  constructor(readonly text: string) {}
}

export default Task;
