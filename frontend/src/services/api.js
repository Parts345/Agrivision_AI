import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000
});

export async function predictDisease(file) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return data;
}

export async function fetchHealth() {
  const { data } = await api.get("/health");
  return data;
}
