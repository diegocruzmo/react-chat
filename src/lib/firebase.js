import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
//import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
  authDomain: 'react-chat-4fa2a.firebaseapp.com',
  projectId: 'react-chat-4fa2a',
  storageBucket: 'react-chat-4fa2a.firebasestorage.app',
  messagingSenderId: '999066687034',
  appId: '1:999066687034:web:9d2abc53bbf4072da2c703'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()
//export const storage = getStorage()
