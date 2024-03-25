# Paint Stock Status App

The Paint Stock Status App is a full-stack application designed to streamline the management of paint stock within a paint company. This application facilitates efficient tracking and updating of paint stock levels .The deployed application can be accssed at https://paint-stock-app-deploy.vercel.app/.

## Technology Used In This Project:

- **Frontend Framework:** React
- **Backend:** Node.js and Express.js
- **UI Framework:** Material UI
- **Database:** MongoDB

## Project Organization

The project is divided into two parts: frontend and backend.

### Backend

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
     node index.js
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

## Instructions to use the application

Users database and paint color stock status already stored in the MongoDb database.

At first, the user needs to log in to the web application with their user ID and password. For example:

- User John (painter) has the username "John" and password "test".
- User Jane (manager) has the username "Jane" and password "test".
- User Adam (system admin) has the username "Adam" and password "test".
- User Painter1 (painter) has the username "Painter1" and password "test".

## User Edit Permissions and Expected Behavior

Based on given permission, Users can expect following behavior.

- **John (painter)**: After logging in, John has the ability to view the paint stock status but does not have permission to make any changes.

- **Jane (manager)**: Jane can access the paint stock status and has the authority to edit it as needed, ensuring accurate inventory management.

- **Painter1 (painter)**: Painter1 can view the paint stock status. However, Painter1 also has the capability to update the stock status, reflecting any changes in inventory.

- **Adam (system admin)**: After logging in, he can manage user permissions for reading or changing the paint stock status. As an admin, Adam can also delete or register a new user where he can define the role, edit permission of a user.

## Deployment

In this repository, we have a dedicated `deployment` branch for deploying our application. The backend is deployed on Render, with build and start commands specified to run from the backend directory. Auto-deploy is enabled, ensuring that any changes pushed to this branch are automatically reflected in the live application. The frontend code is deployed from the frontend folder on Vercel, allowing deployment from the same branch. The application can be accessed the at https://paint-stock-app-deploy.vercel.app/.
