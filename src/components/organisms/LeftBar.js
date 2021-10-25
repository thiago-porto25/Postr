import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Logo, BigButton, LeftBarListItem } from '../atoms'
import { UserInfo, LogoutDropUp } from '../molecules'
import * as ROUTES from '../../constants/routes'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { BsPerson, BsFillPersonFill } from 'react-icons/bs'
import {
  IoSearchOutline,
  IoSearchSharp,
  IoSettingsOutline,
  IoSettingsSharp,
} from 'react-icons/io5'
import { useState } from 'react'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  height: 100%;

  .leftbar-logo-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 150ms ease;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      background-color: var(--xLightGrey);
    }

    .leftbar-logo {
      width: 30px;
      height: 30px;
    }
  }

  .leftbar-big-button-container {
    button {
      height: 3.5rem;
      font-size: 19px;
    }

    @media (max-width: 1200px) {
      button {
        width: fit-content;
        padding: 0.9rem;

        span {
          display: none;
        }
      }
      .post {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
      }
    }
  }

  .leftbar-drop-user-card-container {
    position: relative;

    .leftbar-user-card-container {
      display: flex;
      width: 105%;
      align-items: center;
      padding: 10px 10px;
      border-radius: 30px;
      cursor: pointer;
      transition: 150ms ease;

      &:hover {
        background-color: var(--xLightGrey);
      }

      svg {
        margin-left: 5px;
        font-size: 15px;
      }

      @media (max-width: 1200px) {
        width: fit-content;

        svg,
        h2,
        sub {
          display: none;
        }
      }
    }

    .leftbar-drop-up-container {
      .user-drop-up {
        cursor: default;
      }
    }
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  * {
    width: 100%;
    transition: 150ms ease;
    color: var(--black);
    text-decoration: none;
    border-radius: 30px;

    &:hover {
      background-color: var(--xLightGrey);
    }

    @media (max-width: 1200px) {
      width: fit-content;
    }
  }
`

export default function LeftBar({
  user,
  setOpenModal,
  isOnFollows,
  setIsOnFollows,
}) {
  const [logoutDrop, setLogoutDrop] = useState(false)

  const handleLinkClick = () => {
    if (isOnFollows) {
      setIsOnFollows(false)
    }
  }

  return (
    <Container>
      <div className="leftbar-logo-container">
        <Link to={ROUTES.HOME}>
          <div className="leftbar-logo">
            <Logo noLink={true} />
          </div>
        </Link>
      </div>

      <List>
        <LeftBarListItem
          to={ROUTES.HOME}
          icons={{ outline: AiOutlineHome(), fill: AiFillHome() }}
        >
          Homepage
        </LeftBarListItem>

        <LeftBarListItem
          to={ROUTES.SEARCH}
          icons={{ outline: IoSearchOutline(), fill: IoSearchSharp() }}
        >
          Search
        </LeftBarListItem>

        <LeftBarListItem
          onClick={handleLinkClick}
          to={`/p/${user?.username}`}
          icons={{ outline: BsPerson(), fill: BsFillPersonFill() }}
        >
          Profile
        </LeftBarListItem>

        <LeftBarListItem
          to={ROUTES.SETTINGS}
          icons={{ outline: IoSettingsOutline(), fill: IoSettingsSharp() }}
        >
          Settings
        </LeftBarListItem>
      </List>

      <div className="leftbar-big-button-container">
        <BigButton onClick={() => setOpenModal(true)} color="blue">
          Post
        </BigButton>
      </div>

      <div className="leftbar-drop-user-card-container">
        <div
          onClick={() => setLogoutDrop((prev) => !prev)}
          className="leftbar-user-card-container"
        >
          <UserInfo userNeeded={user} />
          <BsThreeDots />
        </div>

        {logoutDrop && (
          <div className="leftbar-drop-up-container">
            <LogoutDropUp setLogoutDrop={setLogoutDrop} userNeeded={user} />
          </div>
        )}
      </div>
    </Container>
  )
}
