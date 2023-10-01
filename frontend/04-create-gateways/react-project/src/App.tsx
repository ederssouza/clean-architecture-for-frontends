import { TodoList } from "./components";
import { TodosGatewayHttp } from "./gateways";
// import { AxiosAdapter } from "./http";
import { FetchAdapter } from "./http";

function App() {
  // const httpAdapter = new AxiosAdapter();
  const httpAdapter = new FetchAdapter();
  const todosGateway = new TodosGatewayHttp(httpAdapter);

  return <TodoList todosGateway={todosGateway} />;
}

export default App;
