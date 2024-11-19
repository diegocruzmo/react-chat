import List from './components/List/List'
import Chat from './components/Chat/Chat'
import Detail from './components/Detail/Detail'
import Login from './components/Login/Login'
import { useState } from 'react'
import Notification from './components/Notification/Notification'

function App() {
  const [user, setUser] = useState(true)

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
