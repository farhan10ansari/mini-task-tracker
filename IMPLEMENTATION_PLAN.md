# Mini Task Tracker Implementation Plan

This file is the working checklist for completing the assignment. Keep each item marked as `[ ]` until it is completed and verified, then change it to `[x]`.

## Project Direction

- Stack: Next.js App Router, React, TypeScript, Tailwind CSS.
- Persistence: browser `localStorage` for the 1-2 hour assignment scope.
- Deployment target: Vercel unless we decide otherwise.
- Core goal: a small, polished, deployed task tracker that satisfies every required feature before adding bonus work.

## 0. Baseline And Constraints

- [x] Confirm the app is a Next.js App Router project.
- [x] Read relevant local Next.js 16 docs in `node_modules/next/dist/docs/` before implementation.
- [x] Confirm scripts exist for local development, linting, production build, and start.
- [x] Replace starter app metadata with Mini Task Tracker metadata.
- [x] Keep implementation simple and explain localStorage persistence limitations in the README.

## 1. Data Model

- [x] Define a `TaskStatus` type: `open | completed`.
- [x] Define a `Task` type with required fields:
  - `id`
  - `title`
  - `description`
  - `status`
  - `createdAt`
  - `updatedAt`
- [x] Defer optional fields until after core requirements:
  - `priority: low | medium | high`
  - `dueDate`
- [x] Use stable IDs via `crypto.randomUUID()` with a fallback if needed.
- [x] Store dates as ISO strings and format them for display in the UI.

## 2. State And Persistence

- [x] Create a client-side task tracker component because it needs state, event handlers, and `localStorage`.
- [x] Load tasks from `localStorage` on mount.
- [x] Save tasks to `localStorage` whenever tasks change after initial load.
- [x] Handle invalid or corrupted stored data by falling back to an empty task list.
- [x] Keep derived UI state separate:
  - filter: `all | open | completed`
  - search query string
  - form draft fields
  - validation errors

## 3. Create Task

- [x] Build a task creation form with:
  - title input
  - description textarea
- [x] Validate title:
  - required
  - trimmed value must not be empty
- [x] Show a clear validation message without losing the entered description.
- [x] On valid submit:
  - create a new open task
  - set `createdAt` and `updatedAt`
  - prepend or append it consistently in the task list
  - clear the form

## 4. View Tasks

- [x] Render a task list from the stored state.
- [x] Each task card or row must show:
  - title
  - description
  - status
  - created date
- [x] Add a useful empty state when there are no tasks.
- [x] Add a separate empty state when search/filter hides all tasks.
- [x] Ensure the layout works on mobile and desktop.

## 5. Complete Task

- [x] Add a control to mark an open task as completed.
- [x] Update `status` to `completed`.
- [x] Update `updatedAt` when completion happens.
- [x] Disable or hide the complete action for already completed tasks.
- [x] Visually distinguish completed tasks using at least:
  - completed status badge
  - muted text or completed styling
  - clear button state

## 6. Filter Tasks

- [x] Add filter controls for:
  - All
  - Open
  - Completed
- [x] Make the active filter visually obvious.
- [x] Ensure filtering combines correctly with search.
- [x] Add task counts if time allows.

## 7. Search Tasks

- [x] Add a search input for task title.
- [x] Search should be case-insensitive.
- [x] Search should trim unnecessary whitespace.
- [x] Search should combine correctly with the selected filter.
- [x] Add a clear-search affordance if time allows.

## 8. UI And Product Polish

- [x] Replace the starter Next.js landing UI with the actual tracker as the first screen.
- [x] Use a focused app layout, not a marketing page.
- [x] Provide clear section structure:
  - create task form
  - search/filter controls
  - task list
  - summary/counts if time allows
- [x] Use accessible labels for form controls.
- [x] Use keyboard-friendly native controls.
- [x] Make completed state and empty states easy for a reviewer to understand quickly.
- [x] Avoid over-engineering, unnecessary dependencies, or unrelated features before core completion.

## 9. Optional Bonus Features

Only start this section after all required features, README, AI_USAGE, lint, and build are complete.

- [ ] Delete task.
- [ ] Edit task.
- [ ] Priority field.
- [ ] Due date field.
- [x] Task count summary.
- [ ] Basic tests.

## 10. Documentation

- [x] Rewrite `README.md` to include:
  - project overview
  - tech stack used
  - how to run locally
  - how to run tests, if any
  - known limitations
  - what would improve with more time
  - approximate time spent
  - deployed app URL placeholder or final URL
- [x] Create `AI_USAGE.md` answering:
  - which AI tools were used
  - what AI was asked to help with
  - which parts of the code were AI-assisted
  - what was manually changed or verified
  - how the solution was tested
  - whether AI produced anything incorrect or risky
  - what would improve with more time

## 11. Verification

- [x] Run lint: `pnpm lint`.
- [x] Run production build: `pnpm build`.
- [x] Manually verify in the browser:
  - create task works
  - validation rejects empty title
  - view task list works
  - complete task works
  - completed task is visually clear
  - All/Open/Completed filters work
  - title search works
  - search and filter work together
  - data persists after refresh
  - UI works on a narrow/mobile viewport
- [x] Check git diff for accidental unrelated changes.

## 12. Deployment And Submission

- [ ] Push final code to GitHub.
- [ ] Deploy the app.
- [ ] Confirm deployed URL is accessible without local setup.
- [ ] Add deployed app URL to `README.md`.
- [ ] Confirm repository URL is ready to share.
- [ ] Final submission checklist:
  - [ ] App is deployed and accessible.
  - [ ] GitHub repo is shared.
  - [ ] `README.md` is included.
  - [ ] `AI_USAGE.md` is included.
  - [ ] Create task works.
  - [ ] View task list works.
  - [ ] Complete task works.
  - [ ] Filter works.
  - [ ] Search works.
  - [ ] Validation works.
