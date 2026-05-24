export const generateMockThreats = (count = 10) => {
    const threats = []
    const types = ['Ransomware', 'Trojan', 'Worm', 'Spyware', 'Adware', 'Rootkit']
    const severities = ['Critical', 'High', 'Medium', 'Low']
    
    for (let i = 0; i < count; i++) {
      threats.push({
        id: i + 1,
        name: `${types[Math.floor(Math.random() * types.length)]}_${Math.floor(Math.random() * 1000)}`,
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        target: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        status: ['Detected', 'Analyzing', 'Blocked', 'Quarantined'][Math.floor(Math.random() * 4)],
        confidence: 70 + Math.random() * 29
      })
    }
    return threats
  }
  
  export const generateMockTimeline = () => {
    const events = []
    const stages = ['Initial Detection', 'AI Analysis', 'Behavioral Scan', 'Containment', 'Remediation']
    const actions = ['Alert triggered', 'Pattern matched', 'Quarantine initiated', 'Process isolated', 'System restored']
    
    for (let i = 0; i < 10; i++) {
      events.push({
        id: i + 1,
        time: new Date(Date.now() - (10 - i) * 300000).toLocaleTimeString(),
        stage: stages[i % stages.length],
        action: actions[i % actions.length],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        details: `Detailed information about event ${i + 1}`
      })
    }
    return events
  }
  
  export const generateMockSystemMetrics = () => {
    return {
      cpu: {
        usage: 20 + Math.random() * 60,
        cores: 8,
        temperature: 40 + Math.random() * 30,
        processes: 120 + Math.random() * 80
      },
      memory: {
        total: 16384,
        used: 4096 + Math.random() * 8192,
        free: 4096 + Math.random() * 8192,
        cache: 1024 + Math.random() * 2048
      },
      disk: {
        total: 512000,
        used: 256000 + Math.random() * 128000,
        free: 128000 + Math.random() * 128000,
        readSpeed: 100 + Math.random() * 400,
        writeSpeed: 50 + Math.random() * 300
      },
      network: {
        upload: 10 + Math.random() * 90,
        download: 50 + Math.random() * 450,
        packetsIn: 1000 + Math.random() * 9000,
        packetsOut: 500 + Math.random() * 4500
      }
    }
  }
  
  export const mockThreatStats = {
    daily: {
      detected: 1247,
      blocked: 1203,
      quarantined: 44,
      falsePositives: 8
    },
    weekly: {
      detected: 8732,
      blocked: 8421,
      quarantined: 311,
      falsePositives: 56
    },
    monthly: {
      detected: 34928,
      blocked: 33684,
      quarantined: 1244,
      falsePositives: 224
    }
  }
  
  export const mockFileActivities = [
    { id: 1, file: 'document.pdf.exe', action: 'CREATE', path: '/Users/Admin/Downloads', risk: 95, timestamp: new Date().toISOString() },
    { id: 2, file: 'backup.zip.encrypted', action: 'MODIFY', path: '/Users/Admin/Documents', risk: 88, timestamp: new Date().toISOString() },
    { id: 3, file: 'system32.dll', action: 'READ', path: '/Windows/System32', risk: 76, timestamp: new Date().toISOString() },
    { id: 4, file: 'config.exe', action: 'EXECUTE', path: '/Temp', risk: 92, timestamp: new Date().toISOString() },
    { id: 5, file: 'personal_data.xlsx', action: 'ENCRYPT', path: '/Users/Admin/Desktop', risk: 99, timestamp: new Date().toISOString() }
  ]
  
  export const mockAttackSources = [
    { ip: '185.142.53.45', country: 'RU', attacks: 234, type: 'Ransomware' },
    { ip: '103.124.12.67', country: 'CN', attacks: 189, type: 'Trojan' },
    { ip: '45.136.28.19', country: 'KP', attacks: 156, type: 'Worm' },
    { ip: '94.102.61.78', country: 'IR', attacks: 123, type: 'Spyware' },
    { ip: '212.102.42.37', country: 'TR', attacks: 98, type: 'Adware' }
  ]
  
  export const mockAIInsights = {
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