import { useState } from 'react'
import './login.css'
import { toast } from 'react-toastify'
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ''
  })

  const [loading, setLoading] = useState(false)

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const { email, password } = Object.fromEntries(formData)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      e.target.reset()
      toast.success('Login successful!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const { username, email, password } = Object.fromEntries(formData)

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, 'users', res.user.uid), {
        username,
        email,
        id: res.user.uid,
        blocked: []
      })

      await setDoc(doc(db, 'userchats', res.user.uid), {
        chats: []
      })
      e.target.reset()
      setAvatar({ file: null, url: '' })
      toast.success('User registered successful!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login'>
      <div className='item-login'>
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type='email' name='email' placeholder='Email' />
          <input type='password' name='password' placeholder='Password' />
          <button disabled={loading}>{loading ? 'Loading' : 'Sign In'}</button>
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
          <button disabled={loading}>{loading ? 'Loading' : 'Sign Up'}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
