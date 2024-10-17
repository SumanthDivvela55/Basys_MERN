# Patient Health Dashboard API Documentation

## Base URL
`http://localhost:5000/api` (for local development)

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Patients

#### Get all patients
- **GET** `/patients`
- **Response:**
  ```json
  {
    "patients": [
      {
        "_id": "string",
        "name": "string",
        "age": "number",
        "condition": "string",
        "medicalHistory": "string",
        "treatmentPlan": "string",
  
      }
    ],
    "currentPage": "number",
    "totalPages": "number"
  }
  ```

#### Get patient details
- **GET** `/patients/:id`
- **Response:**
  ```json
  {
    "_id": "string",
    "name": "string",
    "age": "number",
    "condition": "string",
    "medicalHistory": [
      {
        "date": "string",
        "treatment": "string",
        "notes": "string"
      }
    ],
    "treatmentPlan": "string"
  }
  ```

### Prior Authorization

#### Submit authorization request
- **POST** `/auth-requests`
- **Body:**
  ```json
  {
    "patientId": "string",
    "treatmentType": "string",
    "insurancePlan": "string",
    "dateOfService": "string",
    "diagnosisCode": "string",
    "doctorNotes": "string"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "patientId": "string",
    "status": "pending",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```

#### Get all authorization requests
- **GET** `/auth-requests`
- **Query Parameters:**
  - `page` (optional): Page number for pagination (default: 1)
  - `limit` (optional): Number of requests per page (default: 10)
  - `status` (optional): Filter by status (pending/approved/denied)
- **Response:**
  ```json
  {
    "requests": [
      {
        "_id": "string",
        "patientId": "string",
        "treatmentType": "string",
        "status": "string",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "currentPage": "number",
    "totalPages": "number"
  }
  ```

#### Get authorization request details
- **GET** `/auth-requests/:id`
- **Response:**
  ```json
  {
    "_id": "string",
    "patientId": "string",
    "treatmentType": "string",
    "insurancePlan": "string",
    "dateOfService": "string",
    "diagnosisCode": "string",
    "doctorNotes": "string",
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
  ```

#### Update authorization request status
- **PATCH** `/auth-requests/:id`
- **Body:**
  ```json
  {
    "status": "approved" // or "denied"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "string",
    "status": "string",
    "updatedAt": "string"
  }
  ```

## Error Responses
All endpoints may return the following error responses:

- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Missing or invalid authentication token
- **403 Forbidden:** User doesn't have permission to perform the action
- **404 Not Found:** Requested resource not found
- **500 Internal Server Error:** Unexpected server error

Error response body:
```json
{
  "error": "string",
  "message": "string"
}
```

## Rate Limiting
To protect the API from abuse, rate limiting is implemented. Each client is limited to 100 requests per minute. If this limit is exceeded, the API will respond with a 429 Too Many Requests status code.
