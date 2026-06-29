from __future__ import annotations

from pydantic import BaseModel


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_path: str
    classes: list[str]


class PredictionResponse(BaseModel):
    predicted_class: str
    predicted_label: str
    confidence: float
    probabilities: dict[str, float]
    description: str
    symptoms: list[str]
    causes: list[str]
    prevention: list[str]
    treatment: list[str]
    risk_level: str
