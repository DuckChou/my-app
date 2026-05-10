import type { ProgressState, UserProfile } from '../types/career'

const profileKey = 'career-growth-profile'
const progressKey = 'career-growth-progress'

function getLocalStorage() {
  if (typeof window === 'undefined') return null
  if (typeof window.localStorage?.getItem !== 'function') return null
  return window.localStorage
}

export function getStoredProfile(): UserProfile | null {
  const storage = getLocalStorage()
  if (!storage) return null

  const value = storage.getItem(profileKey)
  return value ? (JSON.parse(value) as UserProfile) : null
}

export function saveProfile(profile: UserProfile) {
  getLocalStorage()?.setItem(profileKey, JSON.stringify(profile))
}

export function getStoredProgress(): ProgressState {
  const storage = getLocalStorage()
  if (!storage) return { completedTasks: {}, evidence: [] }

  const value = storage.getItem(progressKey)
  return value ? (JSON.parse(value) as ProgressState) : { completedTasks: {}, evidence: [] }
}

export function saveProgress(progress: ProgressState) {
  getLocalStorage()?.setItem(progressKey, JSON.stringify(progress))
}
