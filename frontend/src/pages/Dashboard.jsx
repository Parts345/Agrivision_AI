import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { CloudSun, Droplets, MapPin, Satellite, Sparkles, ThermometerSun, Waves } from "lucide-react";
import { diseaseStats, healthSeries, insights, recommendations } from "../data/dashboard.js";

export default function Dashboard() {
  return (
    <section className="relative mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-32">
      <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow">Smart farming dashboard</p>
          <h1 className="section-heading">Crop intelligence command center</h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">
            A futuristic analytics cockpit for weather, disease trends, soil signals, recommendations, and live field readiness.
          </p>
        </div>
        <div className="glass-panel flex items-center gap-4 p-4">
          <CloudSun className="text-amber-300" />
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Nagpur field cluster</p>
            <p className="text-xl font-black">29°C · Humid · Low wind</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((item, index) => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="glass-panel p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-3xl font-black">{item.value}</h2>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-chlorophyll">{item.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        <div className="glass-panel p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">Crop health analytics</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Animated weekly signal fusion</p>
            </div>
            <Satellite className="text-cyber" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthSeries}>
                <defs>
                  <linearGradient id="health" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#65f6a7" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="#65f6a7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.2)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "rgba(6,19,15,.92)", border: "1px solid rgba(101,246,167,.25)", borderRadius: 16, color: "#fff" }} />
                <Area type="monotone" dataKey="health" stroke="#65f6a7" fill="url(#health)" strokeWidth={3} />
                <Area type="monotone" dataKey="moisture" stroke="#46d9ff" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5">
          <h2 className="text-2xl font-black">Disease statistics</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseStats} dataKey="value" nameKey="name" innerRadius={62} outerRadius={104} paddingAngle={3}>
                  {diseaseStats.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "rgba(6,19,15,.92)", border: "1px solid rgba(101,246,167,.25)", borderRadius: 16, color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {diseaseStats.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="glass-panel p-5">
          <h2 className="mb-5 text-2xl font-black">Weather widget</h2>
          <div className="grid gap-4">
            {[["Temperature", "29°C", <ThermometerSun />], ["Humidity", "78%", <Droplets />], ["Irrigation flow", "Optimal", <Waves />]].map(([label, value, icon]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-white/50 p-4 dark:bg-white/5">
                <div className="flex items-center gap-3 text-cyber">{icon}<span className="text-slate-600 dark:text-slate-300">{label}</span></div>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5">
          <h2 className="mb-5 text-2xl font-black">AI recommendations</h2>
          <div className="space-y-3">
            {recommendations.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-emerald-400/10 p-4 text-sm leading-6">
                <Sparkles className="mt-1 shrink-0 text-chlorophyll" size={17} />
                <span className="text-slate-600 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5">
          <h2 className="mb-5 text-2xl font-black">Soil analytics</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.2)" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: "rgba(6,19,15,.92)", border: "1px solid rgba(101,246,167,.25)", borderRadius: 16, color: "#fff" }} />
                <Bar dataKey="risk" fill="#46d9ff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><MapPin size={16} /> Placeholder for IoT soil sensor stream.</p>
        </div>
      </div>
    </section>
  );
}
