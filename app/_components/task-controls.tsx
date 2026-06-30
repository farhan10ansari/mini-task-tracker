import { TaskFilter } from "@/lib/tasks";

export type TaskFilterOption = {
  label: string;
  value: TaskFilter;
  count: number;
};

type TaskControlsProps = {
  filter: TaskFilter;
  filterOptions: TaskFilterOption[];
  onFilterChange: (filter: TaskFilter) => void;
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
};

export function TaskControls({
  filter,
  filterOptions,
  onFilterChange,
  onSearchQueryChange,
  searchQuery,
}: TaskControlsProps) {
  return (
    <div className="grid gap-4 border-b border-slate-200 p-5 xl:grid-cols-[1fr_auto] xl:items-end">
      <div>
        <label className="text-sm font-medium text-slate-800" htmlFor="task-search">
          Search by title
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="task-search"
            className="h-11 min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Search tasks"
            type="search"
          />
          {searchQuery ? (
            <button
              className="h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
              type="button"
              onClick={() => onSearchQueryChange("")}
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <div aria-label="Filter tasks by status" className="flex flex-wrap gap-2">
        {filterOptions.map((option) => {
          const isActive = option.value === filter;

          return (
            <button
              key={option.value}
              className={`h-10 rounded-md border px-3 text-sm font-semibold transition focus:outline-none focus:ring-4 ${
                isActive
                  ? "border-teal-700 bg-teal-700 text-white focus:ring-teal-200"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-100"
              }`}
              type="button"
              onClick={() => onFilterChange(option.value)}
            >
              {option.label}{" "}
              <span className={isActive ? "text-teal-100" : "text-slate-500"}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
