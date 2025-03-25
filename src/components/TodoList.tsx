"use client";

import { deleteTodoAction, toggleTodoAction } from "@/app/actions/todo";
import { Todo } from "@/lib/types";
import React, { FC, useOptimistic, useTransition } from "react";
import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
};

const TodoList: FC<Props> = ({ todos }) => {
  const [isPending, startTransition] = useTransition();

  // Use optimistic updates for better UX
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, action: { type: "toggle" | "delete"; id: number }) => {
      if (action.type === "delete") {
        return state.filter((todo) => todo.id !== action.id);
      } else if (action.type === "toggle") {
        return state.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      }
      return state;
    }
  );

  // Optimistic handlers
  const handleToggle = async (id: number) => {
    startTransition(() => {
      addOptimisticTodo({ type: "toggle", id });
      toggleTodoAction(id);
    });
  };

  const handleDelete = async (id: number) => {
    startTransition(() => {
      addOptimisticTodo({ type: "delete", id });
      deleteTodoAction(id);
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Todos</h2>
      {optimisticTodos.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">
          No todos yet. Add one above!
        </p>
      ) : (
        <ul className="space-y-3">
          {optimisticTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isPending={isPending}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
