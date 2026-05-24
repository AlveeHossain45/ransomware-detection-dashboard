import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Activity, TrendingUp, AlertTriangle, Download, Filter, Eye, Clock, Target } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'
import { ThreatLineChart } from '../Charts/ThreatChart'

// Inline mock data
const mockThreatStats = {
  daily: {
    detected: 1247,
    blocked: 1203,
    quarantined: 44,
    falsePositives: 8
  }
}

const generateMockThreats = (count = 10) => {
  const threats = []
  const types = ['Ransomware', 'Trojan', 'Worm', 'Spyware', 'Adware', 'Rootkit']
  const severities = ['Critical', 'High', 'Medium', 'Low']
  const statuses = ['Blocked', 'Quarantined', 'Analyzing', 'Detected']
  
  for (let i = 0; i < count; i++) {
    threats.push({
      id: i + 1,
      name: `${types[Math.floor(Math.random() * types.length)]}_${Math.floor(Math.random() * 1000)}`,
      type: types[Math.floor(Math.random() * types.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      target: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      confidence: 70 + Math.random() * 29
    })
  }
  return threats
}

const threatTrendData = [
  { time: '00:00', threats: 12, blocked: 11 },
  { time: '02:00', threats: 8, blocked: 8 },
  { time: '04:00', threats: 5, blocked: 5 },
  { time: '06:00', threats: 7, blocked: 6 },
  { time: '08:00', threats: 18, blocked: 17 },
  { time: '10:00', threats: 22, blocked: 21 },
  { time: '12:00', threats: 25, blocked: 24 },
  { time: '14:00', threats: 32, blocked: 30 },
  { time: '16:00', threats: 35, blocked: 33 },
  { time: '18:00', threats: 28, blocked: 27 },
  { time: '20:00', threats: 24, blocked: 23 },
  { time: '22:00', threats: 16, blocked: 15 },
]

const threatTypesData = [
  { name: 'Ransomware', value: 45, color: '#ff0040' },
  { name: 'Trojan', value: 25, color: '#ff6600' },
  { name: 'Worm', value: 15, color: '#ffaa00' },
  { name: 'Spyware', value: 10, color: '#00f3ff' },
  { name: 'Other', value: 5, color: '#b000ff' },
]

export default function ThreatMonitoring() {
  const [timeRange, setTimeRange] = useState('24h')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const recentThreats = generateMockThreats(10)

  const severityColors = {
    Critical: 'bg-cyber-red/20 text-cyber-red',
    High: 'bg-orange-500/20 text-orange-500',
    Medium: 'bg-yellow-500/20 text-yellow-500',
    Low: 'bg-cyber-green/20 text-cyber-green'
  }

  const filteredThreats = recentThreats.filter(threat => 
    selectedSeverity === 'all' || threat.severity === selectedSeverity
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <Shield size={32} className="text-cyber-neon" />
          <h1 className="text-3xl font-bold">Threat Monitoring</h1>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="px-4 py-2 bg-cyber-neon/10 rounded-lg hover:bg-cyber-neon/20 transition-all text-sm">
            <Download size={16} className="inline mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlowingCard glowColor="red">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Threats</p>
              <p className="text-2xl font-bold text-cyber-red">{mockThreatStats.daily.detected}</p>
              <p className="text-xs text-cyber-green mt-1">↑ +23% vs yesterday</p>
            </div>
            <AlertTriangle size={32} className="text-cyber-red opacity-50" />
          </div>
        </GlowingCard>
        
        <GlowingCard glowColor="green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Blocked Attacks</p>
              <p className="text-2xl font-bold text-cyber-green">{mockThreatStats.daily.blocked}</p>
              <p className="text-xs text-cyber-green mt-1">↑ +18% vs yesterday</p>
            </div>
            <Shield size={32} className="text-cyber-green opacity-50" />
          </div>
        </GlowingCard>
        
        <GlowingCard glowColor="cyan">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Detection Rate</p>
              <p className="text-2xl font-bold text-cyber-neon">98.7%</p>
              <p className="text-xs text-cyber-green mt-1">↑ +2.1% improvement</p>
            </div>
            <Target size={32} className="text-cyber-neon opacity-50" />
          </div>
        </GlowingCard>
        
        <GlowingCard glowColor="purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Threats</p>
              <p className="text-2xl font-bold text-cyber-purple">12</p>
              <p className="text-xs text-cyber-red mt-1">↓ -3% decreasing</p>
            </div>
            <Activity size={32} className="text-cyber-purple opacity-50" />
          </div>
        </GlowingCard>
      </div>

      {/* Threat Trend Chart */}
      <GlowingCard glowColor="cyan">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <TrendingUp size={20} className="text-cyber-neon" />
            <h3 className="text-lg font-semibold">Threat Detection Trend</h3>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyber-red" />
              <span className="text-xs text-gray-400">Detected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyber-green" />
              <span className="text-xs text-gray-400">Blocked</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ThreatLineChart 
            data={threatTrendData} 
            dataKey1="threats" 
            dataKey2="blocked"
            color1="#ff0040" 
            color2="#00ff88"
          />
        </div>
      </GlowingCard>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Distribution */}
        <GlowingCard glowColor="purple">
          <h3 className="text-lg font-semibold mb-4">Threat Distribution by Type</h3>
          <div className="space-y-4">
            {threatTypesData.map((type, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{type.name}</span>
                  <span className="text-cyber-neon">{type.value}%</span>
                </div>
                <div className="w-full h-2 bg-cyber-navy rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${type.value}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: type.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlowingCard>

        {/* Severity Distribution */}
        <GlowingCard glowColor="red">
          <h3 className="text-lg font-semibold mb-4">Threats by Severity</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-cyber-navy/30">
              <p className="text-2xl font-bold text-cyber-red">124</p>
              <p className="text-xs text-gray-400">Critical</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyber-navy/30">
              <p className="text-2xl font-bold text-orange-500">356</p>
              <p className="text-xs text-gray-400">High</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyber-navy/30">
              <p className="text-2xl font-bold text-yellow-500">489</p>
              <p className="text-xs text-gray-400">Medium</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyber-navy/30">
              <p className="text-2xl font-bold text-cyber-green">278</p>
              <p className="text-xs text-gray-400">Low</p>
            </div>
          </div>
        </GlowingCard>
      </div>

      {/* Recent Threats Table */}
      <GlowingCard glowColor="cyan">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <Clock size={20} className="text-cyber-neon" />
            <h3 className="text-lg font-semibold">Recent Threats</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-1 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon text-sm"
            >
              <option value="all">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-cyber-neon/20">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Time</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Threat Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Severity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Source IP</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Confidence</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat, index) => (
                <tr key={threat.id} className="border-b border-cyber-neon/10 hover:bg-cyber-neon/5 transition-all">
                  <td className="py-3 px-4 text-xs font-mono text-gray-400">
                    {new Date(threat.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4 text-sm font-mono">{threat.name}</td>
                  <td className="py-3 px-4 text-sm">{threat.type}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${severityColors[threat.severity]}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono">{threat.source}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs ${
                      threat.status === 'Blocked' ? 'text-cyber-green' :
                      threat.status === 'Quarantined' ? 'text-cyber-neon' :
                      threat.status === 'Analyzing' ? 'text-yellow-500' : 'text-gray-400'
                    }`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-12 h-1.5 bg-cyber-navy rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyber-green rounded-full"
                          style={{ width: `${threat.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs">{threat.confidence.toFixed(0)}%</span>
                    </div>
                   </td>
                  <td className="py-3 px-4">
                    <button className="p-1 rounded hover:bg-cyber-neon/20 transition-all">
                      <Eye size={14} className="text-cyber-neon" />
                    </button>
                   </td>
                </tr>
              ))}
            </tbody>
           </table>
        </div>

        {/* Summary Footer */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-cyber-neon/20">
          <p className="text-xs text-gray-400">
            Showing {filteredThreats.length} of {recentThreats.length} threats
          </p>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span className="text-xs text-cyber-green">Live Monitoring Active</span>
          </div>
        </div>
      </GlowingCard>
    </div>
  )
}