# Very Simple Task List App

## Important Note

This app is currently in development and is intended for educational purposes. It is not production-ready and lacks proper validations and may contain bugs. Use it with caution and feel free to contribute to its improvement.


## Main Features

1. **User Authentication:**
   - Users can sign up or log in.
   - Authentication is required to access task-related functionalities.

2. **Task Management:**
   - Create, update, and delete tasks.
   - Users can only interact with their own tasks.

## Technologies Used

### Backend (Server)

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web application framework for Node.js.
- **Apollo GraphQL:** Implementation of GraphQL for querying and manipulating data.
- **Chai:** Assertion library for testing.
- **Sinon:** Test spies, stubs, and mocks for JavaScript.
- **Mocha:** JavaScript test framework.
- **MySQL:** Relational database for storing task data.
- **Sequelize:** Promise-based Node.js ORM for MySQL.
- **JsonWebToken:** Used for user authentication and authorization.

### Frontend (Client)

- **React:** JavaScript library for building user interfaces.
- **Apollo Client:** State management library for managing data with GraphQL.

## Setup

### Backend (Server)

1. **Database Setup:**
   - Run the following commands in MySQL to create a user, a database, and grant privileges:

     ```sql
     CREATE USER 'tommy'@'localhost' IDENTIFIED BY 'TommyBoy@12345';
     CREATE DATABASE tasklist;
     GRANT ALL PRIVILEGES ON tasklist.* TO 'tommy'@'localhost';
     FLUSH PRIVILEGES;
     ```

     Note: The app will automatically create tables when the server is run.

2. **Environment Variables:**
   - Create a `.env` file in the root directory of the server.
   - Add the following variables to the `.env` file:

     ```env
     PORT=7000

     DB_DIALECT=mysql
     DB_HOST=localhost
     DB_NAME=tasklist
     DB_USER=tommy
     DB_PASSWORD=TommyBoy@12345
     DB_TIMEZONE=+08:00

     AUTH_SECRET_KEY=edf5bf46b433911a74fe20ff8f2aefba3d89a6f7ef3c1f71b614640ed03327416181d5e09f608651be621d2ffde2f9892c490497b87a507b05968955447bc7b5
     ```

     Note: Feel free to change the values as needed.

3. **Run the Server:**
   - Execute the following commands:

     ```bash
     npm install
     npm run dev
     ```

     or

     ```bash
     npm install
     npm start
     ```

4. **Run Unit Tests:**
   - Execute the following command:

     ```bash
     npm test
     ```

### Frontend (Client)

1. **Setup:**
   - Navigate to the frontend directory.
   - Execute the following commands:

     ```bash
     npm install
     ```

2. **Run the Frontend:**
   - Execute the following commands:

     ```bash
     npm run dev
     ```

     or

     ```bash
     npm start
     ```