import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Logo, BigButton, LeftBarListItem } from '../atoms'
import { LoggedInUserCard, LogoutDropUp } from '../molecules'
import * as ROUTES from '../../constants/routes'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

    .leftbar-logo {
      width: 30px;
      height: 30px;
    }

    &:hover {
      background-color: var(--xLightGrey);
    }
  }
  .leftbar-big-button-container {
    button {
      height: 3.5rem;
      font-size: 19px;
    }
  }
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export default function LeftBar() {
  return (
    <Container>
      <Link to={ROUTES.HOME}>
        <div className="leftbar-logo-container">
          <div className="leftbar-logo">
            <Logo />
          </div>
        </div>
      </Link>
      <List></List>
      <div className="leftbar-big-button-container">
        <BigButton color="blue">Post</BigButton>
      </div>
    </Container>
  )
}
