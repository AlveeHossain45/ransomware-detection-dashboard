import React, { useState } from 'react'
import { FileText, Search, Filter, Download, Calendar, AlertTriangle, Shield, Eye } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'

// Inline mock data generation
const generateMockThreats = (count = 25) => {
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
  return threats.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
}

export default function ThreatLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const threats = generateMockThreats(25)

  const types = [...new Set(threats.map(t => t.type))]
  const severities = ['Critical', 'High', 'Medium', 'Low']

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          threat.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          threat.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === 'all' || threat.severity === filterSeverity
    const matchesType = filterType === 'all' || threat.type === filterType
    return matchesSearch && matchesSeverity && matchesType
  })

  const severityColors = {
    Critical: 'bg-cyber-red/20 text-cyber-red',
    High: 'bg-orange-500/20 text-orange-500',
    Medium: 'bg-yellow-500/20 text-yellow-500',
    Low: 'bg-cyber-green/20 text-cyber-green'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <FileText size={32} className="text-cyber-neon" />
          <h1 className="text-3xl font-bold">Threat Logs</h1>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-lg hover:shadow-lg transition-all">
          <Download size={16} className="inline mr-2" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlowingCard glowColor="red">
          <div className="text-center">
            <AlertTriangle size={24} className="mx-auto mb-2 text-cyber-red" />
            <p className="text-2xl font-bold">{filteredThreats.length}</p>
            <p className="text-xs text-gray-400">Total Logs</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="purple">
          <div className="text-center">
            <AlertTriangle size={24} className="mx-auto mb-2 text-cyber-purple" />
            <p className="text-2xl font-bold">{filteredThreats.filter(t => t.severity === 'Critical').length}</p>
            <p className="text-xs text-gray-400">Critical</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="cyan">
          <div className="text-center">
            <Calendar size={24} className="mx-auto mb-2 text-cyber-neon" />
            <p className="text-2xl font-bold">24h</p>
            <p className="text-xs text-gray-400">Time Range</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="green">
          <div className="text-center">
            <Shield size={24} className="mx-auto mb-2 text-cyber-green" />
            <p className="text-2xl font-bold">98.7%</p>
            <p className="text-xs text-gray-400">Detection Rate</p>
          </div>
        </GlowingCard>
      </div>

      <GlowingCard glowColor="cyan">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search threats, IPs, or targets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon transition-all"
              />
            </div>
          </div>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-4 py-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon"
          >
            <option value="all">All Severities</option>
            {severities.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon"
          >
            <option value="all">All Types</option>
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <Filter size={20} className="text-gray-400 self-center" />
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-cyber-deeper border-b border-cyber-neon/20">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Threat Name</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Severity</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Source</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Target</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Confidence</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat) => (
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
                  <td className="py-3 px-4 text-sm font-mono">{threat.target}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs ${
                      threat.status === 'Blocked' ? 'text-cyber-green' :
                      threat.status === 'Quarantined' ? 'text-cyber-neon' :
                      threat.status === 'Analyzing' ? 'text-yellow-500' : 'text-gray-400'
                    }`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{threat.confidence.toFixed(1)}%</td>
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

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-cyber-neon/20">
          <p className="text-xs text-gray-400">Showing {filteredThreats.length} of {threats.length} logs</p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 rounded bg-cyber-navy/50 text-sm hover:bg-cyber-neon/20 transition-all">Previous</button>
            <button className="px-3 py-1 rounded bg-cyber-neon/20 text-sm">1</button>
            <button className="px-3 py-1 rounded bg-cyber-navy/50 text-sm hover:bg-cyber-neon/20 transition-all">2</button>
            <button className="px-3 py-1 rounded bg-cyber-navy/50 text-sm hover:bg-cyber-neon/20 transition-all">3</button>
            <button className="px-3 py-1 rounded bg-cyber-navy/50 text-sm hover:bg-cyber-neon/20 transition-all">Next</button>
          </div>
        </div>
      </GlowingCard>
    </div>
  )
}