# Test server connection
Write-Host "Testing server connection..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/health" -Method Get
    Write-Host "Server is running!" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json)" -ForegroundColor Cyan
} catch {
    Write-Host "Server connection failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTesting login endpoint..." -ForegroundColor Yellow

try {
    $loginData = @{
        email = "admin@college.com"
        password = "admin123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -Body $loginData -ContentType "application/json"
    Write-Host "Login successful!" -ForegroundColor Green
    Write-Host "Token: $($response.data.token)" -ForegroundColor Cyan
} catch {
    Write-Host "Login failed: $($_.Exception.Message)" -ForegroundColor Red
}
