# Patient Health Dashboard - Setup and Configuration

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/patient-health-dashboard.git
   cd patient-health-dashboard
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/patient_dashboard
JWT_SECRET=your_jwt_secret_key
```

Create a `.env` file in the `frontend` directory with the following variables:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

The application should now be running at `http://localhost:3000`.

## API Endpoints

- `POST /api/auth/login`: User login
- `GET /api/patients`: Get paginated list of patients
- `GET /api/patients/:id`: Get a single patient by ID
- `POST /api/patients`: Create a new patient

## Testing

Run backend tests:
```
cd backend
npm run dev
```

Run frontend tests:
```
cd frontend
npm start
```

## Deployment



