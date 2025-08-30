# Tutorial App (Create React App frontend + Express backend with SQLite + Knex)

This project uses:
- Frontend: Create React App (`/frontend`)
- Backend: Express with Knex + SQLite (`/backend`)

## Quick start

1. Open two terminals.

Backend:
```
cd backend
npm install
# optional: run migration (server auto-creates table too)
npm run migrate
npm start
```
Backend runs on http://localhost:4000

Frontend:
```
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

API endpoints:
- GET /api/tutorials
- POST /api/tutorials { title, description }
- PUT /api/tutorials/:id
- DELETE /api/tutorials/:id

Notes:
- The backend uses SQLite file `backend/tutorials.sqlite`. The server will auto-create the DB and table if missing.
- This is suitable for development and demos. For production, use a managed DB and connection pooling.