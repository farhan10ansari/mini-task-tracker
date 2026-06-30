# Mini Task Tracker

A small task tracker application built for the assignment. Users can create tasks, view the list, mark open tasks as completed, filter by status, and search by task title.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Browser `localStorage` for persistence

## Features

- Create tasks with title and description.
- Validate that title is not empty.
- View task title, description, status, and created date.
- Mark open tasks as completed.
- Filter tasks by All, Open, and Completed.
- Search tasks by title.
- Keep tasks saved in the same browser with `localStorage`.
- Responsive layout for desktop and mobile screens.

## How To Run Locally

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How To Run Checks

Run lint:

```bash
pnpm lint
```

Run a production build:

```bash
pnpm build
```

There is no automated test suite in this version. I verified the main flows manually and with lint/build checks.

## Known Limitations

- Tasks are stored in browser `localStorage`, so they are only available on the same browser and device.
- There is no authentication or multi-user support.
- Clearing browser site data removes saved tasks.
- There is no backend database, so this is not intended as a production persistence model.

## What I Would Improve With More Time

- Add edit and delete actions.
- Add due dates and priority.
- Add a small automated test suite for task creation, validation, filtering, searching, and completion.
- Add server-side persistence with SQLite, PostgreSQL, MongoDB, Supabase, or Firebase.

## Approximate Time Spent

About 2 hours.

## Deployment

Deployed app URL: To be added after deployment.

GitHub repository URL: https://github.com/farhan10ansari/mini-task-tracker
