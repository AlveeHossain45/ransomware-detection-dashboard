import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, X, Zap } from 'lucide-react'

const AlertContext = createContext()

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])

  const addAlert = (message, type = 'info') => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, message, type }])
    setTimeout(() => removeAlert(id), 5000)
  }

  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        <AnimatePresence>
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`glass-strong rounded-lg p-4 min-w-[300px] border-l-4 ${
                alert.type === 'critical' ? 'border-cyber-red' :
                alert.type === 'warning' ? 'border-yellow-500' :
                alert.type === 'success' ? 'border-cyber-green' : 'border-cyber-neon'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {alert.type === 'critical' && <AlertTriangle className="text-cyber-red" size={20} />}
                  {alert.type === 'warning' && <AlertTriangle className="text-yellow-500" size={20} />}
                  {alert.type === 'success' && <CheckCircle className="text-cyber-green" size={20} />}
                  {alert.type === 'info' && <Info className="text-cyber-neon" size={20} />}
                  <p className="text-sm">{alert.message}</p>
                </div>
                <button onClick={() => removeAlert(alert.id)} className="text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  )
}

export const showAlert = (message, type) => {
  const event = new CustomEvent('showAlert', { detail: { message, type } })
  window.dispatchEvent(event)
}