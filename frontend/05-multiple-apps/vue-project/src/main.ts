import { createApp } from "vue";
import App from "./App.vue";
import { TodosGatewayHttp } from "./gateways";
import { AxiosAdapter } from "./http";

const app = createApp(App);
const httpAdapter = new AxiosAdapter();
const todosGateway = new TodosGatewayHttp(httpAdapter);

app.provide("todosGateway", todosGateway);
app.mount("#app");
