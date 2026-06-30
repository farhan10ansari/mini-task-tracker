import { FormEvent } from "react";

export type TaskDraft = {
  title: string;
  description: string;
};

type TaskFormProps = {
  draft: TaskDraft;
  onDraftChange: (draft: TaskDraft) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  titleError: string;
  onTitleErrorClear: () => void;
};

export function TaskForm({
  draft,
  onDraftChange,
  onSubmit,
  onTitleErrorClear,
  titleError,
}: TaskFormProps) {
  return (
    <form
      className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-950">Create task</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Add the task title and any useful context.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-slate-800" htmlFor="task-title">
            Title
          </label>
          <input
            id="task-title"
            className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            value={draft.title}
            onChange={(event) => {
              onDraftChange({
                ...draft,
                title: event.target.value,
              });

              if (titleError) {
                onTitleErrorClear();
              }
            }}
            aria-describedby={titleError ? "task-title-error" : undefined}
            aria-invalid={titleError ? "true" : "false"}
            placeholder="Prepare project handoff"
          />
          {titleError ? (
            <p className="mt-2 text-sm font-medium text-red-600" id="task-title-error">
              {titleError}
            </p>
          ) : null}
        </div>

        <div>
          <label className="text-sm font-medium text-slate-800" htmlFor="task-description">
            Description
          </label>
          <textarea
            id="task-description"
            className="mt-2 min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-sm leading-6 text-slate-950 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            value={draft.description}
            onChange={(event) =>
              onDraftChange({
                ...draft,
                description: event.target.value,
              })
            }
            placeholder="Add notes, acceptance details, or next actions."
          />
        </div>

        <button
          className="inline-flex h-11 items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200"
          type="submit"
        >
          Add task
        </button>
      </div>
    </form>
  );
}
