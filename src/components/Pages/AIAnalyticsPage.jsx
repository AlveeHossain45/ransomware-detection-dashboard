import React from 'react'
import { Brain, TrendingUp, Target, Shield, Cpu } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'
import { PerformanceRadarChart } from '../Charts/PerformanceChart'

// Inline mock data for AI insights
const mockAIInsights = {
  confidence: 98.7,
  accuracy: 99.2,
  falsePositive: 0.8,
  responseTime: 1.2,
  modelVersion: '2.1.0',
  lastTraining: '2024-01-15T10:30:00Z',
  features: [
    { name: 'File Entropy', weight: 0.25, importance: 'high' },
    { name: 'Process Behavior', weight: 0.22, importance: 'high' },
    { name: 'Network Anomaly', weight: 0.18, importance: 'medium' },
    { name: 'Registry Changes', weight: 0.15, importance: 'medium' },
    { name: 'Memory Patterns', weight: 0.12, importance: 'low' },
    { name: 'Timing Analysis', weight: 0.08, importance: 'low' }
  ]
}

const radarData = mockAIInsights.features.map(f => ({
  subject: f.name,
  value: f.weight * 100,
  fullMark: 100
}))

export default function AIAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Brain size={32} className="text-cyber-neon" />
        <h1 className="text-3xl font-bold">AI Analytics</h1>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlowingCard glowColor="cyan">
          <div className="text-center">
            <Shield size={28} className="mx-auto mb-2 text-cyber-neon" />
            <p className="text-2xl font-bold">{mockAIInsights.confidence}%</p>
            <p className="text-xs text-gray-400">Confidence Score</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="green">
          <div className="text-center">
            <TrendingUp size={28} className="mx-auto mb-2 text-cyber-green" />
            <p className="text-2xl font-bold">{mockAIInsights.accuracy}%</p>
            <p className="text-xs text-gray-400">Accuracy</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="red">
          <div className="text-center">
            <Target size={28} className="mx-auto mb-2 text-cyber-red" />
            <p className="text-2xl font-bold">{mockAIInsights.falsePositive}%</p>
            <p className="text-xs text-gray-400">False Positive Rate</p>
          </div>
        </GlowingCard>
        <GlowingCard glowColor="purple">
          <div className="text-center">
            <Cpu size={28} className="mx-auto mb-2 text-cyber-purple" />
            <p className="text-2xl font-bold">{mockAIInsights.responseTime}s</p>
            <p className="text-xs text-gray-400">Avg Response Time</p>
          </div>
        </GlowingCard>
      </div>

      {/* Feature Importance */}
      <GlowingCard glowColor="purple">
        <h3 className="text-lg font-semibold mb-4">Feature Importance Analysis</h3>
        <div className="h-80">
          <PerformanceRadarChart data={radarData} dataKey="value" />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {mockAIInsights.features.map((feature, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-cyber-navy/30">
              <span className="text-sm">{feature.name}</span>
              <span className="text-xs text-cyber-neon font-mono">{Math.round(feature.weight * 100)}%</span>
            </div>
          ))}
        </div>
      </GlowingCard>

      {/* Model Info */}
      <GlowingCard glowColor="cyan">
        <h3 className="text-lg font-semibold mb-4">Model Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-cyber-navy/50">
            <p className="text-xs text-gray-400 mb-1">Model Version</p>
            <p className="text-lg font-mono text-cyber-neon">{mockAIInsights.modelVersion}</p>
          </div>
          <div className="p-4 rounded-lg bg-cyber-navy/50">
            <p className="text-xs text-gray-400 mb-1">Last Training</p>
            <p className="text-lg font-mono text-cyber-neon">
              {new Date(mockAIInsights.lastTraining).toLocaleDateString()}
            </p>
          </div>
        </div>
      </GlowingCard>

      {/* Performance Metrics */}
      <GlowingCard glowColor="green">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-cyber-navy/30">
            <p className="text-xs text-gray-400">Detection Rate</p>
            <p className="text-xl font-bold text-cyber-green">99.2%</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-cyber-navy/30">
            <p className="text-xs text-gray-400">Precision</p>
            <p className="text-xl font-bold text-cyber-neon">98.5%</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-cyber-navy/30">
            <p className="text-xs text-gray-400">Recall</p>
            <p className="text-xl font-bold text-cyber-purple">97.8%</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-cyber-navy/30">
            <p className="text-xs text-gray-400">F1 Score</p>
            <p className="text-xl font-bold text-cyber-red">98.1%</p>
          </div>
        </div>
      </GlowingCard>
    </div>
  )
}