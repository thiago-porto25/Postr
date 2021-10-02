import { useState } from 'react'
import styled from 'styled-components'
import { BigButton, SpecialInput } from '../atoms'
import { signupWithFirebase } from '../../services/authServices'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  button:last-of-type {
    margin-top: 1.5rem;
  }

  .signup-special-input-container {
    height: 3rem;
  }
`

export default function SignupForm({ setMessage }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)

  const isDisabled =
    email.length > 7 &&
    password.length > 5 &&
    name.length > 2 &&
    username.length > 1 &&
    passwordConfirmation === password &&
    !loading
      ? false
      : true

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    await signupWithFirebase({
      name,
      username,
      email,
      password,
      setMessage,
      setLoading,
      setEmail,
      setPassword,
      setPasswordConfirmation,
      setUsername,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="signup-special-input-container">
        <SpecialInput
          type="text"
          placeholder="Name"
          maxLength="30"
          minLength="3"
          inputValue={name}
          setInputValue={setName}
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="text"
          placeholder="Username"
          maxLength="18"
          minLength="2"
          inputValue={username}
          setInputValue={setUsername}
          pattern="[A-Za-z0-9_]+"
          title="Username must only contain letters, numbers and the underscore character ( _ )"
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="email"
          placeholder="E-mail"
          maxLength="40"
          minLength="8"
          inputValue={email}
          setInputValue={setEmail}
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="password"
          placeholder="Password"
          maxLength="15"
          minLength="6"
          inputValue={password}
          setInputValue={setPassword}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="password"
          placeholder="Confirm password"
          maxLength="15"
          minLength="6"
          inputValue={passwordConfirmation}
          setInputValue={setPasswordConfirmation}
        />
      </div>

      <BigButton
        isLoading={loading}
        disabled={isDisabled}
        type="submit"
        color="blue"
      >
        Sign up
      </BigButton>
    </Form>
  )
}
