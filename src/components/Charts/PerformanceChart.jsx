import React from 'react'
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts'

export const PerformanceRadarChart = ({ data, dataKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#1f1f3f" />
        <PolarAngleAxis dataKey="subject" stroke="#888" fontSize={11} />
        <PolarRadiusAxis stroke="#888" fontSize={10} domain={[0, 100]} />
        <Radar
          name="Feature Importance"
          dataKey={dataKey}
          stroke="#00f3ff"
          fill="#00f3ff"
          fillOpacity={0.3}
        />
        <Tooltip
          contentStyle={{ background: '#0a0a1f', border: '1px solid #00f3ff', borderRadius: '8px' }}
          labelStyle={{ color: '#00f3ff' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}