"use client";

import { addTodoAction } from "@/app/actions/todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import { useActionState } from "react";
import { useRef } from "react";

export default function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // Using the new useActionState hook from React 19
  const [, action, isPending] = useActionState(
    async (
      state: { success: boolean; message: string } | null,
      formData: FormData
    ) => {
      const text = formData.get("text") as string;

      if (!text || !text.trim()) {
        return { success: false, message: "Todo text cannot be empty" };
      }

      try {
        await addTodoAction(text);
        formRef.current?.reset();
        toast.success("Todo added successfully");
        return { success: true, message: "Todo added successfully" };
      } catch (error) {
        console.error("Failed to add todo:", error);
        toast.error("Failed to add todo");
        return { success: false, message: "Failed to add todo" };
      }
    },
    null
  );

  return (
    <form ref={formRef} action={action} className="flex gap-2">
      <Input
        type="text"
        name="text"
        placeholder="Add a new todo..."
        disabled={isPending}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending} className="cursor-pointer">
        {isPending ? (
          <span className="flex items-center gap-1">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Adding...
          </span>
        ) : (
          <>
            <PlusCircle className="h-4 w-4" />
            Add Todo
          </>
        )}
      </Button>
    </form>
  );
}
