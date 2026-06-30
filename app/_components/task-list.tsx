import { Task } from "@/lib/tasks";
import { EmptyState } from "./empty-state";
import { TaskListItem } from "./task-list-item";

type TaskListProps = {
  hasTasks: boolean;
  onCompleteTask: (taskId: string) => void;
  tasks: Task[];
};

export function TaskList({ hasTasks, onCompleteTask, tasks }: TaskListProps) {
  if (tasks.length > 0) {
    return (
      <ul className="divide-y divide-slate-200">
        {tasks.map((task) => (
          <TaskListItem key={task.id} onComplete={onCompleteTask} task={task} />
        ))}
      </ul>
    );
  }

  if (hasTasks) {
    return (
      <EmptyState
        title="No matching tasks"
        description="Adjust your search or filter to bring tasks back into view."
      />
    );
  }

  return (
    <EmptyState
      title="No tasks yet"
      description="Create your first task with the form. It will appear here immediately."
    />
  );
}
