import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  FileCode, 
  Lock, 
  TrendingUp, 
  Activity,
  ArrowUp,
  ArrowDown,
  Zap,
  Cpu
} from 'lucide-react'

const stats = [
  { 
    icon: AlertTriangle, 
    label: 'Threats Detected', 
    value: '1,247', 
    change: '+23%', 
    trend: 'up',
    color: '#ff0040',
    gradient: 'from-red-500/20 to-red-600/10'
  },
  { 
    icon: FileCode, 
    label: 'Suspicious Processes', 
    value: '89', 
    change: '+12%', 
    trend: 'up',
    color: '#b000ff',
    gradient: 'from-purple-500/20 to-purple-600/10'
  },
  { 
    icon: Lock, 
    label: 'Encryption Attempts', 
    value: '43', 
    change: '-5%', 
    trend: 'down',
    color: '#00ff88',
    gradient: 'from-green-500/20 to-green-600/10'
  },
  { 
    icon: TrendingUp, 
    label: 'Risk Score', 
    value: '67', 
    change: '+8%', 
    trend: 'up',
    color: '#ff0040',
    gradient: 'from-red-500/20 to-red-600/10'
  },
  { 
    icon: Shield, 
    label: 'Blocked Attacks', 
    value: '1,203', 
    change: '+18%', 
    trend: 'up',
    color: '#00ff88',
    gradient: 'from-green-500/20 to-green-600/10'
  },
  { 
    icon: Activity, 
    label: 'Active Monitoring', 
    value: '24/7', 
    change: 'Active', 
    trend: 'neutral',
    color: '#00f3ff',
    gradient: 'from-cyan-500/20 to-cyan-600/10'
  }
]

export default function HeroStats() {
  return (
    <div className="mb-8">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8 p-6 md:p-8 rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 243, 255, 0.08) 0%, rgba(176, 0, 255, 0.08) 50%, rgba(255, 0, 64, 0.08) 100%)',
          border: '1px solid rgba(0, 243, 255, 0.15)'
        }}
      >
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,243,255,0.1) 0%, transparent 50%)'
        }} />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
                <Zap className="text-white" size={24} />
              </div>
              <span className="text-xs font-mono text-cyan-400 tracking-wider bg-cyan-400/10 px-2 py-1 rounded-full">
                AI-POWERED SECURITY
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                XAI-RDS
              </span>
              <span className="text-white ml-2">Threat Detection</span>
            </h1>
            <p className="text-gray-400 text-sm max-w-lg">
              Real-time ransomware monitoring with explainable AI. 
              Advanced behavioral analysis and zero-day threat protection.
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">Detection Confidence</p>
              <div className="flex items-baseline gap-1">
                <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  98.7
                </p>
                <p className="text-lg text-gray-400">%</p>
              </div>
              <p className="text-xs text-green-400 mt-1">↑ +2.1% from last week</p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Cpu size={28} className="text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-red-500" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative overflow-hidden rounded-xl p-4 cursor-pointer transition-all duration-300`}
            style={{
              background: `linear-gradient(135deg, ${stat.color}08 0%, ${stat.color}04 100%)`,
              border: `1px solid ${stat.color}20`,
            }}
          >
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg`} style={{ background: `${stat.color}20` }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                {stat.trend !== 'neutral' && (
                  <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                    stat.trend === 'up' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp size={10} /> : <ArrowDown size={10} />}
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300" 
                 style={{ background: `linear-gradient(135deg, ${stat.color}10 0%, transparent 100%)` }} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}