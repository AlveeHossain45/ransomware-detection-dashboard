import React from 'react'
import { motion } from 'framer-motion'

export default function GlowingCard({ children, className = '', glowColor = 'cyan' }) {
  const colors = {
    cyan: 'shadow-cyan-500/20 hover:shadow-cyan-500/40',
    purple: 'shadow-purple-500/20 hover:shadow-purple-500/40',
    red: 'shadow-red-500/20 hover:shadow-red-500/40',
    green: 'shadow-green-500/20 hover:shadow-green-500/40'
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`glass rounded-xl p-6 border border-cyber-neon/20 transition-all duration-300 hover:shadow-2xl ${colors[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  )
}