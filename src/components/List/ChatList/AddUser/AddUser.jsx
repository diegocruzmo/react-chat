import './addUser.css'

const AddUser = () => {
  return (
    <div className='add-user'>
      <form>
        <input type='text' placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      <div className='user'>
        <div className='detail'>
          <img src='./default.png' alt='avatar' />
          <p>Joe Code</p>
        </div>
        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser
