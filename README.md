# Bino Search Demo - Backend Setup

## Prerequisites
- Node.js installed (Download from https://nodejs.org/)

## Installation Steps

1. Open Command Prompt in the Biano folder
2. Install dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   npm start
   ```

4. Server will run at http://localhost:3000

5. Open index.html in your browser

## Database
- SQLite database file: `bino.db`
- Automatically created on first run
- Stores all application submissions

## API Endpoints
- POST /api/applications - Submit new application
- GET /api/applications - Get all applications
- GET /api/applications/:id - Get specific application
- DELETE /api/applications/:id - Delete application

## Files
- server.js - Backend server
- bino.db - SQLite database (auto-created)
- package.json - Dependencies
