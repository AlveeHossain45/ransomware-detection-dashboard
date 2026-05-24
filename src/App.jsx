import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import Settings from './components/Pages/Settings'
import Reports from './components/Pages/Reports'
import ThreatMonitoring from './components/Pages/ThreatMonitoring'
import LiveDetection from './components/Pages/LiveDetection'
import FileActivityPage from './components/Pages/FileActivityPage'
import AIAnalyticsPage from './components/Pages/AIAnalyticsPage'
import AttackTimelinePage from './components/Pages/AttackTimelinePage'
import QuarantineCenterPage from './components/Pages/QuarantineCenterPage'
import ThreatLogsPage from './components/Pages/ThreatLogsPage'
import UserProfilePage from './components/Pages/UserProfilePage'
import { AlertProvider } from './components/UI/AlertSystem'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <AlertProvider>
      <Router>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/threat-monitoring" element={<ThreatMonitoring />} />
            <Route path="/live-detection" element={<LiveDetection />} />
            <Route path="/file-activity" element={<FileActivityPage />} />
            <Route path="/ai-analytics" element={<AIAnalyticsPage />} />
            <Route path="/attack-timeline" element={<AttackTimelinePage />} />
            <Route path="/quarantine" element={<QuarantineCenterPage />} />
            <Route path="/threat-logs" element={<ThreatLogsPage />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<UserProfilePage />} />
          </Routes>
        </Layout>
      </Router>
    </AlertProvider>
  )
}

export default App