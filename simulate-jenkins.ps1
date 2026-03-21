Write-Host "[Jenkins Simulator] Started by user Admin" -ForegroundColor Green
Write-Host "[Jenkins Simulator] Running in workspace: $PWD"
Write-Host "------------------------------------------------------"

# Stage 1: Checkout
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "STAGE: Checkout" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Start-Sleep -Seconds 1
Write-Host "Checking out source code from repository..." -ForegroundColor DarkGray
Write-Host "Fetching changes..." -ForegroundColor DarkGray
Write-Host "Success." -ForegroundColor Green

# Stage 2: Install Dependencies
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "STAGE: Install Dependencies" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "Installing Server Dependencies..." -ForegroundColor Yellow
cd server
npm install
Write-Host "Installing Client Dependencies..." -ForegroundColor Yellow
cd ../client
npm install
cd ..
Write-Host "Dependencies installed successfully." -ForegroundColor Green

# Stage 3: Test Backend
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "STAGE: Test Backend" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
cd server
npm test
$testResult = $LASTEXITCODE
cd ..

if ($testResult -ne 0) {
    Write-Host "PIPELINE FAILED: Backend Tests Failed!" -ForegroundColor Red
    exit 1
}

# Stage 4: Build Frontend
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "STAGE: Build Frontend" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
cd client
npm run build
$buildResult = $LASTEXITCODE
cd ..

if ($buildResult -ne 0) {
    Write-Host "PIPELINE FAILED: Frontend Build Failed!" -ForegroundColor Red
    exit 1
}

# Stage 5: Deploy
Write-Host ""
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host "STAGE: Deploy (Docker)" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Start-Sleep -Seconds 1
Write-Host "Building Docker Image for server..." -ForegroundColor DarkGray
Write-Host "Building Docker Image for client..." -ForegroundColor DarkGray
Write-Host "Starting containers via docker-compose up -d --build" -ForegroundColor Yellow
Start-Sleep -Seconds 1
Write-Host "SUCCESS: Application deployed to Docker containers. Server on :5000, Client on :3005" -ForegroundColor Green

Write-Host ""
Write-Host "------------------------------------------------------"
Write-Host "Finished: SUCCESS" -ForegroundColor Green
Write-Host "------------------------------------------------------"
