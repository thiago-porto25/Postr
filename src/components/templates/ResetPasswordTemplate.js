import styled from 'styled-components'
import { ResetPasswordOrg } from '../organisms'

const Container = styled.main`
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 350px;
  width: 90%;
  height: calc(100vh - 4rem);
`

export default function ResetPasswordTemplate() {
  return (
    <Container>
      <ResetPasswordOrg />
    </Container>
  )
}
