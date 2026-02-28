# Habit Tracker – Backend API

## Project Overview

This repository contains the backend API for the Habit Tracker application.

It provides secure authentication, habit management, streak calculation, leaderboard ranking, and reporting features.

Built using Node.js and Supabase (PostgreSQL).

---

## Tech Stack

- Node.js
- Express.js
- Supabase (PostgreSQL Database)
- JWT Authentication
- bcryptjs (Password Hashing)
- Day.js (Date Handling)
- CORS
- dotenv

---

## API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

---

### Habits

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/habits | Get all user habits |
| POST | /api/habits | Add new habit |
| PUT | /api/habits/:id | Update habit |
| DELETE | /api/habits/:id | Delete habit |
| POST | /api/habits/track | Mark habit as completed |
| GET | /api/habits/logs | Get today logs |

---

### Streak

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/streak | Get user streak |
| GET | /api/streak/leaderboard | Get streak leaderboard |

---

### Reports

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/reports | Get weekly & category reports |

---

### User

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/user/stats | Get user profile stats |

---

## Database Schema Explanation

### habit_users

- id (UUID)
- name
- email (Unique)
- password (Hashed)
- created_at

---

### habits

- id (UUID)
- user_id (Foreign Key → habit_users)
- title
- category
- priority
- created_at

---

### habit_logs

- id (UUID)
- habit_id (Foreign Key → habits)
- user_id (Foreign Key → habit_users)
- date
- status (completed / skipped / missed)
- created_at

---

## Installation Steps

1. Clone the Repository

git clone https://github.com/JayasriDeepthi-14/Habit_Tracker_Backtend.git

2. Navigate to folder

Navigate to folder

3. Install dependencies

npm install

4. Create .env file

PORT=5000
SUPABASE_URL=https://fzokthuimsmvqjchhxaa.supabase.co
SUPABASE_KEY=sb_publishable_DYhtB9ADsitXPUltbIoNYg_XibW_5bO
JWT_SECRET=habit-tracker-jwtsecretkey-secret123

5. Run Server

node server.js

Now, API runs at: http://localhost:5000

## Deployment Link

https://habit-tracker-backend-zzba.onrender.com