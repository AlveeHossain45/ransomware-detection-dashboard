// FILE: src/components/Layout/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react'
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
  Shield,
  ChevronDown,
  MoreHorizontal,
  UserCircle,
  BellRing,
  Sparkles,
  Fingerprint
} from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode, sidebarCollapsed, setSidebarCollapsed }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchHovered, setSearchHovered] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showPremiumMenu, setShowPremiumMenu] = useState(false)
  
  // Refs for click outside detection
  const premiumMenuRef = useRef(null)
  const searchRef = useRef(null)
  
  // Mock data for search functionality
  const searchableData = [
    { id: 1, type: 'threat', title: 'Ransomware detection spike', category: 'Threats', path: '/threat-monitoring' },
    { id: 2, type: 'threat', title: 'Trojan horse blocked', category: 'Threats', path: '/threat-monitoring' },
    { id: 3, type: 'file', title: 'document.pdf.exe', category: 'Quarantine', path: '/quarantine' },
    { id: 4, type: 'file', title: 'backup.zip.encrypted', category: 'File Activity', path: '/file-activity' },
    { id: 5, type: 'report', title: 'Weekly Security Report', category: 'Reports', path: '/reports' },
    { id: 6, type: 'setting', title: 'AI Detection Sensitivity', category: 'Settings', path: '/settings' },
    { id: 7, type: 'threat', title: 'WannaCry variant detected', category: 'Threat Logs', path: '/threat-logs' },
    { id: 8, type: 'analytics', title: 'AI Model Performance', category: 'AI Analytics', path: '/ai-analytics' },
    { id: 9, type: 'timeline', title: 'Attack Timeline - Jan 15', category: 'Attack Timeline', path: '/attack-timeline' },
    { id: 10, type: 'file', title: 'system_update.msi', category: 'Quarantine', path: '/quarantine' },
    { id: 11, type: 'threat', title: 'Spyware infiltration attempt', category: 'Live Detection', path: '/live-detection' },
    { id: 12, type: 'profile', title: 'User Profile Settings', category: 'Profile', path: '/profile' },
  ]
  
  const filteredResults = searchQuery.trim() === '' ? [] : searchableData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6)
  
  // Close premium menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (premiumMenuRef.current && !premiumMenuRef.current.contains(event.target)) {
        setShowPremiumMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutsideSearch)
    return () => document.removeEventListener('mousedown', handleClickOutsideSearch)
  }, [])
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.getElementById('global-search-input')
        searchInput?.focus()
      }
      if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchQuery])
  
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
  
  // Premium 3-dot menu items with enhanced styling
  const premiumMenuItems = [
    { icon: UserCircle, label: 'My Profile', description: 'View and edit your profile', action: 'profile', gradient: 'from-cyan-500/20 to-blue-500/20' },
    { icon: Settings, label: 'Preferences', description: 'System & AI settings', action: 'settings', gradient: 'from-purple-500/20 to-pink-500/20' },
    { icon: BellRing, label: 'Notifications', description: '3 unread alerts', action: 'notifications', badge: 3, gradient: 'from-orange-500/20 to-red-500/20' },
    { icon: Sparkles, label: 'AI Insights', description: 'View threat intelligence', action: 'insights', gradient: 'from-green-500/20 to-emerald-500/20' },
    { icon: Fingerprint, label: 'Security Center', description: '2FA & access logs', action: 'security', gradient: 'from-indigo-500/20 to-purple-500/20' },
    { icon: LogOut, label: 'Secure Logout', description: 'End session', action: 'logout', gradient: 'from-red-500/20 to-rose-500/20', isDanger: true },
  ]
  
  const handlePremiumAction = (action) => {
    setShowPremiumMenu(false)
    switch(action) {
      case 'profile':
        window.location.href = '/profile'
        break
      case 'settings':
        window.location.href = '/settings'
        break
      case 'notifications':
        setShowNotifications(true)
        setTimeout(() => setShowNotifications(false), 3000)
        break
      case 'insights':
        window.location.href = '/ai-analytics'
        break
      case 'security':
        window.location.href = '/settings'
        break
      case 'logout':
        localStorage.removeItem('adminAuth')
        window.location.href = 'admin.html'
        break
      default:
        break
    }
  }
  
  const handleSearchResultClick = (result) => {
    setSearchQuery('')
    setSearchFocused(false)
    if (window.location.pathname !== result.path) {
      window.location.href = result.path
    }
  }
  
  return (
    <nav className="sticky top-0 z-30 backdrop-blur-xl bg-[#0a0a1f]/80 border-b border-white/5">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section - Logo & Search (Menu toggle removed) */}
        <div className="flex items-center gap-4">
          {/* Logo / Brand */}
          <div className="hidden md:flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              XAI-RDS
            </span>
          </div>
  
          {/* Premium Search Bar with hover expansion & glassmorphism */}
          <div 
            ref={searchRef}
            className="relative hidden md:block transition-all duration-300 ease-out"
            style={{ width: searchFocused ? '400px' : searchHovered ? '340px' : '280px' }}
            onMouseEnter={() => setSearchHovered(true)}
            onMouseLeave={() => setSearchHovered(false)}
          >
            <div className={`
              relative rounded-xl transition-all duration-300
              bg-white/5 backdrop-blur-sm border
              ${searchFocused ? 'border-cyan-500/70 shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'border-white/10 hover:border-cyan-500/40'}
            `}>
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ${searchFocused ? 'text-cyan-400' : 'text-gray-500'}`} size={16} />
              <input
                id="global-search-input"
                type="text"
                placeholder="Search threats, files, incidents... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-9 pr-4 py-2.5 bg-transparent rounded-xl focus:outline-none text-sm text-white placeholder:text-gray-500 transition-all"
                aria-label="Global search"
              />
              
              {/* Keyboard shortcut hint */}
              {!searchFocused && !searchQuery && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[10px] font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded-md">
                  ⌘K
                </div>
              )}
            </div>
            
            {/* Search Results Dropdown - Animated */}
            <AnimatePresence>
              {searchFocused && searchQuery.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-[#0f1030]/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl overflow-hidden z-50"
                >
                  <div className="max-h-80 overflow-y-auto">
                    {filteredResults.length === 0 ? (
                      <div className="px-4 py-8 text-center">
                        <Search size={32} className="mx-auto mb-2 text-gray-600" />
                        <p className="text-sm text-gray-400">No results found for "{searchQuery}"</p>
                        <p className="text-xs text-gray-500 mt-1">Try searching for threats, files, or settings</p>
                      </div>
                    ) : (
                      <>
                        <div className="px-3 py-2 border-b border-white/10">
                          <span className="text-xs font-medium text-cyan-400">Quick Results</span>
                        </div>
                        {filteredResults.map((result, idx) => (
                          <motion.button
                            key={result.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            onClick={() => handleSearchResultClick(result)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-500/10 transition-all text-left border-b border-white/5 last:border-0 group"
                          >
                            <div className="p-1.5 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                              <Search size={14} className="text-cyan-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-white font-medium">{result.title}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">{result.category}</span>
                              </div>
                            </div>
                            <ChevronDown size={14} className="text-gray-600 rotate-[-90deg] group-hover:text-cyan-400 transition-all" />
                          </motion.button>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="px-4 py-2 border-t border-white/10 bg-white/5">
                    <p className="text-[10px] text-gray-500 text-center">
                      ⌘K to search • ESC to clear
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              aria-label="Notifications"
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
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
  
          {/* PREMIUM 3-DOT MENU - Enhanced with cyber design */}
          <div className="relative" ref={premiumMenuRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowPremiumMenu(!showPremiumMenu)}
              className={`
                relative p-2 rounded-lg transition-all duration-300
                ${showPremiumMenu 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,243,255,0.3)]' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-cyan-400'
                }
              `}
              aria-label="Premium menu"
            >
              <MoreHorizontal size={18} />
              {!showPremiumMenu && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              )}
            </motion.button>
            
            <AnimatePresence>
              {showPremiumMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                  className="absolute right-0 mt-2 w-72 bg-[#0a0a1f]/95 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),0_0_20px_rgba(0,243,255,0.2)] overflow-hidden z-50"
                >
                  {/* Premium Header */}
                  <div className="relative px-4 py-3 border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-cyan-400" />
                        <span className="text-xs font-semibold text-cyan-400 tracking-wider">COMMAND CENTER</span>
                      </div>
                      <div className="text-[10px] font-mono text-gray-500">v2.0</div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500" />
                  </div>
                  
                  <div className="py-2">
                    {premiumMenuItems.map((item, idx) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04, type: "spring", stiffness: 300 }}
                        onClick={() => handlePremiumAction(item.action)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2.5 transition-all duration-200
                          hover:bg-gradient-to-r ${item.gradient} group
                          ${item.isDanger ? 'hover:bg-red-500/10' : ''}
                        `}
                      >
                        <div className={`
                          p-1.5 rounded-lg transition-all duration-200
                          ${item.isDanger ? 'bg-red-500/10 group-hover:bg-red-500/20' : 'bg-white/5 group-hover:bg-cyan-500/20'}
                        `}>
                          <item.icon size={15} className={`
                            transition-colors duration-200
                            ${item.isDanger ? 'text-red-400 group-hover:text-red-300' : 'text-gray-400 group-hover:text-cyan-400'}
                          `} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium transition-colors ${item.isDanger ? 'text-red-400 group-hover:text-red-300' : 'text-gray-200 group-hover:text-white'}`}>
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/30 text-red-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                        <ChevronDown size={12} className="text-gray-600 rotate-[-90deg] group-hover:text-cyan-400 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Premium Footer */}
                  <div className="border-t border-white/10 px-4 py-2 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-[9px] text-gray-500 font-mono">SECURE CONNECTION</span>
                    </div>
                    <Fingerprint size={12} className="text-cyan-400/60" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
  
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 border-l border-white/10 hover:opacity-80 transition-all"
              aria-label="User menu"
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
  
      {/* Mobile Search Bar - Fully Functional */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 focus-within:border-cyan-500/50 transition-all">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search threats, files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-transparent rounded-xl focus:outline-none text-sm text-white placeholder:text-gray-500"
          />
        </div>
        {/* Mobile search results */}
        <AnimatePresence>
          {searchQuery.trim() !== '' && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute left-4 right-4 mt-2 bg-[#0f1030]/95 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-2xl z-50 max-h-64 overflow-y-auto"
            >
              {filteredResults.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-400">No results</p>
                </div>
              ) : (
                filteredResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSearchResultClick(result)}
                    className="w-full text-left px-4 py-3 hover:bg-cyan-500/10 border-b border-white/10 last:border-0"
                  >
                    <p className="text-sm text-white">{result.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{result.category}</p>
                  </button>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}