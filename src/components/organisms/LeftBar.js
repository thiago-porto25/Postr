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
import { FaEnvelope, FaRegEnvelope } from 'react-icons/fa'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  position: relative;

  .leftbar-logo-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 150ms ease;

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
  }

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
      margin-left: -20px;
      font-size: 15px;
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
  }
`

export default function LeftBar() {
  const user = { username: 'thiagoporto' }

  return (
    <Container>
      <Link to={ROUTES.HOME}>
        <div className="leftbar-logo-container">
          <div className="leftbar-logo">
            <Logo noLink={true} />
          </div>
        </div>
      </Link>

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
          to={ROUTES.MESSAGES}
          icons={{ outline: FaRegEnvelope(), fill: FaEnvelope() }}
        >
          Messages
        </LeftBarListItem>

        <LeftBarListItem
          to={`/p/${user.username}`}
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
        <BigButton color="blue">Post</BigButton>
      </div>

      <div className="leftbar-user-card-container">
        <UserInfo />
        <BsThreeDots />
      </div>

      <div className="leftbar-drop-up-container">
        <LogoutDropUp />
      </div>
    </Container>
  )
}
