# AgriVision AI Smart Farming Platform

Startup-style rice disease detection platform with a React/Vite frontend and FastAPI TensorFlow backend.

## What Is Included

- `frontend/` React + Vite + Tailwind CSS + Framer Motion + Recharts
- `backend/` FastAPI REST API with CORS and `POST /predict`
- Real Keras/TensorFlow model loading from `model/model.h5`
- Keras 3 compatibility patch for legacy CBAM Lambda layers
- Drag/drop image upload, camera upload, preview, toast states, animated results
- Dashboard, weather UI, disease analytics, recommendations, chatbot placeholder
- Deployment files for Vercel and Render

## Model

The backend defaults to:

```text
model/model.h5
```

To use another file, set:

```text
MODEL_PATH=C:\Users\Ushank Rajeshirke\Downloads\rice_disease_cbam_transformer_model2.h5
```

Class labels are centralized in:

```text
backend/app/disease_info.py
```

The current model in this workspace appears to use 6 outputs:

```text
Bacterial Blight, Blast, Brown Spot, Healthy, Sheath Rot, Tungro
```

If your trained model has 5 classes, remove or adjust the extra class in `CLASS_NAMES`.

## Run Backend

```bash
cd backend
python -m venv .venv  or py -3.11 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check:

```text
http://localhost:8000/health
```

Prediction endpoint:

```text
POST http://localhost:8000/predict
form-data key: file
```

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Create `frontend/.env` when deploying or changing backend URL:

```text
VITE_API_BASE_URL=http://localhost:8000
```

## Deployment

### Frontend on Vercel

Set project root to `frontend`, build command `npm run build`, output directory `dist`.

Environment variable:

```text
VITE_API_BASE_URL=https://your-backend.onrender.com
```

### Backend on Render or Railway

Use `backend/requirements.txt`.

Start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment variables:

```text
MODEL_PATH=../model/model.h5
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

For production, upload the model file with the backend or store it in a persistent/private artifact location and set `MODEL_PATH`.
