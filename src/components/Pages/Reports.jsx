import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileBarChart,
  Download,
  FileText,
  Calendar,
  TrendingUp,
  Shield,
  AlertTriangle,
  Printer,
  Brain
} from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'
import { useAlert } from '../UI/AlertSystem'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const weeklyData = [
  { day: 'Mon', threats: 45, blocked: 43 },
  { day: 'Tue', threats: 52, blocked: 49 },
  { day: 'Wed', threats: 38, blocked: 37 },
  { day: 'Thu', threats: 61, blocked: 58 },
  { day: 'Fri', threats: 48, blocked: 46 },
  { day: 'Sat', threats: 32, blocked: 31 },
  { day: 'Sun', threats: 29, blocked: 28 },
]

const threatDistribution = [
  { name: 'Ransomware', value: 45, color: '#ff0040' },
  { name: 'Trojan', value: 25, color: '#ff6600' },
  { name: 'Worm', value: 15, color: '#ffaa00' },
  { name: 'Other', value: 15, color: '#00f3ff' },
]

export default function Reports() {
  const { addAlert } = useAlert()
  const [dateRange, setDateRange] = useState('week')

  const handleExport = (format) => {
    addAlert(`Report exported as ${format.toUpperCase()}`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileBarChart size={32} className="text-cyber-neon" />
          <h1 className="text-3xl font-bold">Security Reports</h1>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-lg hover:shadow-lg transition-all"
          >
            <Download size={16} className="inline mr-2" />
            Export PDF
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg hover:bg-cyber-neon/10 transition-all"
          >
            <Printer size={16} className="inline mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowingCard glowColor="red">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Threats</p>
              <p className="text-2xl font-bold">305</p>
              <p className="text-xs text-cyber-green">+12% vs last week</p>
            </div>
            <AlertTriangle size={32} className="text-cyber-red opacity-50" />
          </div>
        </GlowingCard>
        <GlowingCard glowColor="green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Blocked Attacks</p>
              <p className="text-2xl font-bold">292</p>
              <p className="text-xs text-cyber-green">95.7%成功率</p>
            </div>
            <Shield size={32} className="text-cyber-green opacity-50" />
          </div>
        </GlowingCard>
        <GlowingCard glowColor="cyan">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">AI Confidence</p>
              <p className="text-2xl font-bold">98.7%</p>
              <p className="text-xs text-cyber-green">+2.1% improvement</p>
            </div>
            <TrendingUp size={32} className="text-cyber-neon opacity-50" />
          </div>
        </GlowingCard>
        <GlowingCard glowColor="purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold">1.2s</p>
              <p className="text-xs text-cyber-green">-0.3s faster</p>
            </div>
            <Calendar size={32} className="text-cyber-purple opacity-50" />
          </div>
        </GlowingCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowingCard glowColor="cyan">
          <h3 className="text-lg font-semibold mb-4">Threat Detection Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f3f" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ background: '#0a0a1f', border: '1px solid #00f3ff' }}
              />
              <Line type="monotone" dataKey="threats" stroke="#ff0040" strokeWidth={2} />
              <Line type="monotone" dataKey="blocked" stroke="#00ff88" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </GlowingCard>

        <GlowingCard glowColor="purple">
          <h3 className="text-lg font-semibold mb-4">Threat Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0a0a1f', border: '1px solid #00f3ff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </GlowingCard>
      </div>

      {/* Detailed Report Table */}
      <GlowingCard glowColor="green">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Detailed Threat Log</h3>
          <button className="text-sm text-cyber-neon hover:text-cyber-neon/80">
            <FileText size={16} className="inline mr-1" />
            View Full Log
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-cyber-neon/20">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Threat Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Severity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Source IP</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: '2024-01-15 14:32:15', type: 'Ransomware', severity: 'Critical', source: '192.168.1.105', status: 'Blocked' },
                { time: '2024-01-15 13:28:42', type: 'Trojan', severity: 'High', source: '10.0.0.45', status: 'Quarantined' },
                { time: '2024-01-15 12:15:33', type: 'Worm', severity: 'Medium', source: '172.16.0.23', status: 'Blocked' },
              ].map((threat, idx) => (
                <tr key={idx} className="border-b border-cyber-neon/10">
                  <td className="py-3 px-4 text-sm font-mono">{threat.time}</td>
                  <td className="py-3 px-4 text-sm">{threat.type}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      threat.severity === 'Critical' ? 'bg-cyber-red/20 text-cyber-red' :
                      threat.severity === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-mono">{threat.source}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-cyber-green">{threat.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowingCard>

      {/* Generate AI Report */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-neon rounded-lg hover:shadow-xl transition-all text-lg font-semibold">
          <Brain size={20} className="inline mr-2" />
          Generate AI-Powered Report
        </button>
      </div>
    </div>
  )
}