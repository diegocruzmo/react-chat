import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDown } from 'react-icons/fa'
import { IoMdDownload } from 'react-icons/io'
import './detail.css'

const Detail = () => {
  return (
    <div className='detail'>
      <div className='user'>
        <img src='./avatar.jpg' alt='avatar' />
        <h2>Mark Hoppus</h2>
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
                <span>photo_1998.jpg</span>
              </div>
              <IoMdDownload />
            </div>

            <div className='photoItem'>
              <div className='photoDetail'>
                <img src='./mark.jpg' alt='user image' />
                <span>photo_1998.jpg</span>
              </div>
              <IoMdDownload />
            </div>

            <div className='photoItem'>
              <div className='photoDetail'>
                <img src='./mark.jpg' alt='user image' />
                <span>photo_1998.jpg</span>
              </div>
              <IoMdDownload />
            </div>

            <div className='photoItem'>
              <div className='photoDetail'>
                <img src='./mark.jpg' alt='user image' />
                <span>photo_1998.jpg</span>
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
          <button className='block'>Block User</button>
          <button className='logout'>Log out</button>
        </div>
      </div>
    </div>
  )
}

export default Detail
