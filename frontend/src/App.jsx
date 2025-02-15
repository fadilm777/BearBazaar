import { useState } from 'react'
import { login, register } from './backend/auth'

import './App.css'

function LoginForm({ userId, setUserId }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted', e)

    try {
      const session = await login({
        email: e.target[0].value,
        password: e.target[1].value,
      });
      setUserId(session.userId);
      console.log(session);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <h1>Login</h1>

      {errorMessage && <p>{errorMessage}</p>}

      {userId ? <p>Logged in as {userId}</p> : (
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>)}
    </>
  )
}

function RegisterForm({ userId, setUserId }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log('Form submitted', e)

    try {
      const session = await register({
        email: e.target[0].value,
        username: e.target[1].value,
        password: e.target[2].value,
      });
      setUserId(session.userId);
      console.log(session);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  }

  if (userId) {
    return null;
  }

  return (
    <>
      <h1>Register</h1>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" />
        <input type="username" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </>
  )
}

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <>
      <h1> Hello world</h1>

      <LoginForm userId={userId} setUserId={setUserId} />
      <RegisterForm userId={userId} setUserId={setUserId} />
    </>
  )
}

export default App
