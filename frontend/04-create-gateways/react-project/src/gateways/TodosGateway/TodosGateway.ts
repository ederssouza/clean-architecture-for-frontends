import { Task } from "../../entities";

interface TodosGateway {
  getTodos: () => Promise<Task[]>;
}

export default TodosGateway;
