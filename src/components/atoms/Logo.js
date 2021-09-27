import styled from 'styled-components'

const Image = styled.img`
  width: 100%;
  height: 100%;
`

export default function Logo() {
  return <Image src="/images/logo.png" alt="Postr Logo" />
}
