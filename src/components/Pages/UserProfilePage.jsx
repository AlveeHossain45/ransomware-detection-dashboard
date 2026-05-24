import React, { useState } from 'react'
import { User, Shield, Mail, Phone, MapPin, Calendar, Edit2, Save, Key, Bell, Activity } from 'lucide-react'
import GlowingCard from '../UI/GlowingCard'
import { useAlert } from '../UI/AlertSystem'

export default function UserProfilePage() {
  const { addAlert } = useAlert()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Alex Chen',
    role: 'Senior Security Analyst',
    email: 'alex.chen@xairds.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    badge: 'Certified Security Analyst',
    twoFactorEnabled: true,
    emailNotifications: true
  })

  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    setProfile(formData)
    setIsEditing(false)
    addAlert('Profile updated successfully', 'success')
  }

  const handleCancel = () => {
    setFormData(profile)
    setIsEditing(false)
  }

  const stats = [
    { label: 'Threats Detected', value: '1,247' },
    { label: 'Incidents Resolved', value: '1,203' },
    { label: 'Response Time', value: '1.2s' },
    { label: 'Accuracy Rate', value: '98.7%' }
  ]

  const recentActivities = [
    { action: 'Logged in from new device', time: '2 hours ago', ip: '192.168.1.105' },
    { action: 'Generated threat report', time: '5 hours ago', type: 'PDF' },
    { action: 'Updated detection settings', time: '1 day ago', sensitivity: 'High' },
    { action: 'Reviewed quarantine items', time: '2 days ago', count: 12 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <User size={32} className="text-cyber-neon" />
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-cyber-neon/10 rounded-lg hover:bg-cyber-neon/20 transition-all"
          >
            <Edit2 size={16} className="inline mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="space-x-3">
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-500/20 rounded-lg hover:bg-gray-500/30 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-cyber-neon to-cyber-purple rounded-lg hover:shadow-lg transition-all"
            >
              <Save size={16} className="inline mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <GlowingCard glowColor="cyan" className="lg:col-span-1">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-cyber-neon to-cyber-purple flex items-center justify-center mb-4">
              <User size={48} />
            </div>
            {!isEditing ? (
              <>
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-sm text-cyber-neon mb-2">{profile.role}</p>
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-cyber-green/20 text-cyber-green mb-4">
                  {profile.badge}
                </span>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full text-center px-3 py-2 mb-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon"
                />
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full text-center px-3 py-2 mb-2 bg-cyber-navy/50 border border-cyber-neon/20 rounded-lg focus:outline-none focus:border-cyber-neon"
                />
              </>
            )}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cyber-navy/30">
              <Mail size={16} className="text-cyber-neon" />
              {!isEditing ? (
                <span className="text-sm">{profile.email}</span>
              ) : (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="flex-1 bg-transparent border-b border-cyber-neon/20 focus:outline-none text-sm"
                />
              )}
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cyber-navy/30">
              <Phone size={16} className="text-cyber-neon" />
              {!isEditing ? (
                <span className="text-sm">{profile.phone}</span>
              ) : (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="flex-1 bg-transparent border-b border-cyber-neon/20 focus:outline-none text-sm"
                />
              )}
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cyber-navy/30">
              <MapPin size={16} className="text-cyber-neon" />
              {!isEditing ? (
                <span className="text-sm">{profile.location}</span>
              ) : (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="flex-1 bg-transparent border-b border-cyber-neon/20 focus:outline-none text-sm"
                />
              )}
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-cyber-navy/30">
              <Calendar size={16} className="text-cyber-neon" />
              <span className="text-sm">Joined {profile.joinDate}</span>
            </div>
          </div>
        </GlowingCard>

        {/* Stats Card */}
        <GlowingCard glowColor="purple" className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Performance Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-4 rounded-lg bg-cyber-navy/30">
                <p className="text-2xl font-bold text-cyber-neon">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-navy/30">
              <div className="flex items-center space-x-3">
                <Key size={18} className="text-cyber-green" />
                <span className="text-sm">Two-Factor Authentication</span>
              </div>
              <button
                onClick={() => {
                  const newValue = !profile.twoFactorEnabled
                  setProfile({...profile, twoFactorEnabled: newValue})
                  addAlert(`2FA ${newValue ? 'enabled' : 'disabled'}`, 'info')
                }}
                className={`relative w-10 h-5 rounded-full transition-all ${profile.twoFactorEnabled ? 'bg-cyber-green' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${profile.twoFactorEnabled ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-cyber-navy/30">
              <div className="flex items-center space-x-3">
                <Bell size={18} className="text-cyber-neon" />
                <span className="text-sm">Email Notifications</span>
              </div>
              <button
                onClick={() => {
                  const newValue = !profile.emailNotifications
                  setProfile({...profile, emailNotifications: newValue})
                  addAlert(`Email notifications ${newValue ? 'enabled' : 'disabled'}`, 'info')
                }}
                className={`relative w-10 h-5 rounded-full transition-all ${profile.emailNotifications ? 'bg-cyber-green' : 'bg-gray-600'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${profile.emailNotifications ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </GlowingCard>
      </div>

      {/* Recent Activity */}
      <GlowingCard glowColor="green">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-cyber-navy/30">
              <div>
                <p className="text-sm">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              <Activity size={16} className="text-cyber-neon opacity-50" />
            </div>
          ))}
        </div>
      </GlowingCard>
    </div>
  )
}