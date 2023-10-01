import { Task } from "../Task";

/**
 * O React não rastreia mutações diretas em arrays ou objetos.
 * Se você estiver alterando diretamente um array ou objeto e depois tentando redefinir
 * o estado para o mesmo objeto ou array, o React não reconhecerá essa mudança.
 *
 * Para resolver este problema, vamos criar novas referências para o array de tarefas
 * sempre que houver uma alteração.
 *
 * Ex.:
 *  - de `this.tasks.push(newTask)`
 *  - de `this.tasks = [...this.tasks, newTask];`
 */

class TodoList {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  add(task: string) {
    const newTask = new Task(task);

    this.tasks = [...this.tasks, newTask];

    return newTask;
  }

  getTasks() {
    return this.tasks;
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

    return [...this.tasks];
  }

  remove(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);

    return [...this.tasks];
  }
}

export default TodoList;
