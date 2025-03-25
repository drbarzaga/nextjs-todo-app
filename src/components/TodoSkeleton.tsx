import React from "react";
import { Skeleton } from "./ui/skeleton";

const TodoSkeleton = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Todos</h2>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-lg bg-card"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoSkeleton;
