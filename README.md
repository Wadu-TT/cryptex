# Before pushing to production

- ## Remove createLevel route from routes/level.js
- ## Remove postCreateLevel controller from controllers/level.js
- ## Add .env and nodemon.json to .gitignore


# Routes:

- **Request Body and Response Body are examples**
- [Errors](#errors)

- /leaderboard
    - Method: `GET`

    - Response Body: 

        ```json
        {
            "users": [
                {
                    "_id": "6595ca95ac596230b504cf2f",
                    "name": "test2",
                    "atLevel": 4
                },
                {
                    "_id": "6595b6207b5cf507fde20398",
                    "name": "test",
                    "atLevel": 2
                },
                {
                    "_id": "6595caa1ac596230b504cf32",
                    "name": "test3",
                    "atLevel": 1
                }
            ]
        }
        ```

- /signup
    - Method: `PUT`
    
    - Request Body: 
        ```json
        {
            "email":"test@test4.com",
            "password":"1234567890",
            "name":"test4",
            "phone": "1234567890"
        }
        ```

    - Response Body:
        ```json
        {
            "message": "User Created!",
            "userId": "65965f64cea643a1f9139141"
        }
        ```


- /login
    - Method: `POST`

    - Request Body:
        ```json
        {
            "email":"test@test2.com",
            "password":"1234567890"
        }
        ```

    - Response Body: 
        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdDIuY29tIiwidXNlcklkIjoiNjU5NWNhOTVhYzU5NjIzMGI1MDRjZjJmIiwiaWF0IjoxNzA0MzUyMTk2LCJleHAiOjE3MDQzOTUzOTZ9.8jL5zuU4EvTXjFtszmJCbfQ0NBIvJYQo2HBOAhQGWLQ",
            "userId": "6595ca95ac596230b504cf2f"
        }
        ```

- /currentLevel
    - Method: `GET`

    - Request Header:
        `Authorization:Bearer <token>`
    
    - Response Body:
        ```json
        {
            "question": "What is the capital of India?",
            "hint": "You wasted your dad's money."
        }
        ```

- /currentLevel
    - Method: `POST`

    - Request Header:
        `Authorization:Bearer <token>`
    
    - Request Body:
        ```json
        {
            "answer":"delhi"
        }
        ```
    
    - Response Body:
        ```json
        {
            "question": "American name for black people.",
            "hint": "You know this."
        }
        
        Or
        
        {
            "message": "You have completed the game!"
        }
        ```

# Errors

- **Response Body is an example**

- Response Body:
    ```json
    {
        "message": "Validation Failed!",
        "data": [
            {
                "type": "field",
                "value": "test@test4.com",
                "msg": "Email already exists!",
                "path": "email",
                "location": "body"
            },
            {
                "type": "field",
                "value": "123456780",
                "msg": "Password must be at least 10 characters long.",
                "path": "password",
                "location": "body"
            },
            {
                "type": "field",
                "value": "",
                "msg": "Name cannot be empty.",
                "path": "name",
                "location": "body"
            }
        ]
    }
    ```
