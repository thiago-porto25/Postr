import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RegularButton } from '../atoms'
import { Footer } from '../molecules'
import * as ROUTES from '../../constants/routes'

const Container = styled.main`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50%;
    height: auto;
    object-fit: cover;

    @media (max-width: 600px) {
      width: 80%;
    }

    @media (max-width: 400px) {
      width: 100%;
    }
  }

  .not-found-text {
    color: var(--darkGrey);
    font-size: 18px;
    padding: 0 1rem;
    text-align: center;

    @media (max-width: 600px) {
      font-size: 16px;
    }
  }

  .not-found-btn-container {
    width: 6rem;
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
  }
`

export default function NotFoundTemplate() {
  return (
    <Container>
      <img src="/images/svgs/not-found.svg" alt="404 - page not found!" />

      <p className="not-found-text">
        Oops... This page doesn't exist! try searching for something else.
      </p>

      <div className="not-found-btn-container">
        <Link to={ROUTES.HOME}>
          <RegularButton color="blue">Go back</RegularButton>
        </Link>
      </div>

      <Footer />
    </Container>
  )
}
