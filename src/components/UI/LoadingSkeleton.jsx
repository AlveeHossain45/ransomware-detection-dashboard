import React from 'react'
import { motion } from 'framer-motion'

export const CardSkeleton = () => {
  return (
    <div className="glass rounded-xl p-6">
      <div className="animate-pulse">
        <div className="h-4 bg-cyber-navy rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-cyber-navy rounded w-1/2 mb-3"></div>
        <div className="h-3 bg-cyber-navy rounded w-full mb-2"></div>
        <div className="h-3 bg-cyber-navy rounded w-5/6"></div>
      </div>
    </div>
  )
}

export const ChartSkeleton = () => {
  return (
    <div className="glass rounded-xl p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-cyber-navy rounded w-1/3 mb-6"></div>
        <div className="space-y-3">
          <div className="h-40 bg-cyber-navy rounded"></div>
          <div className="h-4 bg-cyber-navy rounded w-full"></div>
          <div className="h-4 bg-cyber-navy rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}

export const TableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="glass rounded-xl p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-cyber-navy rounded w-1/4 mb-6"></div>
        <div className="space-y-3">
          {[...Array(rows)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="h-12 bg-cyber-navy rounded flex-1"></div>
              <div className="h-12 bg-cyber-navy rounded flex-1"></div>
              <div className="h-12 bg-cyber-navy rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}