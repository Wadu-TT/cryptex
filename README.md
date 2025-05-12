# Cryptex

Cryptex is a Node.js-based web application designed to provide a gamified experience for solving puzzles or challenges. The application is built using Express.js and MongoDB, with a focus on security, performance, and user authentication.

## Features

- **User Authentication**: Secure login and signup functionality using encrypted passwords and JSON Web Tokens (JWT).
- **Dynamic Levels**: Users can progress through levels, with each level containing a unique question and associated media.
- **Leaderboard**: A real-time leaderboard showcasing users' progress and ranks.
- **Rate Limiting**: Protects the application from abuse by limiting the number of requests per user.
- **Time-Based Access**: Control over when the application is accessible using time-based middleware.
- **Secure Communication**: Uses Helmet for setting secure HTTP headers and compression for faster responses.

## Folder Structure

### `/controllers`
Contains the main business logic for the application:
- `auth.js`: Handles user authentication, including login and signup.
- `level.js`: Manages level-related functionalities, such as fetching the current level and validating answers.

### `/middlewares`
Custom middleware functions for additional functionality:
- `check-time.js`: Ensures the application is accessed within a predefined timeframe.
- `is-auth.js`: Authenticates requests using JWT.
- `rate-limiter.js`: Limits the number of requests from a single user or IP.

### `/models`
Defines the MongoDB schemas for the application:
- `user.js`: Schema for user data, including levels and authentication details.
- `level.js`: Schema for levels, including question, media, and answer.

### `/routes`
Routes for handling API requests:
- `auth.js`: Handles authentication-related routes.
- `level.js`: Manages level-related routes for fetching and submitting answers.

### Other Files
- `app.js`: The entry point of the application. Sets up middleware, routes, and database connection.
- `.env`: Used for configuring environment variables like MongoDB URI and JWT tokens.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Wadu-TT/cryptex.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cryptex
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and configure the following variables:
   ```
   MONGODB_URI=<Your MongoDB URI>
   JWT_TOKEN=<Your JWT Secret>
   PORT=<Your Port>
   ```

### Running the Application
Start the server:
```bash
node app.js
```

### API Endpoints

#### Authentication
- `POST /signup`: Create a new user.
- `POST /login`: Authenticate an existing user.

#### Levels
- `GET /level`: Get the current level for the user.
- `POST /level`: Submit an answer for the current level.

#### Leaderboard
- `GET /leaderboard`: Fetch the leaderboard data.

## Contributing
Contributions are welcome! Please follow the steps below:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
[Specify the license under which this project is distributed, e.g., MIT License]

## Contact
For questions or feedback, feel free to open an issue or contact [Your Name/Email].
