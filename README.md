# Node Authentication App

This is a simple Node.js-based authentication app using JWT (JSON Web Token) for login, signup, and logout functionality. It provides basic authentication features for a web application and is built using Express, Mongoose, bcrypt, and other libraries.

## Features

- **User Signup**: Register new users securely using hashed passwords.
- **User Login**: Authenticate users with JWTs.
- **Protected Routes**: Access protected resources with valid tokens.
- **Logout**: Invalidate JWT and clear cookies for logout.
- **Session Management**: Store and verify user sessions using JWT.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **JWT**: Token-based authentication.
- **Mongoose**: MongoDB ODM for managing user data.
- **bcrypt**: Hashing library for password encryption.
- **EJS**: Templating engine for rendering views.
- **Cookie-Parser**: For handling cookies.
- **Validator**: Input validation.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SunilBista/Node-Auth.git
   cd Node-Auth
   ```

2. Install the required dependencies

   ```bash
     npm install
   ```

3. Set up environment variables

   - Create a `.env` file in the root of your project.
   - Add the following

     ```bash
     MONGODB_URI = your_mongodb_uri
     PORT=3000
     JWT_SECRET = your_jwt_secret

     ```

4. Start the application

   ```bash
   npm start
   ```

5. Access the application at `http://localhost:3000`
