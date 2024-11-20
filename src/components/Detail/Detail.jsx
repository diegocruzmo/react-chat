import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDown } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import { auth } from '../../lib/firebase'
import './detail.css'
import { useChatStore } from '../../lib/chatStore'
import { useUserStore } from '../../lib/userStore'
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../lib/firebase'

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
    useChatStore()
  const { currentUser } = useUserStore()

  const handleBlock = async () => {
    if (!user) return
    const userDocRef = doc(db, 'users', currentUser.id)

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      })
      changeBlock()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='detail'>
      <div className='user'>
        <img src='./default.png' alt='avatar' />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>

      <div className='info'>
        <div className='option'>
          <div className='title'>
            <span>Chat Settings</span>
            <FaArrowUp />
          </div>
        </div>

        <div className='option'>
          <div className='title'>
            <span>Privacy & help</span>
            <FaArrowUp />
          </div>
        </div>

        <div className='option'>
          <div className='title'>
            <span>Shared photos</span>
            <FaArrowDown />
          </div>
          <div className='photos'>
            <div className='photoItem'>
              <div className='photoDetail'>
                <img src='./mark.jpg' alt='user image' />
                <span>24053523.jpg</span>
              </div>
              <IoMdDownload />
            </div>
          </div>
        </div>

        <div className='option'>
          <div className='title'>
            <span>Shared Files</span>
          </div>
        </div>
        <div className='buttons'>
          <button onClick={handleBlock} className='block'>
            {isCurrentUserBlocked
              ? 'You are Blocked!'
              : isReceiverBlocked
              ? 'User Blocked!'
              : 'Block User'}
          </button>
          <button onClick={() => auth.signOut()} className='logout'>
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Detail
