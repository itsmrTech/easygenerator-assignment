# EasyGenerator Assignment

Tags: assignment, development, external
Status: Not started

# Project Description

An authentication module that allows users to sign up and sign in.

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