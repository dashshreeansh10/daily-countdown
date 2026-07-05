import { Workbox } from 'workbox-window'

let wb: Workbox | null = null

export function registerServiceWorker(): void {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers are not supported')
    return
  }

  try {
    wb = new Workbox('/sw.js')

    wb.addEventListener('controlling', () => {
      console.log('Service Worker is controlling the app')
    })

    wb.addEventListener('installed', (event) => {
      if (!event.isUpdate) {
        console.log('App is ready for offline use')
      }
    })

    wb.addEventListener('externalwaiting', () => {
      console.log('New service worker available')
    })

    wb.register()
      .then((registration) => {
        console.log('Service Worker registered:', registration)
        // Check for updates periodically
        setInterval(() => {
          registration.update()
        }, 60000) // Check every minute
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error)
      })
  } catch (error) {
    console.error('Failed to register Service Worker:', error)
  }
}

export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister()
      })
    })
  }
}
