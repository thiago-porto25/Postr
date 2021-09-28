import styled from 'styled-components'
import { SignupOrg } from '../organisms'

const Container = styled.main`
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 350px;
  width: 90%;
  height: calc(100vh - 4rem);

  @media (max-height: 600px) {
    height: 100vh;
  }
`

export default function SignupTemplate() {
  return (
    <Container>
      <SignupOrg />
    </Container>
  )
}
