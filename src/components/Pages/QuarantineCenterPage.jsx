import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Trash2, Check, X, Eye, AlertTriangle } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'
import { useAlert } from '../UI/AlertSystem'

// Inline mock data
const quarantinedItems = [
  { id: 1, name: 'invoice_2024.pdf.exe', type: 'Ransomware', severity: 'critical', size: '234 KB', date: '2024-01-15', risk: 98 },
  { id: 2, name: 'document_encrypted.doc', type: 'Filecoder', severity: 'high', size: '1.2 MB', date: '2024-01-14', risk: 95 },
  { id: 3, name: 'setup_installer.exe', type: 'Trojan', severity: 'medium', size: '4.5 MB', date: '2024-01-13', risk: 87 },
  { id: 4, name: 'backup_restore.zip', type: 'Suspicious', severity: 'low', size: '890 KB', date: '2024-01-12', risk: 65 },
  { id: 5, name: 'system_update.msi', type: 'Worm', severity: 'high', size: '2.1 MB', date: '2024-01-11', risk: 91 },
]

export default function QuarantineCenterPage() {
  const { addAlert } = useAlert()
  const [items, setItems] = useState(quarantinedItems)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleAction = (id, action) => {
    const item = items.find(i => i.id === id)
    addAlert(`${action} performed on ${item.name}`, action === 'Delete' ? 'warning' : 'success')
    if (action === 'Delete') {
      setItems(items.filter(i => i.id !== id))
    } else if (action === 'Restore') {
      addAlert(`File ${item.name} restored to original location`, 'success')
      setItems(items.filter(i => i.id !== id))
    }
  }

  const handleCleanAll = () => {
    addAlert(`All ${items.length} quarantined items have been cleaned`, 'warning')
    setItems([])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield size={32} className="text-cyber-red" />
          <h1 className="text-3xl font-bold">Quarantine Center</h1>
        </div>
        <button 
          onClick={handleCleanAll}
          className="px-4 py-2 bg-cyber-red/10 rounded-lg hover:bg-cyber-red/20 transition-all"
        >
          <Trash2 size={16} className="inline mr-2" />
          Clean All ({items.length})
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowingCard glowColor="red">
          <div className="text-center">
            <p className="text-2xl font-bold">{items.length}</p>
            <p className="text-xs text-gray-400">Total Quarantined</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="purple">
          <div className="text-center">
            <p className="text-2xl font-bold">{items.filter(i => i.severity === 'critical').length}</p>
            <p className="text-xs text-gray-400">Critical Threats</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="cyan">
          <div className="text-center">
            <p className="text-2xl font-bold">98.7%</p>
            <p className="text-xs text-gray-400">Detection Accuracy</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="green">
          <div className="text-center">
            <p className="text-2xl font-bold">1.2s</p>
            <p className="text-xs text-gray-400">Avg Response Time</p>
          </div>
        </GlowingCard>
      </div>

      {/* Quarantine Table */}
      <GlowingCard glowColor="red">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-cyber-neon/20">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-gray-400">File Name</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Severity</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Risk Score</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Size</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Date</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    <Shield size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No quarantined items</p>
                    <p className="text-xs mt-1">All clean!</p>
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-cyber-neon/10 hover:bg-cyber-neon/5"
                  >
                    <td className="py-3 px-4 text-sm font-mono">{item.name}</td>
                    <td className="py-3 px-4 text-sm">{item.type}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.severity === 'critical' ? 'bg-cyber-red/20 text-cyber-red' :
                        item.severity === 'high' ? 'bg-orange-500/20 text-orange-500' :
                        item.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-cyber-green/20 text-cyber-green'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-1.5 bg-cyber-navy rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyber-red rounded-full"
                            style={{ width: `${item.risk}%` }}
                          />
                        </div>
                        <span className="text-xs">{item.risk}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{item.size}</td>
                    <td className="py-3 px-4 text-sm">{item.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction(item.id, 'Restore')}
                          className="p-1 rounded hover:bg-cyber-green/20 transition-all"
                          title="Restore"
                        >
                          <Check size={16} className="text-cyber-green" />
                        </button>
                        <button
                          onClick={() => handleAction(item.id, 'Delete')}
                          className="p-1 rounded hover:bg-cyber-red/20 transition-all"
                          title="Delete"
                        >
                          <X size={16} className="text-cyber-red" />
                        </button>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1 rounded hover:bg-cyber-neon/20 transition-all"
                          title="Analyze"
                        >
                          <Eye size={16} className="text-cyber-neon" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlowingCard>

      {/* Analysis Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-strong rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Threat Analysis Report</h3>
              <button onClick={() => setSelectedItem(null)} className="hover:text-cyber-neon">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between p-2 rounded bg-cyber-navy/50">
                <span className="text-gray-400">File:</span>
                <span className="font-mono text-sm">{selectedItem.name}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-cyber-navy/50">
                <span className="text-gray-400">Type:</span>
                <span>{selectedItem.type}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-cyber-navy/50">
                <span className="text-gray-400">Severity:</span>
                <span className={`font-bold ${
                  selectedItem.severity === 'critical' ? 'text-cyber-red' :
                  selectedItem.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                }`}>{selectedItem.severity.toUpperCase()}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-cyber-navy/50">
                <span className="text-gray-400">Risk Score:</span>
                <span className="text-cyber-red font-bold">{selectedItem.risk}%</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-cyber-navy/50">
                <span className="text-gray-400">Detection Method:</span>
                <span>AI Behavioral Analysis</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-cyber-navy/50">
                <span className="text-gray-400">Confidence:</span>
                <span className="text-cyber-green">98.7%</span>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-lg hover:shadow-lg transition-all">
                Generate Full Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}