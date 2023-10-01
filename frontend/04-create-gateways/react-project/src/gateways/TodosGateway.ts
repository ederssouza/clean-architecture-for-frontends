import { TaskProps } from "../components";

interface TodosGateway {
  getTodos: () => Promise<TaskProps[]>;
}

export default TodosGateway;
