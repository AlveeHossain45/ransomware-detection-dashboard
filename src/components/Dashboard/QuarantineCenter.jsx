import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trash2, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Download, 
  X, 
  Check,
  Eye,
  Clock
} from 'lucide-react'
import { useAlert } from '../UI/AlertSystem'

const quarantinedFiles = [
  { id: 1, name: 'invoice_2024.pdf.exe', type: 'Ransomware', severity: 'critical', size: '234 KB', date: '2024-01-15', risk: 98, hash: 'a3f5c8e9d2b1a4c7' },
  { id: 2, name: 'document_encrypted.doc', type: 'Filecoder', severity: 'high', size: '1.2 MB', date: '2024-01-14', risk: 95, hash: 'b4c6d9e0f1a2b3c8' },
  { id: 3, name: 'setup_installer.exe', type: 'Trojan', severity: 'medium', size: '4.5 MB', date: '2024-01-13', risk: 87, hash: 'c5d7e0f1a2b3c4d9' },
  { id: 4, name: 'backup_restore.zip', type: 'Suspicious', severity: 'low', size: '890 KB', date: '2024-01-12', risk: 65, hash: 'd6e8f1a2b3c4d5e0' },
]

export default function QuarantineCenter() {
  const { addAlert } = useAlert()
  const [files, setFiles] = useState(quarantinedFiles)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleAction = (fileId, action) => {
    const file = files.find(f => f.id === fileId)
    addAlert(`${action} action performed on ${file.name}`, action === 'Delete' ? 'warning' : 'success')
    
    if (action === 'Delete') {
      setFiles(files.filter(f => f.id !== fileId))
    } else if (action === 'Restore') {
      addAlert(`File ${file.name} restored to original location`, 'success')
      setFiles(files.filter(f => f.id !== fileId))
    }
  }

  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-500/20 text-red-400'
      case 'high': return 'bg-orange-500/20 text-orange-400'
      case 'medium': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-green-500/20 text-green-400'
    }
  }

  return (
    <div className="mb-8 rounded-2xl p-5" style={{
      background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
      border: '1px solid rgba(255, 0, 64, 0.2)'
    }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Quarantine Center</h2>
            <p className="text-xs text-gray-500">Isolated threats awaiting action</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-cyan-500/20 rounded-lg text-xs text-cyan-400 hover:bg-cyan-500/30 transition-all flex items-center gap-1">
            <Download size={12} />
            Export Report
          </button>
          <button className="px-3 py-1.5 bg-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/30 transition-all flex items-center gap-1">
            <Trash2 size={12} />
            Clean All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/10">
            <tr>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">File Name</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Type</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Severity</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Risk</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Size</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-3 text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <motion.tr
                key={file.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-all"
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-cyan-400" />
                    <span className="text-sm font-mono text-gray-300">{file.name}</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-sm text-gray-400">{file.type}</td>
                <td className="py-3 px-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBadge(file.severity)}`}>
                    {file.severity}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        style={{ width: `${file.risk}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{file.risk}%</span>
                  </div>
                </td>
                <td className="py-3 px-3 text-sm text-gray-400">{file.size}</td>
                <td className="py-3 px-3 text-sm text-gray-400">{file.date}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleAction(file.id, 'Restore')}
                      className="p-1.5 rounded-lg hover:bg-green-500/20 transition-all"
                      title="Restore"
                    >
                      <Check size={14} className="text-green-400" />
                    </button>
                    <button
                      onClick={() => handleAction(file.id, 'Delete')}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 transition-all"
                      title="Delete"
                    >
                      <X size={14} className="text-red-400" />
                    </button>
                    <button
                      onClick={() => setSelectedFile(file)}
                      className="p-1.5 rounded-lg hover:bg-cyan-500/20 transition-all"
                      title="Analyze"
                    >
                      <Eye size={14} className="text-cyan-400" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analysis Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelectedFile(null)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-premium rounded-xl p-6 max-w-md w-full mx-4 border border-cyan-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Threat Analysis Report
              </h3>
              <button onClick={() => setSelectedFile(null)} className="p-1 rounded-lg hover:bg-white/10">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">File:</span>
                <span className="font-mono text-sm text-white">{selectedFile.name}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">Type:</span>
                <span className="text-sm text-white">{selectedFile.type}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">Severity:</span>
                <span className={`text-sm font-bold ${getSeverityBadge(selectedFile.severity)}`}>
                  {selectedFile.severity.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">Risk Score:</span>
                <span className="text-red-400 font-bold">{selectedFile.risk}%</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">File Hash:</span>
                <span className="font-mono text-xs text-cyan-400">{selectedFile.hash}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/5">
                <span className="text-gray-400 text-sm">Detection Method:</span>
                <span className="text-sm text-green-400">AI Behavioral Analysis</span>
              </div>
              <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium hover:opacity-90 transition-all">
                Generate Full Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}