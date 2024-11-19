import { FaEdit } from 'react-icons/fa'
import { BsCameraVideo } from 'react-icons/bs'
import { IoIosMore } from 'react-icons/io'

import './userInfo.css'

const UserInfo = () => {
  return (
    <div className='userInfo'>
      <div className='user'>
        <img src='./avatar.jpg' alt='Tom Delonge' />
        <h5>Tom Delonge</h5>
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
