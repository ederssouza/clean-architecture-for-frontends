import { TaskProps } from "../components/TodoListItem";
import TodosGateway from "./TodosGateway";
import HttpClient from "../http/HttpClient";

class TodosGatewayHttp implements TodosGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getTodos() {
    const res = await this.httpClient.get<TaskProps[]>(
      "http://localhost:3000/todos"
    );

    return res;
  }
}

export default TodosGatewayHttp;
