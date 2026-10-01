# Ransomware Detection Dashboard

A security operations dashboard for monitoring threats, quarantine status and file activity — built as a front-end companion to my research interest in zero-day attack detection.

---

## Overview

This dashboard visualizes the kinds of signals a ransomware detection system produces: live threat events, quarantined files, attack timelines, file activity logs and system health. It is a **front-end application with simulated real-time data** (`src/utils/mockData.js` + `useRealtimeData` hook), designed as a UI/UX exploration of a security operations center (SOC) interface and a foundation for connecting a real detection backend later.

---

## Features

- **Live Monitoring** — real-time threat feed with severity levels
- **Threat Map & Timeline** — geographic and chronological views of events
- **Quarantine Center** — isolated files with restore/release actions
- **Attack Timeline** — step-by-step view of an attack chain
- **File Activity** — monitored file operations and anomalies
- **AI Analytics** — model confidence and detection statistics
- **System Health** — host status and protection metrics
- **Reports & Settings** — exportable summaries and configuration
- **Responsive UI** — sidebar navigation, animated cards, dark security theme

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| Frontend | React 18, Vite, React Router |
| Styling | Tailwind CSS 3 |
| Charts | Recharts |
| Animation | Framer Motion |
| Icons | Lucide React |
| Data | Simulated real-time data (mock) |

---

## Screenshots

> **Placeholder** — capture the app and save images under `screenshots/`, then replace the paths below.

```md
![Threat Dashboard](screenshots/dashboard.png)
![Quarantine Center](screenshots/quarantine.png)
![Attack Timeline](screenshots/attack-timeline.png)
```

---

## Live Demo

<!-- Add a deployment URL here (Vercel / Netlify) once the app is published. -->

*Not yet deployed — run locally with the steps below.*

---

## Installation

```bash
git clone https://github.com/AlveeHossain45/ransomware-detection-dashboard.git
cd ransomware-detection-dashboard
npm install
npm run dev
```

Then open the URL printed by Vite (default `http://localhost:5173`).

```bash
npm run build      # production build → dist/
npm run preview    # preview the production build
```

---

## Environment Variables

None — the app runs entirely on simulated data with no API keys or backend.

---

## Project Structure

```text
src/
├── components/
│   ├── Charts/          # ThreatChart, PerformanceChart
│   ├── Dashboard/       # HeroStats, LiveMonitoring, ThreatMap,
│   │                    # ThreatTimeline, QuarantineCenter, SystemHealth, AIAnalytics
│   ├── Layout/          # Navbar, Sidebar, Layout
│   ├── Pages/           # LiveDetection, ThreatLogs, QuarantineCenter,
│   │                    # AttackTimeline, FileActivity, AIAnalytics, Reports, Settings
│   └── UI/              # CyberBackground, GlowingCard, AlertSystem, LoadingSkeleton
├── hooks/
│   └── useRealtimeData.js   # simulated streaming events
├── utils/
│   └── mockData.js          # generated threat/telemetry data
├── App.jsx
└── main.jsx
```

---

## Future Improvements

- Connect to a real detection backend (file-system or network telemetry API)
- Rule/ML model integration for anomaly scoring
- Persistent alert history and user-defined thresholds
- Exportable incident reports (PDF/CSV)

---

## Note

All data shown is **simulated for demonstration purposes** — no live systems are monitored by this application.
