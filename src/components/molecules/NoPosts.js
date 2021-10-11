import styled from 'styled-components'

const Para = styled.p`
  color: var(--darkGrey);
  text-align: center;
  padding: 2rem 6rem;
  box-sizing: border-box;
  font-size: 20px;
`

export default function NoPosts({ children }) {
  return <Para>{children}</Para>
}
