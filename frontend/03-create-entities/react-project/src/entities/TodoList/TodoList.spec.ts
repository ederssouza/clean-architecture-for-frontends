import { describe, expect, it } from "vitest";
import TodoList from "./TodoList";

describe("TodoList", () => {
  describe("when the instance is initialized", () => {
    it("should return an empty array", () => {
      const todoList = new TodoList();

      expect(todoList.getTasks()).toEqual([]);
    });
  });

  describe("when adding tasks", () => {
    it("should populate array", () => {
      const todoList = new TodoList();

      const task1 = todoList.add("Study JS");
      const task2 = todoList.add("Study React");

      expect(todoList.getTotal()).toBe(2);
      expect(todoList.getTasks()).toEqual(
        expect.arrayContaining([
          {
            id: task1.id,
            isCompleted: false,
            text: "Study JS",
          },
          {
            id: task2.id,
            isCompleted: false,
            text: "Study React",
          },
        ])
      );
    });
  });

  describe("when to mark the task as completed / incomplete", () => {
    it("should invert the boolean value of the `isCompleted` property", () => {
      const todoList = new TodoList();

      const task1 = todoList.add("Study JS");
      const task2 = todoList.add("Study React");

      todoList.toggleDone(task2.id);

      expect(todoList.getTasks()).toEqual(
        expect.arrayContaining([
          {
            id: task1.id,
            isCompleted: false,
            text: "Study JS",
          },
          {
            id: task2.id,
            isCompleted: true,
            text: "Study React",
          },
        ])
      );

      todoList.toggleDone(task2.id);

      expect(todoList.getTasks()).toEqual(
        expect.arrayContaining([
          {
            id: task1.id,
            isCompleted: false,
            text: "Study JS",
          },
          {
            id: task2.id,
            isCompleted: false,
            text: "Study React",
          },
        ])
      );
    });
  });

  describe("when to remove task", () => {
    it("should remove the task from the array", () => {
      const todoList = new TodoList();

      const task1 = todoList.add("Study JS");
      const task2 = todoList.add("Study React");

      todoList.remove(task1.id);

      expect(todoList.getTotal()).toBe(1);
      expect(todoList.getTasks()).toEqual(
        expect.arrayContaining([
          {
            id: task2.id,
            isCompleted: false,
            text: "Study React",
          },
        ])
      );
    });
  });
});
