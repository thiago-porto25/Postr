import { Logo, BigButton } from '../atoms'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const Container = styled.section`
  width: 100%;
  height: 100%;

  .start-logo-container {
    width: 40px;
    height: 40px;
  }

  .start-text-container {
    width: fit-content;

    h1 {
      width: fit-content;
      font-size: 70px;

      @media (max-width: 1150px) {
        font-size: 60px;
      }

      @media (max-width: 1000px) {
        font-size: 70px;
      }

      @media (max-width: 550px) {
        font-size: 55px;
      }

      @media (max-width: 320px) {
        font-size: 40px;
      }
    }
  }

  .start-sub-container {
    width: 280px;

    button:last-of-type {
      margin-top: 0.7rem;
    }

    h3 {
      width: fit-content;
      font-size: 36px;

      @media (max-width: 400px) {
        width: 100%;
      }

      @media (max-width: 340px) {
        font-size: 30px;
      }
    }
  }

  .start-sub-container,
  .start-text-container {
    font-family: 'Ubuntu', sans-serif;
    width: fit-content;
  }
`

export default function Welcome() {
  return (
    <Container>
      <div className="start-logo-container">
        <Logo />
      </div>

      <div className="start-text-container">
        <h1>Happening now</h1>
      </div>

      <div className="start-sub-container">
        <h3>Join Postr today.</h3>

        <Link to={ROUTES.LOGIN}>
          <BigButton color="blue">Log in</BigButton>
        </Link>
        <Link to={ROUTES.SIGNUP}>
          <BigButton color="black">Sign up</BigButton>
        </Link>
      </div>
    </Container>
  )
}
