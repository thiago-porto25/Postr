import styled from 'styled-components'
import { Footer } from '../molecules'
import { Welcome } from '../organisms'

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 16fr 15fr;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }

  .start-img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--black);
    width: 100%;
    overflow: hidden;

    @media (max-width: 1000px) {
      height: 45vh;
      grid-row: 2;
    }

    img {
      width: 90%;
      object-fit: cover;
    }
  }

  .start-welcome-container {
    margin: 3rem auto;

    @media (max-width: 1000px) {
      height: 75vh;
      grid-row: 1;
    }

    @media (max-width: 550px) {
      padding: 1rem;
    }
  }
`

export default function StartTemplate() {
  return (
    <>
      <Container>
        <div className="start-img-container">
          <img src="/images/svgs/welcome.svg" alt="Join Postr" />
        </div>

        <div className="start-welcome-container">
          <Welcome />
        </div>
      </Container>

      <Footer />
    </>
  )
}
