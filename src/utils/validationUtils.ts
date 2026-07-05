export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateCountdownTitle(title: string): string | null {
  if (!title || title.trim().length === 0) {
    return 'Title is required'
  }
  if (title.length > 100) {
    return 'Title must be less than 100 characters'
  }
  return null
}

export function validateDateRange(startDate: Date, endDate: Date): string | null {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const now = new Date()

  if (end <= start) {
    return 'End date must be after start date'
  }
  if (start < now) {
    return 'Start date cannot be in the past'
  }
  return null
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>"'&]/g, (char) => {
    const escapeMap: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '&': '&amp;',
    }
    return escapeMap[char] || char
  })
}
