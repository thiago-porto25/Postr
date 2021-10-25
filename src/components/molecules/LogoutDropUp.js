import { useEffect } from 'react'
import styled from 'styled-components'
import { UserInfo } from '.'
import { logoutWithFirebase } from '../../services/authServices'

const Container = styled.div`
  box-shadow: 0px 0px 5px #00000044;
  border-radius: 10px;
  background-color: var(--white);
  width: 15rem;
  height: 7rem;
  position: absolute;
  z-index: 999;
  top: -10rem;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  cursor: pointer;

  div {
    height: 3rem;
  }

  p {
    transition: 150ms ease;
    padding: 1rem 1rem;
    padding-top: 0.7rem;
    padding-bottom: 1.8rem;
    border-radius: 30px;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      background-color: var(--xLightGrey);
    }
  }
`

export default function LogoutDropUp({ userNeeded, setLogoutDrop }) {
  const handleLogout = async () => {
    await logoutWithFirebase({ setMessage: null })
  }

  useEffect(() => {
    const handleClose = (e) => {
      const dropUp = document.querySelector('.user-drop-up')

      if (e.target !== dropUp) setLogoutDrop(false)
    }

    window.addEventListener('click', handleClose)

    return () => window.removeEventListener('click', handleClose)
  }, [setLogoutDrop])

  return (
    <Container className="user-drop-up">
      <UserInfo userNeeded={userNeeded} />
      <p onClick={handleLogout}>Log out of @{userNeeded?.username}</p>
    </Container>
  )
}
