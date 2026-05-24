import { useState, useEffect, useCallback } from 'react'

export const useRealtimeData = (initialData, updateInterval = 3000) => {
  const [data, setData] = useState(initialData)
  const [isConnected, setIsConnected] = useState(true)

  const updateData = useCallback(() => {
    if (Array.isArray(data)) {
      const newEntry = {
        time: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100)
      }
      setData(prev => [...prev.slice(-20), newEntry])
    } else if (typeof data === 'object') {
      setData(prev => ({
        ...prev,
        value: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      }))
    }
  }, [data])

  useEffect(() => {
    const interval = setInterval(updateData, updateInterval)
    return () => clearInterval(interval)
  }, [updateData, updateInterval])

  return { data, isConnected, setData }
}

export const useWebSocketMock = () => {
  const [messages, setMessages] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  const connect = useCallback(() => {
    setIsConnected(true)
    const interval = setInterval(() => {
      const newMessage = {
        id: Date.now(),
        type: Math.random() > 0.7 ? 'alert' : 'info',
        data: {
          threat: `Threat detected at ${new Date().toLocaleTimeString()}`,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
        },
        timestamp: new Date().toISOString()
      }
      setMessages(prev => [newMessage, ...prev.slice(0, 49)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const disconnect = useCallback(() => {
    setIsConnected(false)
    setMessages([])
  }, [])

  return { messages, isConnected, connect, disconnect }
}