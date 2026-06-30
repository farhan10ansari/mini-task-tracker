export const TASK_STATUSES = ["open", "completed"] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type TaskFilter = "all" | TaskStatus;

export const TASK_STORAGE_KEY = "mini-task-tracker.tasks.v1";

type CreateTaskInput = {
  title: string;
  description: string;
};

export function createTaskId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createTask(input: CreateTaskInput, now = new Date()): Task {
  const timestamp = now.toISOString();

  return {
    id: createTaskId(),
    title: input.title.trim(),
    description: input.description.trim(),
    status: "open",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function completeTask(task: Task, now = new Date()): Task {
  if (task.status === "completed") {
    return task;
  }

  return {
    ...task,
    status: "completed",
    updatedAt: now.toISOString(),
  };
}

export function formatTaskDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === "string" && TASK_STATUSES.includes(value as TaskStatus);
}

export function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") {
    return false;
  }

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    isTaskStatus(task.status) &&
    typeof task.createdAt === "string" &&
    typeof task.updatedAt === "string"
  );
}

export function parseStoredTasks(value: string | null): Task[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(isTask) : [];
  } catch {
    return [];
  }
}
