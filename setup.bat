@echo off
echo Setting up College Management System...
echo.

echo Creating backend .env file...
cd server
echo PORT=8080 > .env
echo NODE_ENV=development >> .env
echo MONGODB_URI=mongodb://localhost:27017/college_management_system >> .env
echo JWT_SECRET=your-super-secret-jwt-key-change-this-in-production >> .env
echo CLIENT_URL=http://localhost:5173 >> .env
echo RATE_LIMIT_WINDOW_MS=900000 >> .env
echo RATE_LIMIT_MAX_REQUESTS=100 >> .env
echo Backend .env created successfully!
echo.

echo Installing backend dependencies...
npm install
echo Backend dependencies installed!
echo.

echo Creating frontend .env file...
cd ..\client
echo VITE_API_BASE_URL=http://localhost:8080/api > .env
echo Frontend .env created successfully!
echo.

echo Installing frontend dependencies...
npm install
echo Frontend dependencies installed!
echo.

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Start MongoDB service
echo 2. Open a new terminal and run: cd server ^&^& npm run dev
echo 3. Open another terminal and run: cd client ^&^& npm run dev
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: http://localhost:8080/api
echo.
pause
