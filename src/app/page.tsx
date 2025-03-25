import AddTodoForm from "@/components/AddTodoForm";
import TodoList from "@/components/TodoList";
import TodoSkeleton from "@/components/TodoSkeleton";
import { Suspense } from "react";
import { getTodosAction } from "./actions/todo";
import { SquareCheckIcon } from "lucide-react";

async function TodosContainer() {
  const todos = await getTodosAction();

  return <TodoList todos={todos} />;
}

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <SquareCheckIcon className="h-16 w-16 text-indigo-500" />
        <h1 className="text-4xl font-bold">Simple Todo App</h1>
        <div className="space-y-8 mt-10 w-[350px]">
          <AddTodoForm />
          <Suspense fallback={<TodoSkeleton />}>
            <TodosContainer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
