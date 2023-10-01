import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/vue";
import TodoList from "./TodoList.vue";

describe("<TodoList />", () => {
  describe("and the user adds an invalid task", () => {
    it("should not create a new task", async () => {
      await waitFor(() => render(TodoList));

      const newTask = "     ";
      const totalTasks = screen.getByTestId("total-tasks");
      const input = screen.getByPlaceholderText(
        "Type your task and press Enter"
      );

      fireEvent.update(input, newTask);
      fireEvent.submit(input);

      expect(screen.queryByText(newTask)).not.toBeInTheDocument();
      expect(totalTasks).toHaveTextContent("0");
    });
  });

  describe("and the user adds a valid task", () => {
    it("should create a new task", async () => {
      await waitFor(() => render(TodoList));

      const newTask = "Study JS";
      const totalTasks = screen.getByTestId("total-tasks");
      const input = screen.getByPlaceholderText(
        "Type your task and press Enter"
      );

      fireEvent.update(input, newTask);
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
      await waitFor(() => render(TodoList));

      const newTask = "Study JS";
      const otherTask = "Study React";
      const totalTasks = screen.getByTestId("total-tasks");
      const input = screen.getByPlaceholderText(
        "Type your task and press Enter"
      );

      fireEvent.update(input, newTask);
      fireEvent.submit(input);

      fireEvent.update(input, otherTask);
      fireEvent.submit(input);

      await waitFor(() => {
        expect(screen.getByText(newTask)).toBeInTheDocument();
        expect(screen.getByText(otherTask)).toBeInTheDocument();
      });

      const firstTaskCheckbox = screen.getAllByRole("checkbox")[0];
      const taskElement = screen.getByText(newTask);

      expect(totalTasks).toHaveTextContent("2");
      expect(taskElement).toHaveAttribute("class", "");

      fireEvent.click(firstTaskCheckbox);

      await waitFor(() => {
        expect(taskElement).toHaveAttribute("class", "task-completed");
      });
    });

    describe("when the user clicks on delete task button", () => {
      it("should remove task", async () => {
        await waitFor(() => render(TodoList));

        const newTask = "Study JS";
        const totalTasks = screen.getByTestId("total-tasks");
        const input = screen.getByPlaceholderText(
          "Type your task and press Enter"
        );

        fireEvent.update(input, newTask);
        fireEvent.submit(input);

        await waitFor(() => {
          expect(screen.getByText(newTask)).toBeInTheDocument();
        });

        const taskElement = screen.queryByText(newTask);
        const deleteButton = screen.getByRole("button", { name: "Remove" });

        expect(taskElement).toBeInTheDocument();
        expect(totalTasks).toHaveTextContent("1");

        fireEvent.click(deleteButton);

        await waitFor(() => {
          expect(taskElement).not.toBeInTheDocument();
          expect(totalTasks).toHaveTextContent("0");
        });
      });
    });
  });
});