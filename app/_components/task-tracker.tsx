"use client";

import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import { TaskControls, TaskFilterOption } from "./task-controls";
import { TaskDraft, TaskForm } from "./task-form";
import { TaskList } from "./task-list";
import { TaskSummary } from "./task-summary";
import { completeTask, createTask, TaskFilter } from "@/lib/tasks";
import {
  getServerTasksSnapshot,
  getTasksSnapshot,
  subscribeToTasks,
  updateStoredTasks,
} from "@/lib/task-storage";

const initialDraft: TaskDraft = {
  title: "",
  description: "",
};

export function TaskTracker() {
  const tasks = useSyncExternalStore(
    subscribeToTasks,
    getTasksSnapshot,
    getServerTasksSnapshot,
  );
  const [draft, setDraft] = useState<TaskDraft>(initialDraft);
  const [titleError, setTitleError] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleTasks = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesFilter = filter === "all" || task.status === filter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery, tasks]);

  const openTaskCount = tasks.filter((task) => task.status === "open").length;
  const completedTaskCount = tasks.length - openTaskCount;
  const filterOptions: TaskFilterOption[] = [
    { label: "All", value: "all", count: tasks.length },
    { label: "Open", value: "open", count: openTaskCount },
    { label: "Completed", value: "completed", count: completedTaskCount },
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim()) {
      setTitleError("Task title is required.");
      return;
    }

    updateStoredTasks((currentTasks) => [createTask(draft), ...currentTasks]);
    setDraft(initialDraft);
    setTitleError("");
  }

  function handleCompleteTask(taskId: string) {
    updateStoredTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === taskId ? completeTask(task) : task)),
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-teal-700">
              Mini Task Tracker
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Track your tasks clearly.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Create tasks, review open work, and mark completed items without extra setup.
            </p>
          </div>

          <TaskSummary
            completedCount={completedTaskCount}
            openCount={openTaskCount}
            totalCount={tasks.length}
          />
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_1fr]">
          <TaskForm
            draft={draft}
            onDraftChange={setDraft}
            onSubmit={handleSubmit}
            onTitleErrorClear={() => setTitleError("")}
            titleError={titleError}
          />

          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-950">Tasks</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Search by title, filter by status, and complete open work from the list.
              </p>
            </div>

            <TaskControls
              filter={filter}
              filterOptions={filterOptions}
              onFilterChange={setFilter}
              onSearchQueryChange={setSearchQuery}
              searchQuery={searchQuery}
            />

            <TaskList
              hasTasks={tasks.length > 0}
              onCompleteTask={handleCompleteTask}
              tasks={visibleTasks}
            />
          </section>
        </section>
      </div>
    </main>
  );
}
