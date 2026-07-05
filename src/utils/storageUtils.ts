import { Countdown, JournalEntry } from '../types/countdown'

export interface BackupData {
  version: string
  exportedAt: string
  countdowns: Countdown[]
  journalEntries: JournalEntry[]
}

export async function exportToJSON(countdowns: Countdown[], journalEntries: JournalEntry[]): Promise<void> {
  const backupData: BackupData = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    countdowns,
    journalEntries,
  }

  const dataStr = JSON.stringify(backupData, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `daily-countdown-backup-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export async function exportToCSV(countdowns: Countdown[]): Promise<void> {
  const headers = ['Title', 'Start Date', 'End Date', 'Category', 'Priority', 'Created At']
  const rows = countdowns.map((c) => [
    c.title,
    new Date(c.startDate).toISOString().split('T')[0],
    new Date(c.endDate).toISOString().split('T')[0],
    c.category || '',
    c.priority || '',
    new Date(c.createdAt).toISOString().split('T')[0],
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n')

  const dataBlob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `daily-countdown-export-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

export async function importFromJSON(file: File): Promise<BackupData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as BackupData
        resolve(data)
      } catch (error) {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
