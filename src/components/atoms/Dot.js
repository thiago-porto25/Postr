import styled from 'styled-components'

const DotDiv = styled.div`
  height: 4px;
  width: 4px;
  background-color: var(--black);
  border-radius: 50%;
`

export default function Dot() {
  return <DotDiv></DotDiv>
}
