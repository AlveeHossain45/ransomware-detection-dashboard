import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Zap, AlertCircle, Eye, EyeOff, Shield, Clock } from 'lucide-react'

const initialLogs = [
  { id: 1, type: 'warning', message: 'Suspicious file rename detected: document.pdf.exe', time: 'Just now', process: 'explorer.exe', confidence: 87, source: '192.168.1.105' },
  { id: 2, type: 'critical', message: 'Encryption attempt on C:\\Users\\Admin\\Documents', time: '12s ago', process: 'ransomware.exe', confidence: 98, source: '10.0.0.45' },
  { id: 3, type: 'info', message: 'CPU spike detected: 94% usage', time: '25s ago', process: 'system', confidence: 45, source: 'localhost' },
  { id: 4, type: 'warning', message: 'Unusual file access pattern detected', time: '38s ago', process: 'svchost.exe', confidence: 72, source: '192.168.1.23' },
  { id: 5, type: 'critical', message: 'Ransomware signature matched: WannaCry variant', time: '52s ago', process: 'tasksche.exe', confidence: 99, source: '10.0.0.89' },
]

export default function LiveMonitoring() {
  const [logs, setLogs] = useState(initialLogs)
  const [isLive, setIsLive] = useState(true)
  const [stats, setStats] = useState({ critical: 0, warning: 0, info: 0 })

  useEffect(() => {
    const critical = logs.filter(l => l.type === 'critical').length
    const warning = logs.filter(l => l.type === 'warning').length
    const info = logs.filter(l => l.type === 'info').length
    setStats({ critical, warning, info })
  }, [logs])

  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      const types = ['info', 'warning', 'critical']
      const messages = [
        'New suspicious network connection detected',
        'File entropy analysis triggered',
        'Behavioral anomaly detected in memory',
        'Registry modification attempt blocked',
        'Unusual process injection detected',
        'Suspicious PowerShell command executed',
        'Potential ransomware behavior detected'
      ]
      const sources = ['192.168.1.100', '10.0.0.50', '172.16.0.25', '8.8.8.8', 'unknown']
      
      const newLog = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * 3)],
        message: messages[Math.floor(Math.random() * messages.length)],
        time: 'Just now',
        process: `process_${Math.floor(Math.random() * 1000)}.exe`,
        confidence: 50 + Math.random() * 45,
        source: sources[Math.floor(Math.random() * sources.length)]
      }
      setLogs(prev => [newLog, ...prev.slice(0, 49)])
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const getTypeStyles = (type) => {
    switch(type) {
      case 'critical':
        return { 
          bg: 'bg-gradient-to-r from-red-600/10 to-red-500/5', 
          border: 'border-red-500/30', 
          icon: 'text-red-400',
          badge: 'bg-red-500/20 text-red-400'
        }
      case 'warning':
        return { 
          bg: 'bg-gradient-to-r from-yellow-600/10 to-orange-500/5', 
          border: 'border-yellow-500/30', 
          icon: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-400'
        }
      default:
        return { 
          bg: 'bg-gradient-to-r from-cyan-600/10 to-purple-500/5', 
          border: 'border-cyan-500/30', 
          icon: 'text-cyan-400',
          badge: 'bg-cyan-500/20 text-cyan-400'
        }
    }
  }

  return (
    <div className="mb-8 rounded-2xl overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
      border: '1px solid rgba(0, 243, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-3 mb-3 sm:mb-0">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500">
            <Activity size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Live Threat Monitoring</h2>
            <p className="text-xs text-gray-500">Real-time threat intelligence feed</p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-xs text-gray-500 font-mono">{isLive ? 'LIVE STREAM' : 'PAUSED'}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Stats badges */}
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">{stats.critical} Critical</span>
            <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">{stats.warning} Warning</span>
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400">{stats.info} Info</span>
          </div>
          
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2 ${
              isLive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            {isLive ? <Eye size={14} /> : <EyeOff size={14} />}
            {isLive ? 'Live Mode' : 'Paused'}
          </button>
        </div>
      </div>

      {/* Logs Feed */}
      <div className="p-4 space-y-2 max-h-[450px] overflow-y-auto">
        <AnimatePresence>
          {logs.map((log, index) => {
            const styles = getTypeStyles(log.type)
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: Math.min(index * 0.02, 0.5) }}
                className={`p-3 rounded-xl border ${styles.bg} ${styles.border} transition-all hover:scale-[1.01] hover:shadow-lg`}
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className={`${styles.icon} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{log.message}</p>
                    <div className="flex items-center gap-4 mt-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-gray-500" />
                        <span className="text-xs text-gray-500">{log.time}</span>
                      </div>
                      <span className="text-xs font-mono text-gray-600">{log.process}</span>
                      <span className="text-xs font-mono text-gray-600">{log.source}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                            style={{ width: `${log.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-cyan-400">{Math.round(log.confidence)}%</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${styles.badge}`}>
                        {log.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <Zap size={12} className="text-cyan-400 animate-pulse flex-shrink-0" />
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
        
        {logs.length === 0 && (
          <div className="text-center py-12">
            <Shield size={48} className="mx-auto mb-3 text-gray-600" />
            <p className="text-gray-500">No threats detected</p>
            <p className="text-xs text-gray-600 mt-1">System is secure</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-cyan-400" />
          <span className="text-xs text-gray-500">AI Protection • Active</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">{logs.length} events monitored</span>
          </div>
          <div className="text-xs text-gray-600 font-mono">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>
    </div>
  )
}