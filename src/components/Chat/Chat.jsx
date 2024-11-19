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

const Chat = () => {
  const [openEmojis, setOpenEmojis] = useState(false)
  const [message, setMessage] = useState('')

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

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

  const handleSubmit = () => {
    console.log(message)
  }

  return (
    <div className='chat'>
      <div className='top'>
        <div className='user'>
          <img src='./avatar.jpg' alt='user profile image' />
          <div className='texts'>
            <span>Mark Hoppus</span>
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
        <div className='message'>
          <img src='./avatar.jpg' alt='avatar' />
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
              labore nisi nihil sapiente ea explicabo libero vitae quas sit ad,
              repellat illo delectus eligendi quaerat molestias! Odit labore nam
              non.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='message'>
          <img src='./avatar.jpg' alt='avatar' />
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
              labore nisi nihil sapiente ea explicabo libero vitae quas sit ad,
              repellat illo delectus eligendi quaerat molestias! Odit labore nam
              non.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='message own'>
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
              labore nisi nihil sapiente ea explicabo libero vitae quas sit ad,
              repellat illo delectus eligendi quaerat molestias! Odit labore nam
              non.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='message'>
          <img src='./avatar.jpg' alt='avatar' />
          <div className='texts'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
              labore nisi nihil sapiente ea explicabo libero vitae quas sit ad,
              repellat illo delectus eligendi quaerat molestias! Odit labore nam
              non.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className='message own'>
          <div className='texts'>
            <img src='./mark.jpg' alt='user image' />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio
              labore nisi nihil sapiente ea explicabo libero vitae quas sit ad,
              repellat illo delectus eligendi quaerat molestias! Odit labore nam
              non.
            </p>
            <span>1 min ago</span>
          </div>
          <div ref={endRef}></div>
        </div>
      </div>

      <div className='bottom'>
        <div className='icons'>
          <BiSolidLandscape />
          <FaCamera />
          <FaMicrophone />
        </div>
        <input
          type='text'
          placeholder='Type a message...'
          onChange={handleInputChange}
          value={message}
        />
        <div className='emoji'>
          <MdEmojiEmotions onClick={handleOpenEmojis} />
          <div className='picker'>
            <EmojiPicker open={openEmojis} onEmojiClick={handleAddEmoji} />
          </div>
        </div>
        <button onClick={handleSubmit} className='sendButton'>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
