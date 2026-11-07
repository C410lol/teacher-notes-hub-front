# Teacher Notes Hub — Frontend

The frontend application for **Teacher Notes Hub**, a system designed to help organize school records. The interface was built with Angular and consumes the project's API to provide academic management features for teachers and administrative users.

The system brings together features for managing school notebooks, students, lessons, attendance, grades, assignments, and student performance information. The interface also includes dedicated pages for viewing and managing institutions, teachers, and users.

## ✨ Interface features

- Authentication and navigation across the system.
- Viewing and managing school notebooks.
- Organizing students and class information.
- Recording and viewing lessons and attendance.
- Managing grades and assignments.
- Viewing student performance.
- Administrative pages and reusable components for forms, dialogs, lists, and confirmations.
- Dedicated layouts and styles for different screen sizes.

> This repository contains only the frontend application. Business logic and data persistence are provided by the [Teacher Notes Hub API](https://github.com/C410lol/teacher-notes-hub-api).

## 🧰 Technologies

- **Angular 16**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Angular Forms**
- **HTML and CSS**
- **@ng-select/ng-select**

## 🗂️ Project structure

The application follows the standard structure of an Angular project, organized mainly into:

- `src/app/pages`: pages and navigation flows, such as login, home, notebooks, students, teachers, lessons, and administrative areas.
- `src/app/components`: reusable components, dialogs, list elements, and interface components.
- `src/app/services`: services responsible for HTTP communication with the API.
- `src/app/types`: types and interfaces used to represent data received and sent by the application.
- `src/environments`: environment settings, including the URLs used to communicate with the API.

## ▶️ How to run locally

### Prerequisites

- Node.js and npm.
- The [Teacher Notes Hub API](https://github.com/C410lol/teacher-notes-hub-api) configured and running.
- Access to an API instance at the address defined in the environment files.

### Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/C410lol/teacher-notes-hub-front.git
cd teacher-notes-hub-front
npm install
```

### Development environment

```bash
npm start
```

The Angular development server will usually be available at `http://localhost:4200/`.

Before using the application, check the files in `src/environments/` and update the URLs to point to the correct API instance.

### Production build

```bash
npm run build
```

The compiled files will be generated in the output directory configured by Angular CLI.

### Tests

```bash
npm test
```

## 🔗 Related project

- [Teacher Notes Hub — API](https://github.com/C410lol/teacher-notes-hub-api)

---

Project developed as part of a software development initiative focused on organizing school information and routines.
