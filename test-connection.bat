@echo off
echo Testing server connection...
echo.

echo Testing health endpoint...
curl -s http://localhost:8080/api/health
echo.
echo.

echo Testing login endpoint...
curl -s -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@college.com\",\"password\":\"admin123\"}"
echo.
echo.

pause
