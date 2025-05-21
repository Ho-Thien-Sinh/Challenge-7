@echo off
echo Installing dependencies...
cd %~dp0
npm install
cd backend
npm install
cd ../frontend
npm install
cd ..
echo All dependencies installed successfully!
echo.
echo Starting the application...
npm run dev