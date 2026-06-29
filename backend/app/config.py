from __future__ import annotations

import os
from pathlib import Path


ROOT_DIR = Path(__file__).resolve().parents[2]
DEFAULT_MODEL_PATH = ROOT_DIR / "model" / "model.h5"


class Settings:
    app_name: str = "AgriVision AI API"
    api_version: str = "1.0.0"
    model_path: Path = Path(os.getenv("MODEL_PATH", DEFAULT_MODEL_PATH))
    allowed_origins: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173",
        ).split(",")
        if origin.strip()
    ]


settings = Settings()
