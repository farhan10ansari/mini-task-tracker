# AI Usage

## 1. Which AI tools did you use?

I used OpenAI Codex as an AI coding assistant.

## 2. What did you ask AI to help with?

I asked OpenAI Codex to help generate the implementation plan, design the overall architecture, and assist with each coding step. This included planning the task data model, localStorage persistence approach, UI component structure, validation behavior, filtering, searching, documentation, and verification steps.

## 3. Which parts of the code were AI-assisted?

The implementation plan, task model utilities, client-side task tracker component, localStorage persistence logic, create-task form, completion flow, search/filter UI, README, and this AI usage document were AI-assisted.

## 4. What did you manually change or verify?

I reviewed the generated code for readability, TypeScript correctness, assignment coverage, and maintainability. I verified that the app stayed simple, matched the requirements, and used a practical architecture for a short Next.js assignment.

## 5. How did you test the solution?

I ran lint and production build checks. I also manually reviewed the browser UI and verified the expected flows: creating a task, rejecting an empty title, viewing tasks, marking a task completed, filtering tasks, searching by title, and checking that localStorage persistence works after refresh.

## 6. Did AI produce anything incorrect or risky?

One implementation detail needed adjustment: a first version loaded localStorage with a synchronous state update inside a React effect, which triggered a React lint rule. I changed the persistence approach to use `useSyncExternalStore`, then reran lint and build successfully.

## 7. What would you improve if you had more time?

I would add automated tests, edit/delete actions, priority and due date fields, and a real backend persistence layer. Since my background includes MERN, Python, and Next.js, I would also consider a small API-backed version using MongoDB, PostgreSQL, SQLite, FastAPI, or Next.js route handlers if the project needed multi-device persistence.
