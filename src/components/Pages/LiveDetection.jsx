import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Activity, AlertCircle, Eye, EyeOff } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'

export default function LiveDetection() {
  const [logs, setLogs] = useState([])
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      const types = ['Ransomware', 'Trojan', 'Worm', 'Spyware']
      const newLog = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        severity: ['Critical', 'High', 'Medium', 'Low'][Math.floor(Math.random() * 4)],
        message: `Suspicious ${types[Math.floor(Math.random() * types.length)]} activity detected`,
        source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        time: 'Just now'
      }
      setLogs(prev => [newLog, ...prev.slice(0, 49)])
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap size={32} className="text-cyber-neon" />
          <h1 className="text-3xl font-bold">Live Detection</h1>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
            isLive ? 'bg-cyber-green/20 text-cyber-green' : 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {isLive ? <Eye size={16} /> : <EyeOff size={16} />}
          <span>{isLive ? 'Live Mode Active' : 'Paused'}</span>
        </button>
      </div>

      <GlowingCard glowColor={isLive ? 'red' : 'gray'}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity size={20} className="text-cyber-neon" />
            <h3 className="text-lg font-semibold">Real-time Detection Feed</h3>
            {isLive && (
              <div className="flex space-x-1 ml-2">
                <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse delay-150" />
                <div className="w-2 h-2 bg-cyber-red rounded-full animate-pulse delay-300" />
              </div>
            )}
          </div>
          <span className="text-xs text-gray-400">Auto-refreshing every 3s</span>
        </div>

        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          <AnimatePresence>
            {logs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Zap size={48} className="mx-auto mb-3 opacity-30" />
                <p>Waiting for detections...</p>
                <p className="text-xs mt-2">Enable live mode to start monitoring</p>
              </div>
            ) : (
              logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.02 }}
                  className={`p-3 rounded-lg border ${
                    log.severity === 'Critical' ? 'border-cyber-red/30 bg-cyber-red/10' :
                    log.severity === 'High' ? 'border-orange-500/30 bg-orange-500/10' :
                    'border-cyber-neon/10 bg-cyber-navy/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <AlertCircle size={16} className={
                        log.severity === 'Critical' ? 'text-cyber-red' :
                        log.severity === 'High' ? 'text-orange-500' : 'text-cyber-neon'
                      } />
                      <div className="flex-1">
                        <p className="text-sm">{log.message}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{log.time}</span>
                          <span className="text-xs text-cyber-neon/60">{log.source}</span>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            log.severity === 'Critical' ? 'bg-cyber-red/20 text-cyber-red' :
                            log.severity === 'High' ? 'bg-orange-500/20 text-orange-500' :
                            log.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-cyber-green/20 text-cyber-green'
                          }`}>
                            {log.severity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </GlowingCard>
    </div>
  )
}