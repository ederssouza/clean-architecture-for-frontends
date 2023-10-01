import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";
import { TodosGateway } from "../../gateways";

window.alert = vi.fn();

describe("<TodoList />", () => {
  let todosGateway: TodosGateway;

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("when API returns an error", () => {
    beforeAll(() => {
      todosGateway = {
        async getTodos() {
          throw new Error("An error has occurred");
        },
      };
    });

    it("should show an alert", async () => {
      await waitFor(() => render(<TodoList todosGateway={todosGateway} />));

      const totalTasks = screen.getByTestId("total-tasks");

      await waitFor(() => {
        expect(totalTasks).toHaveTextContent("0");
        expect(window.alert).toBeCalledTimes(1);
      });
    });
  });

  describe("when API returns a successful response", () => {
    beforeAll(() => {
      todosGateway = {
        async getTodos() {
          return [];
        },
      };
    });

    describe("and the user adds an invalid task", () => {
      it("should not create a new task", async () => {
        await waitFor(() => render(<TodoList todosGateway={todosGateway} />));

        const newTask = "     ";
        const totalTasks = screen.getByTestId("total-tasks");
        const input = screen.getByPlaceholderText("Type your task...");

        fireEvent.change(input, { target: { value: newTask } });
        fireEvent.submit(input);

        expect(screen.queryByText(newTask)).not.toBeInTheDocument();
        expect(totalTasks).toHaveTextContent("0");
      });
    });

    describe("and the user adds a valid task", () => {
      it("should create a new task", async () => {
        await waitFor(() => render(<TodoList todosGateway={todosGateway} />));

        const newTask = "Study JS";
        const totalTasks = screen.getByTestId("total-tasks");
        const input = screen.getByPlaceholderText("Type your task...");

        fireEvent.change(input, { target: { value: newTask } });
        fireEvent.submit(input);

        await waitFor(() => {
          expect(screen.getByText(newTask)).toBeInTheDocument();
          expect(input).toHaveValue("");
          expect(totalTasks).toHaveTextContent("1");
        });
      });
    });

    describe("and the user switches task completion", () => {
      it("should alternates task style", async () => {
        await waitFor(() => render(<TodoList todosGateway={todosGateway} />));

        const newTask = "Study JS";
        const otherTask = "Study React";
        const totalTasks = screen.getByTestId("total-tasks");
        const input = screen.getByPlaceholderText("Type your task...");

        fireEvent.change(input, { target: { value: newTask } });
        fireEvent.submit(input);

        fireEvent.change(input, { target: { value: otherTask } });
        fireEvent.submit(input);

        const firstTaskCheckbox = screen.getAllByRole("checkbox")[0];
        const taskElement = screen.getByText(newTask);

        expect(totalTasks).toHaveTextContent("2");
        expect(taskElement).toHaveStyle("text-decoration: none");

        fireEvent.click(firstTaskCheckbox);

        expect(taskElement).toHaveStyle("text-decoration: line-through");
      });

      describe("when the user clicks on delete task button", () => {
        it("should remove task", async () => {
          await waitFor(() => render(<TodoList todosGateway={todosGateway} />));

          const newTask = "Study JS";
          const totalTasks = screen.getByTestId("total-tasks");
          const input = screen.getByPlaceholderText("Type your task...");

          fireEvent.change(input, { target: { value: newTask } });
          fireEvent.submit(input);

          const taskElement = screen.queryByText(newTask);
          const deleteButton = screen.getByRole("button", { name: "Remove" });

          expect(taskElement).toBeInTheDocument();
          expect(totalTasks).toHaveTextContent("1");

          fireEvent.click(deleteButton);

          expect(taskElement).not.toBeInTheDocument();
          expect(totalTasks).toHaveTextContent("0");
        });
      });
    });
  });
});
