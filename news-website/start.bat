@echo off
echo ===== KHỞI ĐỘNG ỨNG DỤNG NEWS WEBSITE =====
echo.

echo Khởi động Backend (API)...
start cmd /k "cd %~dp0backend && npm start"

echo.
echo Đợi 5 giây để backend khởi động...
timeout /t 5 /nobreak > nul

echo.
echo Khởi động Frontend...
start cmd /k "cd %~dp0frontend && npm start"

echo.
echo ===== THÔNG TIN TRUY CẬP =====
echo.
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000/api/v1/articles
echo.
echo Nhấn phím bất kỳ để đóng cửa sổ này...
pause > nul