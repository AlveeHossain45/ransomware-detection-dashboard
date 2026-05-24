import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Activity,
  Circle,
  TrendingUp,
  TrendingDown,
  Gauge
} from 'lucide-react'

const SystemHealth = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    ram: 62,
    disk: 38,
    network: 27
  })
  const [trends, setTrends] = useState({
    cpu: 'stable',
    ram: 'up',
    disk: 'down',
    network: 'up'
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 40) + 25,
        ram: Math.floor(Math.random() * 30) + 45,
        disk: Math.floor(Math.random() * 30) + 20,
        network: Math.floor(Math.random() * 40) + 15
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const MetricCard = ({ title, value, unit, icon: Icon, color, trend }) => {
    const getTrendIcon = () => {
      if (trend === 'up') return <TrendingUp size={12} className="text-red-400" />
      if (trend === 'down') return <TrendingDown size={12} className="text-green-400" />
      return null
    }
    
    return (
      <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg bg-${color}-500/20`}>
            <Icon size={18} className={`text-${color}-400`} />
          </div>
          {getTrendIcon()}
        </div>
        <p className="text-2xl font-bold text-white">
          {value}
          <span className="text-sm text-gray-500 ml-1">{unit}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">{title}</p>
        <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full bg-gradient-to-r from-${color}-500 to-${color}-400`}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-5" style={{
      background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
      border: '1px solid rgba(0, 255, 136, 0.2)'
    }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
            <Gauge size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">System Health</h2>
            <p className="text-xs text-gray-500">Performance metrics & status</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Circle size={10} className="text-green-400 fill-green-400 animate-pulse" />
          <span className="text-xs text-green-400">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          title="CPU Usage" 
          value={metrics.cpu} 
          unit="%" 
          icon={Cpu}
          color="cyan"
          trend={trends.cpu}
        />
        <MetricCard 
          title="RAM Usage" 
          value={metrics.ram} 
          unit="%" 
          icon={Cpu}
          color="purple"
          trend={trends.ram}
        />
        <MetricCard 
          title="Disk Activity" 
          value={metrics.disk} 
          unit="%" 
          icon={HardDrive}
          color="green"
          trend={trends.disk}
        />
        <MetricCard 
          title="Network Traffic" 
          value={metrics.network} 
          unit="%" 
          icon={Wifi}
          color="red"
          trend={trends.network}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
          <span className="text-xs text-gray-500">AI Model Performance</span>
          <span className="text-xs font-mono text-green-400">98.7%</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
          <span className="text-xs text-gray-500">Detection Rate</span>
          <span className="text-xs font-mono text-green-400">99.2%</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
          <span className="text-xs text-gray-500">False Positive Rate</span>
          <span className="text-xs font-mono text-cyan-400">0.8%</span>
        </div>
      </div>
    </div>
  )
}

export default SystemHealth