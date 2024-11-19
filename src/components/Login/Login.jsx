import { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  })

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
  }

  const handleRegister = (e) => {
    e.preventDefault()
  }

  return (
    <div className='login'>
      <div className='item-login'>
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <button>Sign In</button>
        </form>
      </div>
      <div className='separator'></div>
      <div className='item-login'>
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input type='text' name='username' placeholder='Username' />
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='password' />
          <label htmlFor='file'>
            <img src={avatar.url || './default.png'} alt='avatar' />
            Upload an image
          </label>
          <input
            onChange={handleAvatar}
            type='file'
            name='file'
            id='file'
            style={{ display: 'none' }}
          />
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Login
