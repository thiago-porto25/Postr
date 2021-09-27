import styled from 'styled-components'

const Title = styled.h1`
  font-family: 'Ubuntu', sans-serif;
  font-size: 30px;
  margin: 0;
`

export default function AuthTitle({ children }) {
  return <Title>{children}</Title>
}
