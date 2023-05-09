/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyANhza33OH5Gyt1koLC-UB-MgV33u9n388',
  authDomain: 'spacie-72214.firebaseapp.com',
  projectId: 'spacie-72214',
  storageBucket: 'spacie-72214.appspot.com',
  messagingSenderId: '922273230464',
  appId: '1:922273230464:web:fc40d1b1aef76b90b74065',
  measurementId: 'G-QENCZWVKZF',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
