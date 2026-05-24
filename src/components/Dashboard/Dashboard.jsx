import React from 'react'
import HeroStats from './HeroStats'
import LiveMonitoring from './LiveMonitoring'
import AIAnalytics from './AIAnalytics'
import ThreatTimeline from './ThreatTimeline'
import QuarantineCenter from './QuarantineCenter'
import ThreatMap from './ThreatMap'
import SystemHealth from './SystemHealth'
import CyberBackground from '../UI/CyberBackground'

export default function Dashboard() {
  return (
    <div className="relative">
      <CyberBackground />
      <div className="relative z-10">
        <HeroStats />
        <LiveMonitoring />
        <AIAnalytics />
        <ThreatTimeline />
        <QuarantineCenter />
        <ThreatMap />
        <SystemHealth />
      </div>
    </div>
  )
}