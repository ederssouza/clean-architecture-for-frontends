import { Task } from "../../entities";
import HttpClient from "../../http/HttpClient";
import { TodosGateway } from "../TodosGateway";

class TodosGatewayHttp implements TodosGateway {
  constructor(readonly httpClient: HttpClient) {}

  async getTodos() {
    const res = await this.httpClient.get<Task[]>(
      "http://localhost:3000/todos"
    );

    return res;
  }
}

export default TodosGatewayHttp;
