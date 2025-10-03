## Roadmap Gen

Full‑stack app for generating personalized high‑school roadmaps and essay feedback.

### Stack

- **Backend**: FastAPI, Uvicorn, OpenAI API
- **Frontend**: React + Vite, Tailwind CSS

---

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- OpenAI API key

---

## Environment

Create two env files:

- Backend `backend/.env`

```
OPEN_AI_KEY=your_openai_api_key
```

- Frontend `frontend/.env`

```
VITE_BACKEND=http://localhost:8000
```

Note: The backend currently allows CORS from `http://localhost:5177`. Either run Vite on port 5177 (recommended below) or add `http://localhost:5173` to the allowed origins in `backend/main.py`.

---

## Local Development

### 1) Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
# run on 5177 to match backend CORS allowlist
npm run dev -- --port 5177
```

Frontend will print the local URL (e.g., http://localhost:5177). Ensure it matches the backend CORS settings.

---

## Build

Frontend production build:

```bash
cd frontend
npm run build
```

---

## API Reference (Backend)

Base URL (local): `http://localhost:8000`

- POST `/generate`

  - Description: Generate a personalized roadmap
  - Body (JSON):
    ```json
    {
      "gpa": "3.8",
      "grade": "11",
      "interests": "computer science, math",
      "activities": "robotics club, tutoring",
      "demographics": "first-gen, low-income",
      "testing": "SAT 1450 practice",
      "collegeGoals": "T20 CS programs",
      "classes": "AP CS A, AP Calc BC"
    }
    ```
  - Response: `{ "roadmap": string }`

- POST `/essay`
  - Description: Get supportive, constructive essay feedback
  - Body (JSON):
    ```json
    {
      "grade": "12",
      "prompt": "Tell us about a challenge...",
      "essay": "<essay text>",
      "program": "UC PIQ / Common App"
    }
    ```
  - Response: `{ "feedback": string }`

Note: Frontend refers to a `/feedback` endpoint for storing feedback; this route is not currently implemented in the backend.

---

## Frontend Integration

The frontend reads `VITE_BACKEND` and calls:

- `POST {VITE_BACKEND}/generate`
- `POST {VITE_BACKEND}/essay`

It also loads `public/scholarships.json` directly from the frontend.

---

## Deployment

### Backend (Render)

`backend/render.yaml` is configured for Render:

- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port 10000`
- Env var required: `OPEN_AI_KEY`

After deployment, set the frontend `VITE_BACKEND` to the Render service URL.

### Frontend

Deploy the built `frontend/dist` with any static hosting (e.g., Vercel, Netlify). Ensure `VITE_BACKEND` is set at build time to the deployed backend URL.

---

## Troubleshooting

- CORS errors: Ensure the frontend origin (port) is listed in `CORSMiddleware` in `backend/main.py`, or run Vite on 5177 as shown.
- 401/403 from OpenAI: Verify `OPEN_AI_KEY` in `backend/.env` and that the key has permissions/usage available.
- Network errors from frontend: Confirm `VITE_BACKEND` is set and the backend is reachable.
