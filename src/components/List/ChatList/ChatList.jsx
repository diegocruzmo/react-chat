import { FaSearch } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import './chatList.css'
import { useEffect, useState } from 'react'
import AddUser from './AddUser/AddUser'
import { useUserStore } from '../../../lib/userStore'
import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore'

const ChatList = () => {
  const [addUser, setAddUser] = useState(false)
  const [chats, setChats] = useState([])
  const { currentUser } = useUserStore()
  const { changeChat, chatId } = useChatStore()

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item
      return rest
    })

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId)

    userChats[chatIndex].isSeen = true

    const userChatsRef = doc(db, 'userchats', currentUser.id)

    try {
      await updateDoc(userChatsRef, {
        chats: userChats
      })
      changeChat(chat.chatId, chat.user)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, 'userchats', currentUser.id),
      async (res) => {
        const items = res.data().chats

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, 'users', item.receiverId)
          const userDocSnap = await getDoc(userDocRef)

          const user = userDocSnap.data()

          return { ...item, user }
        })

        const chatData = await Promise.all(promises)

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
      }
    )

    return () => {
      unSub()
    }
  }, [currentUser.id])

  const handleAdd = (e) => {
    e.preventDefault()
    setAddUser(!addUser)
  }

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <FaSearch />
          <input type='text' placeholder='Search' />
        </div>
        {!addUser ? (
          <FaPlus onClick={handleAdd} style={{ cursor: 'pointer' }} />
        ) : (
          <FaMinus onClick={handleAdd} style={{ cursor: 'pointer' }} />
        )}
      </div>

      {chats.map((chat) => (
        <div
          className='item'
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe'
          }}
        >
          <img src='./default.png' alt='avatar' />
          <div className='texts'>
            <span>{chat.user.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addUser && <AddUser />}
    </div>
  )
}

export default ChatList
