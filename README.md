
# Project Overview
This is an online shoe shopping platform based on Vue 3. Users can register and log in to their accounts, browse products (divided into men's shoes and women's shoes), add items to the shopping cart  and view product detail pages. The platform also includes an admin management system, where the administrator can log in and perform basic operations such as adding, deleting, modifying, and querying products.

## Tech Stack
- **Vue 3**: A progressive JavaScript framework used to build front-end user interfaces.
- **Vite**: A fast build tool that provides efficient hot-reloading and optimized production builds.
- **Element Plus**: A UI component library that provides modern UI components such as dialogs, input fields, buttons, etc.
- **Vue Router**: The official Vue.js routing library to manage page routes of the application.
- **TypeScript**: A superset of JavaScript that provides type safety, enhancing the maintainability of the code.
- **mitt**: A lightweight event bus library for communication between components.
- **localStorage**: Used to store user information, allowing persistence of the login state.

## Installation Steps
1. Clone the project from GitHub
2. Install the dependencies: npm install
3. Run the project: npm run serve


## Project Structure
├── public/                # Public files
├── src/                   # Source code files
│   ├── assets/            # Static resources like images and styles
│   ├── components/        # Reusable Vue components
│   ├── views/             # Vue components representing different pages
│   ├── router/            # Vue Router configuration
│   ├── api/               # Contains API interfaces and request-related code
│   ├── App.vue            # Root Vue component
│   └── main.js            # Application entry file
├── jsconfig.json          # TypeScript configuration
├── vite.config.js         # Vite configuration
├── package.json           # Project metadata and dependencies
├── index.html             # Entry HTML file
└── .gitignore             # Git ignore file configuration


## Features Overview
User registration and login.
User interface includes add-to-cart functionality and the ability to view product detail pages.
Admin login for backend personnel.
Admin can perform CRUD (Create, Read, Update, Delete) operations on products.
>>>>>>> a9f237e (Initial commit)
