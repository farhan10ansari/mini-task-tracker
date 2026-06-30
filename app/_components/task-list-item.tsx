import { formatTaskDate, Task } from "@/lib/tasks";

type TaskListItemProps = {
  onComplete: (taskId: string) => void;
  task: Task;
};

export function TaskListItem({ onComplete, task }: TaskListItemProps) {
  const isCompleted = task.status === "completed";

  return (
    <li
      className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between ${
        isCompleted ? "bg-slate-50" : "bg-white"
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={`text-base font-semibold ${
              isCompleted ? "text-slate-500 line-through decoration-slate-400" : "text-slate-950"
            }`}
          >
            {task.title}
          </h3>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
              isCompleted
                ? "bg-emerald-100 text-emerald-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {task.status}
          </span>
        </div>

        <p
          className={`mt-2 text-sm leading-6 ${
            isCompleted ? "text-slate-500" : "text-slate-600"
          }`}
        >
          {task.description || "No description provided."}
        </p>

        <p className="mt-3 text-xs font-medium text-slate-500">
          Created {formatTaskDate(task.createdAt)}
        </p>
      </div>

      <button
        className={`h-10 shrink-0 rounded-md px-4 text-sm font-semibold transition focus:outline-none focus:ring-4 ${
          isCompleted
            ? "cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-500 focus:ring-slate-100"
            : "border border-teal-700 bg-white text-teal-800 hover:bg-teal-50 focus:ring-teal-100"
        }`}
        type="button"
        onClick={() => onComplete(task.id)}
        disabled={isCompleted}
      >
        {isCompleted ? "Completed" : "Mark complete"}
      </button>
    </li>
  );
}
