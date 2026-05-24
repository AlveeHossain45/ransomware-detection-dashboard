import React from 'react'
import { FileText, Eye, Download, Trash2, AlertTriangle, Shield } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'

// Inline mock data
const mockFileActivities = [
  { id: 1, file: 'document.pdf.exe', action: 'CREATE', path: '/Users/Admin/Downloads', risk: 95, timestamp: new Date().toISOString() },
  { id: 2, file: 'backup.zip.encrypted', action: 'MODIFY', path: '/Users/Admin/Documents', risk: 88, timestamp: new Date().toISOString() },
  { id: 3, file: 'system32.dll', action: 'READ', path: '/Windows/System32', risk: 76, timestamp: new Date().toISOString() },
  { id: 4, file: 'config.exe', action: 'EXECUTE', path: '/Temp', risk: 92, timestamp: new Date().toISOString() },
  { id: 5, file: 'personal_data.xlsx', action: 'ENCRYPT', path: '/Users/Admin/Desktop', risk: 99, timestamp: new Date().toISOString() }
]

export default function FileActivityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <FileText size={32} className="text-cyber-neon" />
        <h1 className="text-3xl font-bold">File Activity Monitor</h1>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlowingCard glowColor="red">
          <div className="text-center">
            <AlertTriangle size={24} className="mx-auto mb-2 text-cyber-red" />
            <p className="text-2xl font-bold">{mockFileActivities.filter(f => f.risk > 90).length}</p>
            <p className="text-xs text-gray-400">High Risk Files</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="cyan">
          <div className="text-center">
            <FileText size={24} className="mx-auto mb-2 text-cyber-neon" />
            <p className="text-2xl font-bold">{mockFileActivities.length}</p>
            <p className="text-xs text-gray-400">Total Activities</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="green">
          <div className="text-center">
            <Shield size={24} className="mx-auto mb-2 text-cyber-green" />
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-xs text-gray-400">Continuous Monitoring</p>
          </div>
        </GlowingCard>
      </div>

      {/* File Activity Table */}
      <GlowingCard glowColor="cyan">
        <h3 className="text-lg font-semibold mb-4">Recent File Activities</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-cyber-neon/20">
              <tr>
                <th className="text-left py-3 px-4 text-xs text-gray-400">File Name</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Action</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Path</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Risk Score</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockFileActivities.map((file) => (
                <tr key={file.id} className="border-b border-cyber-neon/10 hover:bg-cyber-neon/5">
                  <td className="py-3 px-4 text-sm font-mono">{file.file}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      file.action === 'ENCRYPT' ? 'bg-cyber-red/20 text-cyber-red' :
                      file.action === 'EXECUTE' ? 'bg-orange-500/20 text-orange-500' :
                      file.action === 'CREATE' ? 'bg-cyber-green/20 text-cyber-green' :
                      'bg-cyber-neon/20 text-cyber-neon'
                    }`}>
                      {file.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{file.path}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-cyber-navy rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyber-red rounded-full"
                          style={{ width: `${file.risk}%` }}
                        />
                      </div>
                      <span className="text-xs">{file.risk}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">
                    {new Date(file.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="p-1 rounded hover:bg-cyber-neon/20 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="p-1 rounded hover:bg-cyber-green/20 transition-all">
                        <Download size={14} />
                      </button>
                      <button className="p-1 rounded hover:bg-cyber-red/20 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowingCard>
    </div>
  )
}