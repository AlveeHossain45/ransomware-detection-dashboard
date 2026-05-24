import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Shield,
  Activity,
  FileText,
  Brain,
  Clock,
  Trash2,
  AlertTriangle,
  FileBarChart,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Shield, label: 'Threat Monitoring', path: '/threat-monitoring' },
  { icon: Activity, label: 'Live Detection', path: '/live-detection' },
  { icon: FileText, label: 'File Activity', path: '/file-activity' },
  { icon: Brain, label: 'AI Analytics', path: '/ai-analytics' },
  { icon: Clock, label: 'Attack Timeline', path: '/attack-timeline' },
  { icon: Trash2, label: 'Quarantine Center', path: '/quarantine' },
  { icon: AlertTriangle, label: 'Threat Logs', path: '/threat-logs' },
  { icon: FileBarChart, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: User, label: 'User Profile', path: '/profile' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative glass-strong h-screen overflow-hidden z-20"
      style={{ borderRight: '1px solid rgba(0, 243, 255, 0.2)' }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-6 border-b border-cyber-neon/20">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2"
            >
              <Zap className="text-cyber-neon" size={32} />
              <div>
                <h1 className="text-lg font-bold neon-text">XAI-RDS</h1>
                <p className="text-xs text-cyber-neon/60">v2.0.2026</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-cyber-neon/10 transition-all"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.path}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 5 }}
                className={`relative group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all cursor-pointer
                  ${isActive 
                    ? 'bg-gradient-to-r from-cyber-neon/20 to-transparent border-l-2 border-cyber-neon' 
                    : 'hover:bg-cyber-neon/10'
                  }`}
              >
                <item.icon 
                  size={20} 
                  className={isActive ? 'text-cyber-neon' : 'text-gray-400 group-hover:text-cyber-neon'} 
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-sm ${isActive ? 'text-cyber-neon' : 'text-gray-300'}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!collapsed && isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-0 w-1 h-full bg-cyber-neon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* AI Status Indicator */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className={`glass p-3 rounded-lg ${collapsed ? 'text-center' : ''}`}>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 bg-cyber-green rounded-full animate-ping" />
            </div>
            {!collapsed && (
              <span className="text-xs text-cyber-green">AI Engine Active</span>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}