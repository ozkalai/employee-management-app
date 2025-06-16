<p align="center">
  <img width="700" src="/assets/logos/preview.png"></img>
</p>

# Employee Management App

A modern, responsive employee management system built with Lit, Zustand, Vaadin Router, and Open WC.
Supports table and list views, add/edit/delete, pagination, localization, and more.

## Features

- **Employee List**: View employees in a table or list format, with pagination.
- **Add/Edit Employee**: Add new employees or edit existing ones with validation and unique email enforcement.
- **Delete Employee**: Delete employees with confirmation modal.
- **Pagination**: Paginated list and table views, with current page reflected in the URL.
- **Localization**: Supports English and Turkish, with instant language switching.
- **Routing**: Uses Vaadin Router for SPA navigation (`/`, `/add`, `/edit/:userId`).
- **State Management**: Uses Zustand for employee and pagination state, persisted in localStorage.
- **Responsive Design**: Works well on desktop and mobile.

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

## Scripts

- `start` – Run the app in development mode
- `build` – Build the app for production
- `test` – Run the test suite with Web Test Runner
- `lint` – Run the linter
- `format` – Auto-format code

## Usage

- Use the **view toggle** to switch between table and list views.
- Use the **pagination** at the bottom to navigate pages. The current page is reflected in the URL.
- Click **+Add New** to add an employee. After adding, you'll return to the same page you were on.
- Click the **edit** icon to edit an employee. After editing, you'll return to the same page.
- Click the **delete** icon to remove an employee (with confirmation).

## Testing

Run all tests:

```bash
npm test
```

Tests cover:
- Table and list views
- Add/edit/delete flows
- Pagination and routing
- Localization
```