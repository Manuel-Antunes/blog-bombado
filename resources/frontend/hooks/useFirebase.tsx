import axios from 'axios'
import { getMessaging, getToken } from 'firebase/messaging'
import { useCallback } from 'react'

import { useStardust } from '../contexts/Stardust'
import app from '../services/firebase'

export const useFirebase = () => {
  const stardust = useStardust()

  const initNotifications = useCallback(() => {
    const messaging = getMessaging(app)
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY })
          .then(async (currentToken) => {
            if (currentToken) {
              console.log(currentToken)
              await axios.post(stardust.route('devices.store'), { token: currentToken })
              // Send the token to your server and update the UI if necessary
            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.')
            }
          })
          .catch((err) => {
            console.log('An error occurred while retrieving token. ', err)
          })
      } else {
        console.log('Unable to get permission to notify.')
      }
    })
  }, [stardust])

  return {
    initNotifications,
  }
}
