import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { Brain, TrendingUp, Activity, Target, Shield, ChevronRight } from 'lucide-react'

const predictionData = [
  { time: '00:00', threats: 12, anomalies: 8 },
  { time: '04:00', threats: 8, anomalies: 5 },
  { time: '08:00', threats: 18, anomalies: 12 },
  { time: '12:00', threats: 25, anomalies: 18 },
  { time: '16:00', threats: 32, anomalies: 24 },
  { time: '20:00', threats: 28, anomalies: 20 },
]

const anomalyData = [
  { name: 'Normal', value: 65, color: '#00ff88' },
  { name: 'Suspicious', value: 25, color: '#00f3ff' },
  { name: 'Malicious', value: 10, color: '#ff0040' },
]

const featuresData = [
  { name: 'File Entropy', value: 85, color: '#00f3ff' },
  { name: 'Process Behavior', value: 92, color: '#b000ff' },
  { name: 'Network Anomaly', value: 78, color: '#ff0040' },
  { name: 'Registry Changes', value: 65, color: '#00ff88' },
]

export default function AIAnalytics() {
  const [confidence, setConfidence] = useState(98.7)
  const [attackProbability, setAttackProbability] = useState(23)
  const [selectedMetric, setSelectedMetric] = useState('threats')

  useEffect(() => {
    const interval = setInterval(() => {
      setConfidence(prev => Math.max(85, Math.min(99, prev + (Math.random() - 0.5) * 0.3)))
      setAttackProbability(prev => Math.max(5, Math.min(45, prev + (Math.random() - 0.5) * 1.5)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0a0a1f] border border-cyan-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-xs text-gray-400 mb-1">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-sm" style={{ color: p.color }}>
              {p.name}: {p.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Threat Prediction Graph */}
      <div className="rounded-2xl p-5 transition-all duration-300 hover:shadow-xl" style={{
        background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
        border: '1px solid rgba(176, 0, 255, 0.2)'
      }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Threat Prediction</h3>
              <p className="text-xs text-gray-500">AI-powered threat forecasting</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Attack Probability</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold text-red-400">{attackProbability.toFixed(1)}</p>
              <p className="text-sm text-gray-500">%</p>
            </div>
            <div className="w-20 h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: `${attackProbability}%` }} />
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={predictionData}>
            <defs>
              <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff0040" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#ff0040" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3a" />
            <XAxis dataKey="time" stroke="#666" fontSize={11} />
            <YAxis stroke="#666" fontSize={11} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="threats" name="Threats" stroke="#ff0040" fill="url(#threatGradient)" />
            <Area type="monotone" dataKey="anomalies" name="Anomalies" stroke="#00f3ff" fill="url(#anomalyGradient)" />
          </AreaChart>
        </ResponsiveContainer>
        
        <div className="flex justify-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs text-gray-500">Predicted Threats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-xs text-gray-500">Anomalies</span>
          </div>
        </div>
      </div>

      {/* Behavioral Anomaly Score */}
      <div className="rounded-2xl p-5 transition-all duration-300 hover:shadow-xl" style={{
        background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
        border: '1px solid rgba(0, 243, 255, 0.2)'
      }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
              <Brain size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Behavioral Analysis</h3>
              <p className="text-xs text-gray-500">AI confidence score</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">AI Confidence</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {confidence.toFixed(1)}%
            </p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={anomalyData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {anomalyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              iconType="circle"
              wrapperStyle={{ fontSize: '11px', color: '#888' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Analysis */}
      <div className="lg:col-span-2 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl" style={{
        background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
        border: '1px solid rgba(255, 0, 64, 0.2)'
      }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
              <Target size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Feature Importance Analysis</h3>
              <p className="text-xs text-gray-500">Key indicators for threat detection</p>
            </div>
          </div>
          <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
            View Details <ChevronRight size={12} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={featuresData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a3a" />
              <XAxis type="number" domain={[0, 100]} stroke="#666" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="#666" fontSize={11} width={100} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#00f3ff" radius={[0, 4, 4, 0]}>
                {featuresData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300">Model Version</span>
                <span className="text-sm font-mono text-cyan-400">v2.1.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Last Training</span>
                <span className="text-sm text-gray-400">Jan 15, 2024</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <p className="text-xs text-gray-500">Precision</p>
                <p className="text-sm font-semibold text-cyan-400">98.5%</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <p className="text-xs text-gray-500">Recall</p>
                <p className="text-sm font-semibold text-purple-400">97.8%</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <p className="text-xs text-gray-500">F1 Score</p>
                <p className="text-sm font-semibold text-green-400">98.1%</p>
              </div>
              <div className="p-2 rounded-lg bg-white/5 text-center">
                <p className="text-xs text-gray-500">AUC-ROC</p>
                <p className="text-sm font-semibold text-red-400">99.3%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}