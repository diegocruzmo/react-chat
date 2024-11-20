import { FaPhoneSquareAlt } from 'react-icons/fa'
import { GoDeviceCameraVideo } from 'react-icons/go'
import { FaInfoCircle } from 'react-icons/fa'
import { MdEmojiEmotions } from 'react-icons/md'
import { BiSolidLandscape } from 'react-icons/bi'
import { FaCamera } from 'react-icons/fa'
import { FaMicrophone } from 'react-icons/fa'
import EmojiPicker from 'emoji-picker-react'
import './chat.css'
import { useState, useRef, useEffect } from 'react'
import { onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayUnion } from 'firebase/firestore'

const Chat = () => {
  const [openEmojis, setOpenEmojis] = useState(false)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState()

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore()
  const { currentUser } = useUserStore()

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', chatId), (res) => {
      setChat(res.data())
    })

    return () => {
      unSub()
    }
  }, [chatId])

  const handleOpenEmojis = () => {
    setOpenEmojis(!openEmojis)
  }

  const handleAddEmoji = (e) => {
    setMessage((prev) => prev + e.emoji)
    handleOpenEmojis()
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = async () => {
    if (message === '') return

    try {
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          message,
          createdAt: new Date()
        })
      })

      const userIds = [currentUser.id, user.id]

      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, 'userchats', id)
        const userChatsSnapshot = await getDoc(userChatsRef)

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()

          const chatIndex = userChatsData.chats.findIndex(
            (chat) => chat.chatId === chatId
          )

          userChatsData.chats[chatIndex].lastMessage = message
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats
          })
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='chat'>
      <div className='top'>
        <div className='user'>
          <img src='./default.png' alt='avatar' />
          <div className='texts'>
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        <div className='icons'>
          <FaPhoneSquareAlt />
          <GoDeviceCameraVideo />
          <FaInfoCircle />
        </div>
      </div>
      <div className='center'>
        {chat?.messages?.map((message) => (
          <>
            <div
              className={
                message.senderId === currentUser?.id ? 'message own' : 'message'
              }
              key={message?.createdAt?.chats?.seconds}
            >
              <img src='./default.png' alt='avatar' />
              <div className='texts'>
                <p>{message.message}</p>
                <span>1 min ago</span>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className='bottom'>
        <div className='icons'>
          <BiSolidLandscape />
          <FaCamera />
          <FaMicrophone />
        </div>
        <input
          type='text'
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? 'You cannot send a message'
              : 'Type a message...'
          }
          onChange={handleInputChange}
          value={message}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className='emoji'>
          <MdEmojiEmotions onClick={handleOpenEmojis} />
          <div className='picker'>
            <EmojiPicker open={openEmojis} onEmojiClick={handleAddEmoji} />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className='sendButton'
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
