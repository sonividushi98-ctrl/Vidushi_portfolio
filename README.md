# Vidushi Soni — MERN Portfolio

Personal portfolio website for **Vidushi Soni**, a B.Tech Computer Science student at JK Lakshmipat University. Built as a MERN stack assignment: React (Vite) frontend, Express REST API, MongoDB contact storage, and resume downloads served from the backend.

## Live Links

- Frontend: `ADD_LIVE_FRONTEND_URL`
- Backend: `ADD_LIVE_BACKEND_URL`

Replace these placeholders after you deploy to Vercel and Render.

## Features

- Single-page React app with 5 routes plus a 404 page
- Animated hero, typewriter roles, scroll reveals, skill bars, and page transitions
- Dark / light theme persisted in `localStorage` (defaults from `prefers-color-scheme`)
- Projects with GitHub links, a live demo where one exists, and a tech filter
- Education, faculty internship, extra-curriculars, certifications, and hackathon participation
- Contact form with client validation, loading state, toasts, MongoDB save, and Nodemailer notification
- Resume download in PDF and Word via Express (`res.download`)
- Helmet, CORS, rate limiting, and environment-based secrets

## Tech stack

- **Frontend:** React, Vite, React Router v6, Framer Motion, react-type-animation, react-icons, CSS variables
- **Backend:** Node.js, Express, Mongoose, cors, dotenv, helmet, express-rate-limit, express-validator, nodemailer
- **Database:** MongoDB
- **Deploy:** Vercel (frontend), Render (backend)

## Folder structure

```text
.
├── client/                 React + Vite frontend
│   ├── public/             static assets (add profile.jpg here if you have one)
│   ├── src/data/portfolioData.js
│   └── vercel.json
├── server/                 Express API
│   ├── files/              Vidushisoni_Resume.pdf / .docx
│   ├── models/
│   ├── routes/
│   └── scripts/generateResume.js
├── render.yaml
└── README.md
```

All page copy lives in `client/src/data/portfolioData.js`. The internship entry is the `internship` object — edit that one block to update the faculty internship text.

## Local setup

Prerequisites: Node.js 18+ and a MongoDB database (local or Atlas).

```bash
git clone <your-repo-url>
cd ASSSignmentttt
npm install
npm run install:all
```

Copy env examples (already present as `.env.example`):

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

On macOS/Linux use `cp` instead of `copy`.

Edit `server/.env` with your MongoDB URI and Gmail app password, then:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health check: http://localhost:5000/api/health

Root scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Runs client and server together (concurrently) |
| `npm run build` | Builds the Vite client |
| `npm start` | Starts the Express server |

## Environment variables

### `server/.env`

| Variable | Purpose |
| --- | --- |
| `PORT` | API port (default `5000`) |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_URL` | Allowed frontend origin(s), comma-separated |
| `EMAIL_USER` | Gmail address used by Nodemailer |
| `EMAIL_PASS` | Gmail **app password** (not your normal password) |
| `NOTIFY_EMAIL` | Inbox that receives contact notifications (`sonividushi98@gmail.com`) |

### `client/.env`

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Backend base URL, e.g. `http://localhost:5000` |

Never commit real `.env` files. Only `.env.example` is tracked.

## MongoDB Atlas (free cluster)

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Build a **free M0** cluster.
3. **Database Access:** create a database user with password auth.
4. **Network Access:** add IP `0.0.0.0/0` so Render can connect.
5. **Connect → Drivers:** copy the URI and replace `<password>`.
6. Put it in `server/.env` as `MONGODB_URI`, and later in Render env vars.

Example shape (do not use this literally):

```text
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/vidushi_portfolio?retryWrites=true&w=majority
```

## Gmail app password (Nodemailer)

1. Open Google Account → Security.
2. Turn on 2-Step Verification.
3. Search **App passwords**, generate one for Mail.
4. Paste the 16-character password into `EMAIL_PASS`.
5. Set `EMAIL_USER` to the same Gmail inbox.
6. Keep `NOTIFY_EMAIL=sonividushi98@gmail.com`.

If email sending fails, the API still returns success after saving the message in MongoDB. The error is logged on the server only.

## Resume files

Original files are served unchanged from `server/files/`:

- `GET /api/resume/pdf` → `Vidushisoni_Resume.pdf`
- `GET /api/resume/docx` → `Vidushisoni_Resume.docx`

`Content-Disposition: attachment` is set so one click on the frontend buttons starts a download. If a file is missing, `server/scripts/generateResume.js` generates a fallback on startup and **never overwrites** an existing file.

If `client/public/profile.jpg` is not present, the About section shows a **VS** initials avatar.

## Deploy frontend (Vercel)

1. Push this repo to GitHub (public).
2. Import the repo in Vercel.
3. Set **Root Directory** to `client`.
4. Framework: Vite. Build: `npm run build`. Output: `dist`.
5. Add env var `VITE_API_URL` = your Render backend URL (no trailing slash).
6. Redeploy after the backend URL is known.
7. `client/vercel.json` rewrites all routes to `index.html` for the SPA.

## Deploy backend (Render)

You can use `render.yaml` or set this manually:

| Setting | Value |
| --- | --- |
| Root directory | `server` |
| Runtime | Node |
| Build | `npm install` |
| Start | `npm start` (`node server.js`) |
| Health | `/api/health` |

Environment on Render:

- `MONGODB_URI`
- `CLIENT_URL` = your Vercel URL (add it **after** the frontend is live; comma-separate extra origins if needed)
- `EMAIL_USER`, `EMAIL_PASS`, `NOTIFY_EMAIL`
- `NODE_ENV=production`

**Note:** Render’s free tier sleeps after idle time. The first request after sleep can take 30–60 seconds.

After Vercel gives you a production URL, update Render `CLIENT_URL` to that origin so CORS allows the live site. `http://localhost:5173` is always allowed for local work.

## What you still need to do

These cannot be completed without your accounts:

1. Create the MongoDB Atlas cluster and paste `MONGODB_URI`.
2. Create a Gmail app password and paste `EMAIL_USER` / `EMAIL_PASS`.
3. Click deploy on Vercel and Render, then replace `ADD_LIVE_FRONTEND_URL` and `ADD_LIVE_BACKEND_URL` in this README.
4. Set Render `CLIENT_URL` to the Vercel URL and Vercel `VITE_API_URL` to the Render URL.

## License

Course assignment — personal academic use.
