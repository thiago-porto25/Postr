import styled from 'styled-components'
import * as ROUTES from '../../constants/routes'
import { LeftBarListItem } from '../atoms'
import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { BsPerson, BsFillPersonFill } from 'react-icons/bs'
import {
  IoSearchOutline,
  IoSearchSharp,
  IoSettingsOutline,
  IoSettingsSharp,
} from 'react-icons/io5'

const Container = styled.nav`
  display: none;
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 3.5rem;
  background-color: var(--white);
  border-top: 1px solid var(--xLightGrey);
  box-shadow: 0 0px 5px #00000033;

  a {
    color: var(--black);
  }

  @media (max-width: 660px) {
    display: flex;
  }
`

export default function MobileNav({ isOnFollows, setIsOnFollows, user }) {
  const handleLinkClick = () => {
    if (isOnFollows) {
      setIsOnFollows(false)
    }
  }

  return (
    <Container>
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
    </Container>
  )
}
