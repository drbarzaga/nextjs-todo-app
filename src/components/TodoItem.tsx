import { Todo } from "@/lib/types";
import React, { FC } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  todo: Todo;
  isPending?: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TodoItem: FC<Props> = ({ todo, isPending, onToggle, onDelete }) => {
  return (
    <li className="flex items-center justify-between p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={todo.completed}
          disabled={isPending}
          onCheckedChange={onToggle}
          id={`todo-${todo.id}`}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.title}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        disabled={isPending}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
      </Button>
    </li>
  );
};

export default TodoItem;
