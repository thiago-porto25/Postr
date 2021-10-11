import styled from 'styled-components'
import { Spinner } from '../atoms'

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 6rem;

  * {
    width: 35px;
    height: 35px;
    border-top: 4px solid var(--primary);
    border-right: 4px solid var(--primary);
    border-bottom: 4px solid var(--primary);
    border-left: 4px solid var(--lightGrey);
  }
`

export default function LoadingPage() {
  return (
    <Container>
      <Spinner />
    </Container>
  )
}
