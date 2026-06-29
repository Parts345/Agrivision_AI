import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Camera, CheckCircle2, CloudUpload, Loader2, Microscope, ShieldAlert, Sparkles, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { predictDisease } from "../services/api.js";

function ResultCard({ title, items }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
      <h3 className="mb-3 text-lg font-black">{title}</h3>
      <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item) => <li key={item}>- {item}</li>)}
      </ul>
    </motion.div>
  );
}

export default function Detect() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const cameraRef = useRef(null);

  const chartData = useMemo(() => {
    if (!result?.probabilities) return [];
    return Object.entries(result.probabilities).map(([name, value]) => ({
      name,
      confidence: Math.round(value * 1000) / 10
    }));
  }, [result]);

  const acceptFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    setFile(selectedFile);
    setResult(null);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    acceptFile(event.dataTransfer.files?.[0]);
  };

  const clearUpload = () => {
    setFile(null);
    setPreview("");
    setResult(null);
  };

  const runPrediction = async () => {
    if (!file) {
      toast.error("Upload a rice leaf image first.");
      return;
    }
    setLoading(true);
    try {
      const data = await predictDisease(file);
      setResult(data);
      toast.success("Prediction completed.");
    } catch (error) {
      const message = error?.response?.data?.detail || "Prediction failed. Check that the FastAPI backend is running.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-32">
      <div className="mb-10 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <p className="eyebrow">AI disease detection</p>
          <h1 className="section-heading">Upload a rice leaf and run real TensorFlow inference</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
            Drag, drop, browse, or capture a leaf photo. The frontend sends it to FastAPI at POST /predict and renders confidence, treatment, prevention, and symptom intelligence.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="glass-panel p-5"><Microscope className="text-chlorophyll" /><p className="mt-3 font-black">CBAM model</p></div>
          <div className="glass-panel p-5"><Sparkles className="text-cyber" /><p className="mt-3 font-black">Animated UX</p></div>
          <div className="glass-panel p-5"><ShieldAlert className="text-aurora" /><p className="mt-3 font-black">Care guidance</p></div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="glass-panel p-5">
          <div
            className="upload-zone"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            {preview ? (
              <img src={preview} alt="Uploaded rice leaf preview" className="h-full w-full rounded-3xl object-cover" />
            ) : (
              <div className="text-center">
                <CloudUpload className="mx-auto text-chlorophyll" size={100} />
                <h2 className="mt-4 text-2xl font-black">Drop leaf image here</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">JPG, PNG, JPEG, or WEBP</p>
              </div>
            )}
          </div>
          <input ref={inputRef} hidden type="file" accept="image/*" onChange={(event) => acceptFile(event.target.files?.[0])} />
          <input ref={cameraRef} hidden type="file" accept="image/*" capture="environment" onChange={(event) => acceptFile(event.target.files?.[0])} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="secondary-button" onClick={() => inputRef.current?.click()}><CloudUpload size={18} /> Browse</button>
            <button className="secondary-button" onClick={() => cameraRef.current?.click()}><Camera size={18} /> Camera</button>
            {file && <button className="secondary-button" onClick={clearUpload}><X size={18} /> Clear</button>}
            <button className="primary-button ml-auto disabled:cursor-not-allowed disabled:opacity-60" onClick={runPrediction} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
              {loading ? "Predicting" : "Predict disease"}
            </button>
          </div>
        </div>

        <div className="glass-panel min-h-[460px] p-6">
          {!result && (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-emerald-400/15 text-chlorophyll">
                  {loading ? <Loader2 className="animate-spin" size={34} /> : <Microscope size={34} />}
                </div>
                <h2 className="mt-5 text-2xl font-black">{loading ? "Analyzing cellular patterns" : "Prediction result appears here"}</h2>
                <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">The API returns disease metadata and a confidence distribution across configured rice classes.</p>
              </div>
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <p className="eyebrow">AI diagnosis</p>
                  <h2 className="text-4xl font-black">{result.predicted_label}</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{result.description}</p>
                </div>
                <div className="confidence-ring">
                  <strong>{Math.round(result.confidence * 100)}%</strong>
                  <span>confidence</span>
                </div>
              </div>

              <div className="mt-8 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.2)" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} interval={0} angle={-12} textAnchor="end" height={60} />
                    <YAxis stroke="#94a3b8" fontSize={12} unit="%" />
                    <Tooltip contentStyle={{ background: "rgba(6,19,15,.92)", border: "1px solid rgba(101,246,167,.25)", borderRadius: 16, color: "#fff" }} />
                    <Bar dataKey="confidence" fill="#65f6a7" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <ResultCard title="Symptoms" items={result.symptoms} />
          <ResultCard title="Suggested Treatment" items={result.treatment} />
          <ResultCard title="Prevention Tips" items={result.prevention} />
          <ResultCard title="Likely Causes" items={result.causes} />
        </div>
      )}
    </section>
  );
}
