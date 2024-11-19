import { FaSearch } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import './chatList.css'
import { useState } from 'react'
import AddUser from './AddUser/AddUser'

const ChatList = () => {
  const [addUser, setAddUser] = useState(false)

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
          <FaPlus onClick={handleAdd} />
        ) : (
          <FaMinus onClick={handleAdd} />
        )}
      </div>

      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      <div className='item'>
        <img src='./avatar.jpg' alt='Username' />
        <div className='texts'>
          <span>Jane Doe</span>
          <p>Hello</p>
        </div>
      </div>
      {addUser && <AddUser />}
    </div>
  )
}

export default ChatList
