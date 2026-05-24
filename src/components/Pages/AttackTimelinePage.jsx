import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle, ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'

// Inline mock data
const generateMockTimeline = () => {
  const events = []
  const stages = ['Initial Detection', 'AI Analysis', 'Behavioral Scan', 'Containment', 'Remediation']
  const actions = ['Alert triggered', 'Pattern matched', 'Quarantine initiated', 'Process isolated', 'System restored']
  const severities = ['low', 'medium', 'high', 'critical']
  const detailsList = [
    'Suspicious file behavior detected in system32',
    'Ransomware signature matched with known pattern',
    'Process isolated and network blocked',
    'Files moved to quarantine successfully',
    'System scan completed - no further threats'
  ]
  
  for (let i = 0; i < 8; i++) {
    events.push({
      id: i + 1,
      time: new Date(Date.now() - (8 - i) * 300000).toLocaleTimeString(),
      stage: stages[i % stages.length],
      action: actions[i % actions.length],
      severity: severities[Math.floor(Math.random() * severities.length)],
      details: detailsList[i % detailsList.length]
    })
  }
  return events
}

export default function AttackTimelinePage() {
  const [events, setEvents] = useState(generateMockTimeline())
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const severityColors = {
    low: 'bg-cyber-green/20 text-cyber-green',
    medium: 'bg-yellow-500/20 text-yellow-500',
    high: 'bg-orange-500/20 text-orange-500',
    critical: 'bg-cyber-red/20 text-cyber-red'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Clock size={32} className="text-cyber-neon" />
          <h1 className="text-3xl font-bold">Attack Timeline</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlowingCard glowColor="red">
          <div className="text-center">
            <p className="text-2xl font-bold">{events.length}</p>
            <p className="text-xs text-gray-400">Total Events</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="purple">
          <div className="text-center">
            <p className="text-2xl font-bold">{events.filter(e => e.severity === 'critical').length}</p>
            <p className="text-xs text-gray-400">Critical Events</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="cyan">
          <div className="text-center">
            <p className="text-2xl font-bold">98.7%</p>
            <p className="text-xs text-gray-400">Containment Rate</p>
          </div>
        </GlowingCard>
      </div>

      {/* Timeline */}
      <GlowingCard glowColor="purple">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-neon via-cyber-purple to-cyber-red" />
          
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative mb-6 ml-12"
            >
              <div className="absolute -left-9 top-2 w-4 h-4 rounded-full bg-cyber-navy border-2 border-cyber-neon" />
              
              <div
                className={`glass rounded-lg p-4 cursor-pointer transition-all hover:bg-cyber-neon/10
                  ${expandedId === event.id ? 'border-cyber-neon' : 'border-cyber-neon/20'} border`}
                onClick={() => toggleExpand(event.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2 flex-wrap gap-y-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${severityColors[event.severity]}`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{event.time}</span>
                      <span className="text-xs text-cyber-neon">{event.stage}</span>
                    </div>
                    <p className="font-mono text-sm">{event.action}</p>
                    {expandedId === event.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-cyber-neon/20"
                      >
                        <p className="text-sm text-gray-400">
                          <strong>Details:</strong> {event.details}
                        </p>
                        <div className="flex space-x-4 mt-3">
                          <button className="text-xs px-3 py-1 bg-cyber-neon/20 rounded hover:bg-cyber-neon/30 transition-all">
                            View Report
                          </button>
                          <button className="text-xs px-3 py-1 bg-cyber-green/20 rounded hover:bg-cyber-green/30 transition-all">
                            Export Log
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div className="ml-4">
                    {expandedId === event.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlowingCard>
    </div>
  )
}