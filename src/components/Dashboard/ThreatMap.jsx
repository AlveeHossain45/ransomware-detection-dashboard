import React, { useEffect, useRef } from 'react'
import { Globe, Zap, Activity } from 'lucide-react'

export default function ThreatMap() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.clientWidth
      canvas.height = 280
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Active threat locations
    const nodes = [
      { x: 0.15, y: 0.35, active: true, intensity: 1.0, label: 'RU' },
      { x: 0.35, y: 0.25, active: false, intensity: 0.3, label: 'CN' },
      { x: 0.55, y: 0.30, active: true, intensity: 0.8, label: 'US' },
      { x: 0.70, y: 0.45, active: true, intensity: 0.6, label: 'EU' },
      { x: 0.45, y: 0.65, active: false, intensity: 0.4, label: 'IN' },
      { x: 0.80, y: 0.70, active: true, intensity: 0.7, label: 'JP' },
      { x: 0.25, y: 0.75, active: false, intensity: 0.2, label: 'BR' },
      { x: 0.60, y: 0.80, active: true, intensity: 0.5, label: 'AU' },
    ]

    let animationId
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.02
      
      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }
      
      // Draw connections between active nodes
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)'
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].active || nodes[j].active) {
            ctx.beginPath()
            ctx.moveTo(nodes[i].x * canvas.width, nodes[i].y * canvas.height)
            ctx.lineTo(nodes[j].x * canvas.width, nodes[j].y * canvas.height)
            ctx.stroke()
          }
        }
      }
      
      // Draw nodes
      nodes.forEach(node => {
        const x = node.x * canvas.width
        const y = node.y * canvas.height
        
        if (node.active) {
          // Pulse effect
          const pulseRadius = 8 + Math.sin(time * 3) * 2
          
          // Outer glow
          ctx.beginPath()
          ctx.arc(x, y, pulseRadius + 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 0, 64, ${0.2 + Math.sin(time * 5) * 0.1})`
          ctx.fill()
          
          // Inner core
          ctx.beginPath()
          ctx.arc(x, y, pulseRadius, 0, Math.PI * 2)
          ctx.fillStyle = '#ff0040'
          ctx.fill()
          
          // Label
          ctx.font = 'bold 10px monospace'
          ctx.fillStyle = '#ff0040'
          ctx.shadowBlur = 5
          ctx.shadowColor = '#ff0040'
          ctx.fillText(node.label, x - 8, y - 12)
          ctx.shadowBlur = 0
        } else {
          // Inactive node
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = '#00f3ff'
          ctx.fill()
          
          ctx.font = '10px monospace'
          ctx.fillStyle = '#00f3ff'
          ctx.fillText(node.label, x - 8, y - 10)
        }
      })
      
      // Draw attack lines (animated)
      nodes.forEach(node => {
        if (node.active) {
          const x = node.x * canvas.width
          const y = node.y * canvas.height
          
          // Animated rings
          ctx.beginPath()
          ctx.arc(x, y, 15 + Math.sin(time * 5) * 3, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 0, 64, ${0.3 + Math.sin(time * 5) * 0.2})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="mb-8 rounded-2xl p-5" style={{
      background: 'linear-gradient(135deg, rgba(15, 20, 45, 0.8) 0%, rgba(10, 15, 35, 0.6) 100%)',
      border: '1px solid rgba(0, 243, 255, 0.2)'
    }}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
            <Globe size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Global Threat Map</h2>
            <p className="text-xs text-gray-500">Real-time threat intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500">Active Threats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full" />
            <span className="text-xs text-gray-500">Protected Nodes</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-green-400" />
            <span className="text-xs text-green-400">12 Active Attacks</span>
          </div>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="w-full h-[280px] rounded-xl" />
      
      <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap size={12} className="text-cyan-400" />
          <span className="text-xs text-gray-500">Top Source: Russia (234 attacks)</span>
        </div>
        <div className="text-xs text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}