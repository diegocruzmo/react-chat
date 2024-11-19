import List from './components/List/List'
import Chat from './components/Chat/Chat'
import Detail from './components/Detail/Detail'
import Login from './components/Login/Login'
import { useEffect, useState } from 'react'
import Notification from './components/Notification/Notification'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'

function App() {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user)
    })

    return () => {
      unSub()
    }
  }, [])

  return (
    <div className='container'>
      {!user ? (
        <Login />
      ) : (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      )}
      <Notification />
    </div>
  )
}

export default App
