import Dexie, { Table } from 'dexie'
import { Countdown, JournalEntry, Milestone } from '../types/countdown'
import { v4 as uuidv4 } from 'uuid'

class DailyCountdownDB extends Dexie {
  countdowns!: Table<Countdown>
  journalEntries!: Table<JournalEntry>
  milestones!: Table<Milestone>

  constructor() {
    super('DailyCountdownDB')
    this.version(1).stores({
      countdowns: '++id, title, createdAt',
      journalEntries: '++id, countdownId, date',
      milestones: '++id, countdownId, date',
    })
  }
}

const db = new DailyCountdownDB()

export async function initializeDatabase(): Promise<void> {
  try {
    await db.open()
  } catch (error) {
    console.error('Failed to open database:', error)
    throw error
  }
}

// Countdown operations
export async function addCountdown(countdown: Countdown): Promise<Countdown> {
  const newCountdown: Countdown = {
    ...countdown,
    id: uuidv4(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await db.countdowns.add(newCountdown)
  return newCountdown
}

export async function getCountdowns(): Promise<Countdown[]> {
  return await db.countdowns.toArray()
}

export async function getCountdown(id: string): Promise<Countdown | undefined> {
  return await db.countdowns.get(id)
}

export async function updateCountdown(id: string, updates: Partial<Countdown>): Promise<void> {
  await db.countdowns.update(id, {
    ...updates,
    updatedAt: new Date(),
  } as Countdown)
}

export async function deleteCountdown(id: string): Promise<void> {
  await db.countdowns.delete(id)
  await db.journalEntries.where('countdownId').equals(id).delete()
  await db.milestones.where('countdownId').equals(id).delete()
}

// Journal operations
export async function addJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  const newEntry: JournalEntry = {
    ...entry,
    id: uuidv4(),
  }
  await db.journalEntries.add(newEntry)
  return newEntry
}

export async function getJournalEntries(countdownId: string): Promise<JournalEntry[]> {
  return await db.journalEntries.where('countdownId').equals(countdownId).toArray()
}

export async function getJournalEntry(id: string): Promise<JournalEntry | undefined> {
  return await db.journalEntries.get(id)
}

export async function updateJournalEntry(id: string, updates: Partial<JournalEntry>): Promise<void> {
  await db.journalEntries.update(id, updates)
}

export async function deleteJournalEntry(id: string): Promise<void> {
  await db.journalEntries.delete(id)
}

// Milestone operations
export async function addMilestone(milestone: Milestone): Promise<Milestone> {
  const newMilestone: Milestone = {
    ...milestone,
    id: uuidv4(),
  }
  await db.milestones.add(newMilestone)
  return newMilestone
}

export async function getMilestones(countdownId: string): Promise<Milestone[]> {
  return await db.milestones.where('countdownId').equals(countdownId).toArray()
}

export async function updateMilestone(id: string, updates: Partial<Milestone>): Promise<void> {
  await db.milestones.update(id, updates)
}

export async function deleteMilestone(id: string): Promise<void> {
  await db.milestones.delete(id)
}
