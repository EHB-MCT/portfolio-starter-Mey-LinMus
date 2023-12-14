# Birthday commenter

Here you will find information on the development, endpoints and use of this project.

## Purpose

This project is application written in JavaScript with an Express.js server and a MySQL database.

The Birthday API is designed to help users remember the birthdays of their friends and loved ones. Users can view upcoming birthdays and leave comments for each person to make their day extra special.

## Getting Started

To get started with the project, follow these steps:

1. Copy the `.env.template` file to a new file called `.env`.

2. Run the following command to build and start the project using Docker Compose:
   
docker-compose up --build


## Features

- **User Management:**

  - Retrieve a list of users.
  - Add a new user.
  - Update user information.
  - Delete a user.

- **Comment Management:**
  - Retrieve comments for all users.
  - Retrieve comments for a specific user.
  - Add a new comment for a user.
  - Update a comment.
  - Delete a comment.

# Endpoints

## Users

### 1. GET /users

Retrieve a list of all users.

### 2. POST /user

Add a new user.

#### Request Body Example:

{
"name": "John Doe",
"birthday": "YYYY-MM-DD",
"age": 25
}

### 3. PATCH /user/:id

Update user information by ID (optional).

#### Request Body Example:

{
"name": "Updated Name",
"birthday": "YYYY-MM-DD",
"age": 26
}

### 4. DELETE /user/:id

Delete a user by ID.

## Comments

### 1. GET /users-comments

Retrieve a list of all users with their associated comments.

### 2. GET /user/:id/comments

Retrieve comments for a specific user by ID.

### 3. POST /user/:id/comment

Add a new comment for a user by ID.

#### Request Body Example:

{
"text": "Happy Birthday! 🎉"
}

### 4. PATCH /comment/:id

Update a comment by ID.

#### Request Body Example:

{
"text": "Updated comment text."
}

### 4. DELETE /comment/:id

Delete a comment by ID.

## License

This project is licensed under the [MIT License](LICENSE).
