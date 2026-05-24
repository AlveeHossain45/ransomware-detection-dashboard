import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Bell,
  User,
  Cpu,
  AlertTriangle,
  Moon,
  Sun,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  ChevronDown
} from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const notifications = [
    { id: 1, type: 'critical', message: 'Ransomware pattern detected', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'Unusual encryption attempt blocked', time: '5 min ago', read: false },
    { id: 3, type: 'info', message: 'AI model updated to v2.1.0', time: '15 min ago', read: true },
    { id: 4, type: 'success', message: 'System scan completed', time: '1 hour ago', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const getNotificationStyles = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-500/10 border-l-red-500'
      case 'warning': return 'bg-yellow-500/10 border-l-yellow-500'
      case 'success': return 'bg-green-500/10 border-l-green-500'
      default: return 'bg-cyan-500/10 border-l-cyan-500'
    }
  }

  return (
    <nav className="sticky top-0 z-30 backdrop-blur-xl bg-[#0a0a1f]/80 border-b border-white/5">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section - Menu Toggle & Search */}
        <div className="flex items-center gap-4">
          {/* Menu Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed?.(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar */}
          <div className={`hidden md:block transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${searchFocused ? 'text-cyan-400' : 'text-gray-500'}`} size={16} />
              <input
                type="text"
                placeholder="Search threats, files, or incidents..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-sm text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Center - Logo (Mobile) */}
        <div className="md:hidden">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
              <Shield size={16} className="text-white" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              XAI-RDS
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* AI Engine Status - Desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20">
            <div className="relative">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
            </div>
            <Cpu size={12} className="text-cyan-400" />
            <span className="text-xs text-cyan-400 font-medium">AI Active</span>
          </div>

          {/* Threat Level Badge - Desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/5 border border-red-500/20">
            <AlertTriangle size={12} className="text-red-400" />
            <span className="text-xs text-red-400 font-medium">High Alert</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full bg-red-500 text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 bg-[#0f1030] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white text-sm">Notifications</h3>
                      <button className="text-xs text-gray-500 hover:text-cyan-400 transition-colors">
                        Mark all read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer ${!notif.read ? 'bg-white/5' : ''}`}
                      >
                        <div className={`p-2 rounded-lg mb-2 ${getNotificationStyles(notif.type)} border-l-2`}>
                          <p className="text-sm text-white">{notif.message}</p>
                        </div>
                        <p className="text-xs text-gray-500">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-white/5 transition-all text-gray-400 hover:text-white"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 border-l border-white/10 hover:opacity-80 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-white">Alex Chen</p>
                <p className="text-xs text-gray-500">Security Analyst</p>
              </div>
              <ChevronDown size={14} className="text-gray-500 hidden md:block" />
            </button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-[#0f1030] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Alex Chen</p>
                        <p className="text-xs text-gray-500">alex@xairds.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-sm text-gray-300 hover:text-white">
                      <User size={14} />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all text-sm text-gray-300 hover:text-white">
                      <Settings size={14} />
                      Settings
                    </button>
                    <hr className="my-2 border-white/10" />
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-all text-sm text-red-400">
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-cyan-500/50 text-sm text-white placeholder:text-gray-500"
          />
        </div>
      </div>
    </nav>
  )
}