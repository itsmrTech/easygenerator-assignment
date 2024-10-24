# EasyGenerator Assignment

Tags: assignment, development, external
Status: Done

# Project Description

An authentication module that allows users to sign up and sign in.

# Demo [ [https://easygenerator-assignment.vercel.app](https://easygenerator-assignment.vercel.app/) ]

# What has been handled

## Client Side:

- Redirects from app to login when the user is not signed in.
- Redirects from login/ sign up page when user is signed in.
- Forms validation
- Token Refreshing
- Logout Functionality
- APIs Error Handling
- Functionality Test over mobile and desktop devices
- Type Checks

## Server Side:

- Access Token and Refresh Token Generation
- RefreshToken Expiry Schedule to delete revoked tokens every day for more security.
- Password Hashing is used to ensure data is stored securely.
- Logout Functionality to remove Refresh token
- Interface Check over input and output of services to ensure data consistency.
- DTO for every API ensures requests are well-typed as expected.
- Multilingual option in case later other languages need to be added.

# Project Tech Stack

## Client Side:

- Framework: React
- UI Library: MUI
- Form Validation Handler: Formik  and Yup
- Request Calling: Axios
- Navigation: React Router DOM

## Server Side:

- Framework: Nest
- Database: Mongo
- ORM: Mongoose
- Tokens: JWT
- Password Hashing: Crypto
- Documentation: Swagger

# APIs Document

All the APIs are well documented, including schemas and examples using Swagger. You can find the Swagger document by opening `[BACKEND_URL]/docs`. Remember that username and password are defined in the `.env` file.
To review it online you can visit [here](https://easygenerator-assignment.onrender.com/docs). (If you’ve been asked for authentication: username: `admin`, password: `admin` )

# File Structure

## Client Side:

```jsx
client/
│
├── public/                # Static assets (public files)
│   └── index.html         # Root HTML file
│
├── src/                   # React source files
│   ├── components/        # Reusable React components
│   ├── contexts/          # React contexts (e.g., authentication, themes)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components (e.g., Signup, Signin)
│   ├── services/          # Axios service functions
│   ├── styles/            # CSS files for styling components
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Root React component
│   ├── index.tsx          # React DOM entry point
│   ├── App.css            # Global CSS styles
│   ├── index.css          # Styles for index page
│   └── .env               # Environment variables (local setup)
│
├── .env.example           # Example environment variables
├── .gitignore             # Git ignored files
└── package.json           # Client dependencies and scripts

```

## Server Side:

```jsx
server/
│
├── dist/                  # Compiled TypeScript files (output)
├── src/                   # NestJS source files
│   ├── core/              # Core modules (e.g., config, exceptions)
│   ├── enums/             # Enumerations used throughout the project
│   ├── guards/            # Authorization and authentication guards
│   ├── i18n/              # Internationalization configuration
│   ├── modules/           # Feature modules
│   │   └── user/          # User-related modules
│   │       ├── auth/      # Authentication logic (controllers, services, etc.)
│   │       │   ├── controllers/
│   │       │   ├── dtos/          # Data Transfer Objects (DTOs)
│   │       │   ├── interfaces/    # Interfaces for type safety
│   │       │   └── services/      # Service logic (e.g., authentication)
│   │       │       └── user.auth.module.ts
│   │       └── user/              # User-specific module
│   ├── schemas/           # Mongoose schemas
│   ├── utils/             # Utility functions (e.g., password hashing)
│   ├── app.controller.ts  # Root controller
│   ├── app.module.ts      # Root module
│   └── app.service.ts     # Root service logic
│
├── .env                   # Environment variables (local setup)
├── .env.example           # Example environment variables
├── .gitignore             # Git ignored files
├── package.json           # Server dependencies and scripts
└── tsconfig.json          # TypeScript configuration

```

# How to Run

- First clone the project.After cloning, you can see that repo contains two main directories: **client** and **server**.
- You can directly run both frontend and backend by single command in the root directory:

```bash
npm start
```

- Or you can run them separately by going in each project directory.and running these commands

```bash
# client:
npm run dev
# server:
npm run start:dev
```

- Both projects require a `.env` file in their root directories. There is a `.env.example` file in each that you can use for reference.

---

# User Stories

- User fills in their information and sign up for the system.
    - input:
        - email
        - name
        - password
    - output:
        - success or failure message
        - auth tokens
- User logs in to the system by entering their email and password.
    - input:
        - email
        - password
    - output:
        - success or failure message
        - auth tokens

# Data Types

## User

| KEY NAME | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| ID | ObjectId |  | ✔ | ✔ |  |
| createdAt | Date |  | ✔ |  | Creation Time |
| updatedAt | Date |  | ✔ |  | Last Update Time |
| name | string |  | ✔ |  |  |
| email | string |  | ✔ | ✔ |  |

## User Credentials

| KEY NAME | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| ID | ObjectId |  | ✔ | ✔ |  |
| createdAt | Date |  | ✔ |  | Creation Time |
| updatedAt | Date |  | ✔ |  | Last Update Time |
| user | User ObjectID |  | ✔ | ✔ |  |
| password | string |  | ✔ |  | hashed password |

## User Token

| KEY NAME | VALUE TYPE | DEFAULT VALUE | REQUIRED | UNIQUE | DESCRIPTION |
| --- | --- | --- | --- | --- | --- |
| ID | ObjectId |  | ✔ | ✔ |  |
| createdAt | Date |  | ✔ |  | Creation Time |
| updatedAt | Date |  | ✔ |  | Last Update Time |
| user | User ObjectID |  | ✔ |  |  |
| token | string |  | ✔ |  | JWT Token |
| type | Enum |  | ✔ |  | Currently only `refresh`  |
