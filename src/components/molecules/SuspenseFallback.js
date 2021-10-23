import { Spinner } from '../atoms'
import styled from 'styled-components'

const Container = styled.main`
  height: 100vh;
  width: 100%;

  .spinner-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    * {
      width: 56px;
      height: 56px;
      border-top: 4px solid var(--xxLightGrey);
      border-right: 4px solid var(--xxLightGrey);
      border-bottom: 4px solid var(--xxLightGrey);
      border-left: 4px solid var(--primary);
    }
  }
`

export default function SuspenseFallback() {
  return (
    <Container>
      <div className="spinner-container">
        <Spinner />
      </div>
    </Container>
  )
}
