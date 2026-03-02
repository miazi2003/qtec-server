# Qtec-job-server


## Prerequisites
- Node.js 18+

## Setup
1. Install dependencies:
```bash
npm install
```
2. Create `env/.env`:
```env
PORT=5000
MONGO_URI={your_mongodb_connection_string}
CORS_ORIGINS={Frontend URL}
```

## Run locally
```bash
npm start
```
Server runs at: `http://localhost:5000`

## API routes
- `GET /` -> health check
- `GET /api/jobs` -> get all jobs
- `GET /api/jobs/:job_id` -> get one job by `job_id` (example: `JOB-001`)
- `POST /api/jobs` -> create a job (job_id auto-generated)
- `DELETE /api/jobs/:id` -> delete job by Mongo `_id`
- `POST /api/applications` -> submit application

