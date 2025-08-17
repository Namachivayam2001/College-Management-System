# College Management System

A comprehensive college management system built with React (Frontend) and Node.js/Express (Backend) with MongoDB database.

## Features

- **Role-based Access Control**: Admin, HOD, Teacher, and Student dashboards
- **Authentication System**: Secure login with JWT tokens
- **User Management**: Create, update, and manage users
- **Department Management**: Organize users by departments
- **Dashboard Analytics**: Statistics and reports for each role
- **Responsive Design**: Modern UI that works on all devices

## Tech Stack

### Frontend
- React 18 with Vite
- Redux Toolkit for state management
- React Router for navigation
- CSS3 with modern design patterns

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Express validation middleware

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd College-Management-System
```

### 2. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create .env file
echo "PORT=8080
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/college_management_system
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100" > .env

# Start MongoDB (if not running)
# On Windows: Start MongoDB service
# On macOS: brew services start mongodb-community
# On Linux: sudo systemctl start mongod

# Start the server
npm run dev
```

### 3. Frontend Setup
```bash
cd client

# Install dependencies
npm install

# Create .env file
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env

# Start the development server
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api
- Health Check: http://localhost:8080/api/health

## Default Users

The system comes with sample data. You can create users through the admin interface or use these test credentials:

### Admin User
- Email: admin@college.com
- Password: admin123
- Role: Admin

### HOD User
- Email: hod@college.com
- Password: hod123
- Role: HOD

### Teacher User
- Email: teacher@college.com
- Password: teacher123
- Role: Teacher

### Student User
- Email: student@college.com
- Password: student123
- Role: Student

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration (Admin only)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Admin Routes
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store and slices
│   │   └── App.jsx        # Main application component
│   └── package.json
├── server/                 # Backend Node.js application
│   ├── config/            # Database and app configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
└── README.md
```

## Development

### Running in Development Mode
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### Building for Production
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 8080)
- `NODE_ENV`: Environment (development/production)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLIENT_URL`: Frontend URL for CORS

### Frontend (.env)
- `VITE_API_BASE_URL`: Backend API base URL

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file
   - Verify MongoDB service status

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill process using the port: `lsof -ti:8080 | xargs kill -9`

3. **CORS Issues**
   - Verify CLIENT_URL in backend .env
   - Check if frontend is running on correct port

4. **JWT Token Issues**
   - Ensure JWT_SECRET is set in backend .env
   - Check token expiration time

### Database Setup
```bash
# Connect to MongoDB
mongosh

# Create database
use college_management_system

# Create collections (optional - Mongoose will create them automatically)
db.createCollection('users')
db.createCollection('departments')
db.createCollection('students')
db.createCollection('teachers')
db.createCollection('hods')
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.