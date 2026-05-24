import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'

export const ThreatLineChart = ({ data, dataKey1, dataKey2, color1, color2 }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f3f" />
        <XAxis dataKey="time" stroke="#888" fontSize={12} />
        <YAxis stroke="#888" fontSize={12} />
        <Tooltip
          contentStyle={{ background: '#0a0a1f', border: '1px solid #00f3ff', borderRadius: '8px' }}
          labelStyle={{ color: '#00f3ff' }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey={dataKey1} 
          stroke={color1} 
          strokeWidth={2} 
          dot={{ r: 3, fill: color1 }}
          activeDot={{ r: 6 }}
        />
        {dataKey2 && (
          <Line 
            type="monotone" 
            dataKey={dataKey2} 
            stroke={color2} 
            strokeWidth={2} 
            dot={{ r: 3, fill: color2 }}
            activeDot={{ r: 6 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}