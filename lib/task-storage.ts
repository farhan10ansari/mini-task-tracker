import { parseStoredTasks, Task, TASK_STORAGE_KEY } from "@/lib/tasks";

const tasksChangedEvent = "mini-task-tracker:tasks-changed";
const emptyTasks: Task[] = [];

let cachedStoredValue: string | null = null;
let cachedTasks: Task[] = emptyTasks;

export function getTasksSnapshot() {
  if (typeof window === "undefined") {
    return emptyTasks;
  }

  const storedValue = window.localStorage.getItem(TASK_STORAGE_KEY);

  if (storedValue === cachedStoredValue) {
    return cachedTasks;
  }

  cachedStoredValue = storedValue;
  cachedTasks = parseStoredTasks(storedValue);
  return cachedTasks;
}

export function getServerTasksSnapshot() {
  return emptyTasks;
}

export function subscribeToTasks(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(tasksChangedEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(tasksChangedEvent, onStoreChange);
  };
}

export function updateStoredTasks(updater: (currentTasks: Task[]) => Task[]) {
  const nextTasks = updater(getTasksSnapshot());
  const nextStoredValue = JSON.stringify(nextTasks);

  cachedTasks = nextTasks;
  cachedStoredValue = nextStoredValue;
  window.localStorage.setItem(TASK_STORAGE_KEY, nextStoredValue);
  window.dispatchEvent(new Event(tasksChangedEvent));
}
