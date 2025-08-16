# College Management System - Backend

This is the backend server for the College Management System built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Support for Admin, HOD, Teacher, and Student roles
- **Department Management**: Create and manage departments
- **Attendance Tracking**: Mark and track student attendance
- **Exam Duty Management**: Schedule and assign exam duties
- **Security**: Password hashing, rate limiting, and input validation

## Database Schema

### Collections
1. **User**: Central authentication collection
2. **Department**: Department information
3. **HOD**: Head of Department profiles
4. **Teacher**: Teacher profiles
5. **Student**: Student profiles
6. **Attendance**: Student attendance records
7. **ExamDuty**: Exam duty assignments

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the server directory:
   ```env
   # Server Configuration
   PORT=8080
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/college-management

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

   # Client URL for CORS
   CLIENT_URL=http://localhost:5173

   # Rate Limiting
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud service like MongoDB Atlas.

4. **Run the Server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Admin only)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Health Check
- `GET /api/health` - Server health check

## Role-Based Access Control

### Admin
- Can create departments
- Can register all user types
- Can access all data

### HOD (Head of Department)
- Can manage teachers and students in their department
- Can view department reports
- Can assign exam duties

### Teacher
- Can mark attendance for their subjects
- Can view their assigned duties
- Can view student information for their classes

### Student
- Can view their own attendance
- Can view their profile
- Limited access to other data

## Security Features

- **Password Hashing**: Using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers

## Error Handling

The server includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Database errors
- General server errors

## Development

### Project Structure
```
server/
├── config/
│   └── database.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── User.js
│   ├── Department.js
│   ├── HOD.js
│   ├── Teacher.js
│   ├── Student.js
│   ├── Attendance.js
│   └── ExamDuty.js
├── routes/
│   └── auth.js
├── server.js
└── package.json
```

### Adding New Features

1. **Create Model**: Add new schema in `models/` directory
2. **Create Controller**: Add business logic in `controllers/` directory
3. **Create Routes**: Add API endpoints in `routes/` directory
4. **Add Middleware**: If needed, add new middleware in `middleware/` directory

## Testing

To test the API endpoints, you can use tools like:
- Postman
- Insomnia
- curl commands

Example login request:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.com","password":"password123"}'
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas or production MongoDB
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
6. Set up monitoring and logging
7. Configure SSL/TLS certificates

## Support

For issues and questions, please refer to the project documentation or create an issue in the repository.
