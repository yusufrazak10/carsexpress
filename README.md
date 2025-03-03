# Car Express

A web application built with React (frontend) and Express (backend) to manage a list of cars, interacting with a RESTful API.

## Overview

The application allows you to:

- View a list of cars fetched from the backend API.
- Add new cars to the list.
- Modify car details.
- Delete cars from the list.

Additionally, as a bonus feature, car properties, such as the car image, will be displayed using a URL from the car data.

## Dependencies for Backend

- `express`: Web framework to build the API.
- `cors`: Middleware for enabling CORS.
- `dotenv`: To manage environment variables.

### Scripts for Backend

- `start`: Starts the Express server.
- `start-dev`: Starts the server with nodemon for development.

## Backend Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/carsexpress.git
Change directory to the backend folder:
cd Express
Install backend dependencies:
npm install
Start the backend server:
npm run start-dev
This will run the server on http://localhost:8080.
Frontend

The frontend is a React app that interacts with the backend API to manage and display the car data.

Dependencies for Frontend
react: The main library for building the user interface.
react-dom: React's rendering engine.
react-router-dom: For handling routing within the React app.
react-scripts: Provides build scripts and configurations.
Frontend Installation

Change directory to the frontend folder (usually located inside the root folder):
cd my-react-app
Install frontend dependencies:
npm install
Start the frontend React app:
npm start
This will run the frontend React app on http://localhost:3000.
Proxy Setup

The frontend is set to proxy requests to the backend running at http://localhost:8080.

Running Both Servers (Backend + Frontend)

First, ensure that the backend server is running on http://localhost:8080.
Then, run the React frontend on http://localhost:3000.
These two servers work together to allow for full interaction between the frontend and backend.
