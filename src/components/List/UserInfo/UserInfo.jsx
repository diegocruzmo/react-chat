import { FaEdit } from 'react-icons/fa'
import { BsCameraVideo } from 'react-icons/bs'
import { IoIosMore } from 'react-icons/io'
import { useUserStore } from '../../../lib/userStore'
import './userInfo.css'

const UserInfo = () => {
  const { currentUser } = useUserStore()

  return (
    <div className='userInfo'>
      <div className='user'>
        <img src='./default.png' alt='avatar' />
        <h5>{currentUser.username}</h5>
      </div>

      <div className='icons'>
        <IoIosMore />
        <BsCameraVideo />
        <FaEdit />
      </div>
    </div>
  )
}

export default UserInfo
