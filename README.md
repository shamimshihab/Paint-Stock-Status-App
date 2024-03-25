# Paint Stock Status App

This application is designed to efficiently manage paint stock status within an paint. The Paint Stock Status App is deployed and can be accessed at:

[https://deploy-paint-stock.vercel.app/](https://deploy-paint-stock.vercel.app/)

## Technology Used In This Project:

- **Frontend Framework:** React
- **Backend:** Node.js and Express.js for the server-side environment
- **UI Framework:** Material UI for user interface
- **Database:** MongoDB for data storage

## Project Organization

The project is divided into two parts: frontend and backend.

### Backend

The backend system is designed using Node.js and Express, offering a set of RESTful APIs to handle paint color stock status, updating, and editing. It also manages permissions for who can update the paint stock status, read it, and the paint management admin who can give permission to edit and update the paint stock. MongoDB serves as the database.

1. **Running the Backend:**

   - Navigate to the `backend` folder using:
     ```
     cd backend
     ```
   - Install npm packages:
     ```
     npm install
     ```
   - Start the backend server:
     ```
     nodemon index.js
     ```

### Frontend

After running backend, frontend can be started.

2. **Running the Frontend:**

   - Navigate to the `frontend` folder using:

     ```
     cd frontend

     ```

   - Install required npm packages:

     ```
     npm install

     ```

   - Start the frontend:
     ```
     npm start
     ```

## How to Use This Application

At first, the user needs to log in to the application with their user ID and password. For example:

- User John (painter) has the username "John" and password "test".
- User Jane (manager) has the username "Jane" and password "test".
- User Adam (system admin) has the username "Adam" and password "test".
- User Painter1 (painter) has the username "Painter1" and password "test".

## What to Expect

- **John (painter)**: After logging in, he has only permission to read the paint stock status.
- **Jane (manager)**: After logging in, she can view the paint stock status and edit it.
- **Adam (system admin)**: After logging in, he can manage user permissions for reading or changing the paint stock update status. As an admin, Adam can also delete or register new users and assign permissions for editing.

## Deployment

In this repository, there is a branch named `deployment` from which the code is deployed. The backend is deployed on Render, and the frontend code is deployed on Vercel. The application is accessible at [https://deploy-paint-stock.vercel.app/](https://deploy-paint-stock.vercel.app/).
