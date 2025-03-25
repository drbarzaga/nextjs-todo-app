"use server";

import { db } from "@/db";
import { todosTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// GET TODOS ACTION
export async function getTodosAction() {
  try {
    const todos = await db
      .select()
      .from(todosTable)
      .orderBy(desc(todosTable.createdAt));
    return todos;
  } catch (error) {
    console.error("Failed to get todos:", error);
    throw new Error("Failed to get todos");
  }
}

// ADD TODO ACTION
export async function addTodoAction(title: string) {
  try {
    await db.insert(todosTable).values({
      title,
      completed: false,
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to add todo:", error);
    throw new Error("Failed to add todo");
  }
}

// TOGGLE TODO ACTION
export async function toggleTodoAction(id: number) {
  try {
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id));

    if (!todo.length) {
      throw new Error("Todo not found");
    }
    console.log("TODO", todo);
    // Update with the opposite completed status
    await db
      .update(todosTable)
      .set({ completed: !todo[0].completed })
      .where(eq(todosTable.id, id));

    revalidatePath("/");
  } catch (error) {
    console.error("Failed to toggle todo:", error);
    throw new Error("Failed to toggle todo");
  }
}

// DELETE TODO ACTION
export async function deleteTodoAction(id: number) {
  try {
    await db.delete(todosTable).where(eq(todosTable.id, id));
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete todo:", error);
    throw new Error("Failed to delete todo");
  }
}
