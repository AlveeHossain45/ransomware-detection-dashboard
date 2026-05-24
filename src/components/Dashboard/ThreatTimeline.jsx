import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertTriangle, CheckCircle, Shield, ChevronDown, ChevronUp, Target } from 'lucide-react'

const timelineEvents = [
  {
    id: 1,
    time: '14:32:15',
    stage: 'Initial Detection',
    threat: 'Suspicious file behavior detected',
    action: 'AI analysis triggered',
    severity: 'high',
    details: 'File entropy spike detected in system32 directory. Multiple file rename operations in quick succession.',
    duration: '2.3s',
    expanded: false
  },
  {
    id: 2,
    time: '14:32:18',
    stage: 'AI Analysis',
    threat: 'Ransomware pattern matched',
    action: 'Behavioral quarantine initiated',
    severity: 'critical',
    details: 'Pattern matched with known ransomware family "LockBit". Encryption behavior detected.',
    duration: '1.8s',
    expanded: false
  },
  {
    id: 3,
    time: '14:32:22',
    stage: 'Containment',
    threat: 'Process isolation completed',
    action: 'Network segmentation activated',
    severity: 'medium',
    details: 'Suspicious process isolated. Network traffic blocked to C2 servers.',
    duration: '3.1s',
    expanded: false
  },
  {
    id: 4,
    time: '14:32:30',
    stage: 'Remediation',
    threat: 'Malicious files quarantined',
    action: 'System restoration in progress',
    severity: 'low',
    details: '12 malicious files moved to quarantine. Registry changes reverted.',
    duration: '5.2s',
    expanded: false
  }
]

export default function ThreatTimeline() {
  const [events, setEvents] = useState(timelineEvents)
  const [expandedId, setExpandedId] = useState(null)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  const getStageIcon = (stage) => {
    switch(stage) {
      case 'Initial Detection': return <AlertTriangle size={14} />
      case 'AI Analysis': return <Target size={14} />
      case 'Containment': return <Shield size={14} />
      default: return <CheckCircle size={14} />
    }
  }

  return (
    <div className="mb-8 rounded-2xl p-5" style={{
      background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
      border: '1px solid rgba(176, 0, 255, 0.2)'
    }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
          <Clock size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Attack Timeline</h2>
          <p className="text-xs text-gray-500">Complete incident response chronology</p>
        </div>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-red-500 rounded-full" />
        
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative mb-5 ml-12"
          >
            {/* Timeline Node */}
            <div className={`absolute -left-9 top-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${getSeverityColor(event.severity)}`}
                 style={{ background: 'rgba(10, 15, 35, 0.9)' }}>
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
            
            <div
              className={`rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                expandedId === event.id ? 'border-cyan-500/50 shadow-cyan-500/10' : 'border-white/10'
              }`}
              style={{
                background: 'rgba(20, 25, 55, 0.5)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
              onClick={() => toggleExpand(event.id)}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{event.time}</span>
                    <div className="flex items-center gap-1.5">
                      {getStageIcon(event.stage)}
                      <span className="text-xs text-cyan-400">{event.stage}</span>
                    </div>
                    <span className="text-xs text-gray-600">Duration: {event.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-white mb-1">{event.threat}</p>
                  <p className="text-xs text-gray-400">{event.action}</p>
                  
                  {expandedId === event.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 pt-3 border-t border-white/10"
                    >
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Details:</span> {event.details}
                      </p>
                      <div className="flex gap-3 mt-3">
                        <button className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                          View Full Report
                        </button>
                        <button className="text-xs px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all">
                          Export Log
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div className="ml-2">
                  {expandedId === event.id ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-green-400" />
          <span className="text-xs text-gray-500">Total Response Time: 12.4s</span>
        </div>
        <div className="text-xs text-green-400">✓ Incident Contained</div>
      </div>
    </div>
  )
}