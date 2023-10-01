import { Task } from "../Task";

class TodoList {
  tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  add(task: string) {
    const newTask = new Task(task);

    this.tasks.push(newTask);

    return newTask;
  }

  getTotal() {
    return this.tasks.length;
  }

  toggleDone(taskId: string) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    return this.tasks;
  }

  remove(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    return this.tasks;
  }
}

export default TodoList;
