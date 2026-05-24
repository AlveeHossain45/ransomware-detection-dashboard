import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Sliders, 
  Key,
  Save,
  RefreshCw
} from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'
import { useAlert } from '../UI/AlertSystem'

export default function Settings() {
  const { addAlert } = useAlert()
  const [aiSensitivity, setAiSensitivity] = useState(75)
  const [detectionThreshold, setDetectionThreshold] = useState(80)
  const [autoQuarantine, setAutoQuarantine] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [webhookEnabled, setWebhookEnabled] = useState(false)

  const handleSave = () => {
    addAlert('Settings saved successfully', 'success')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <SettingsIcon size={32} className="text-cyber-neon" />
        <h1 className="text-3xl font-bold">System Settings</h1>
      </div>

      <div className="space-y-6">
        {/* AI Detection Settings */}
        <GlowingCard glowColor="cyan">
          <div className="flex items-center space-x-2 mb-4">
            <Sliders size={20} className="text-cyber-neon" />
            <h2 className="text-xl font-semibold">AI Detection Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">AI Sensitivity: {aiSensitivity}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiSensitivity}
                onChange={(e) => setAiSensitivity(parseInt(e.target.value))}
                className="w-full h-2 bg-cyber-navy rounded-lg appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #00f3ff 0%, #00f3ff ${aiSensitivity}%, #1f1f3f ${aiSensitivity}%, #1f1f3f 100%)` }}
              />
              <p className="text-xs text-gray-400 mt-1">Higher sensitivity may increase false positives</p>
            </div>
            <div>
              <label className="block text-sm mb-2">Detection Threshold: {detectionThreshold}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={detectionThreshold}
                onChange={(e) => setDetectionThreshold(parseInt(e.target.value))}
                className="w-full h-2 bg-cyber-navy rounded-lg appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #00f3ff 0%, #00f3ff ${detectionThreshold}%, #1f1f3f ${detectionThreshold}%, #1f1f3f 100%)` }}
              />
            </div>
          </div>
        </GlowingCard>

        {/* Monitoring Options */}
        <GlowingCard glowColor="purple">
          <div className="flex items-center space-x-2 mb-4">
            <Shield size={20} className="text-cyber-purple" />
            <h2 className="text-xl font-semibold">Monitoring Options</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Auto-Quarantine Suspicious Files</span>
              <button
                onClick={() => setAutoQuarantine(!autoQuarantine)}
                className={`relative w-12 h-6 rounded-full transition-all ${autoQuarantine ? 'bg-cyber-neon' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${autoQuarantine ? 'right-1' : 'left-1'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Real-time Behavioral Analysis</span>
              <div className="text-cyber-green text-sm">Enabled</div>
            </label>
          </div>
        </GlowingCard>

        {/* Notification Settings */}
        <GlowingCard glowColor="red">
          <div className="flex items-center space-x-2 mb-4">
            <Bell size={20} className="text-cyber-red" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Email Alerts</span>
              <button
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`relative w-12 h-6 rounded-full transition-all ${emailAlerts ? 'bg-cyber-neon' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${emailAlerts ? 'right-1' : 'left-1'}`} />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Webhook Integration</span>
              <button
                onClick={() => setWebhookEnabled(!webhookEnabled)}
                className={`relative w-12 h-6 rounded-full transition-all ${webhookEnabled ? 'bg-cyber-neon' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${webhookEnabled ? 'right-1' : 'left-1'}`} />
              </button>
            </label>
          </div>
        </GlowingCard>

        {/* API Integration */}
        <GlowingCard glowColor="green">
          <div className="flex items-center space-x-2 mb-4">
            <Key size={20} className="text-cyber-green" />
            <h2 className="text-xl font-semibold">API Configuration</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-navy/50">
              <span className="text-sm font-mono">API Key: ••••••••••••••••</span>
              <button className="text-xs text-cyber-neon hover:text-cyber-neon/80">Regenerate</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-navy/50">
              <span className="text-sm">API Endpoint</span>
              <span className="text-xs font-mono text-cyber-neon">https://api.xai-rds.com/v1</span>
            </div>
          </div>
        </GlowingCard>

        {/* Save Button */}
        <div className="flex justify-end space-x-3">
          <button className="px-6 py-2 bg-cyber-navy rounded-lg hover:bg-cyber-neon/10 transition-all">
            <RefreshCw size={16} className="inline mr-2" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-lg hover:shadow-lg transition-all"
          >
            <Save size={16} className="inline mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}