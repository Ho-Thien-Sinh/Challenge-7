# News Website

A full-stack news website application that crawls and displays news articles from various sources.

## Features

- News article crawling from Tuoi Tre website
- Article listing with pagination
- Article categorization
- Article detail view
- Responsive design using Bootstrap

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Cheerio for web scraping
- Node-cron for scheduled tasks
- Winston for logging

### Frontend
- React
- React Router
- Bootstrap
- Axios for API requests

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database

## Setup Instructions

1. **Clone the repository**

2. **Set up the database**
   - Create a PostgreSQL database named `newsapp`
   - Update the database credentials in `backend/.env` if needed

3. **Install dependencies**
   ```bash
   npm run install:all
   ```

4. **Start the application in development mode**
   ```bash
   npm run dev
   ```

   This will start both the backend server and frontend development server concurrently.

   - Backend will run on: http://localhost:5000
   - Frontend will run on: http://localhost:3000

## API Endpoints

- `GET /api/v1/articles` - Get all articles with pagination
- `GET /api/v1/articles/:id` - Get a specific article by ID

## Deployment

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The frontend build will be created in the `frontend/build` directory, which can be served using a static file server.

## License

ISC