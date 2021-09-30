import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const Image = styled.img`
  width: 100%;
  height: 100%;
`

export default function Logo({ noLink }) {
  const ImageComp = <Image src="/images/logo.png" alt="Postr Logo" />

  if (noLink) return ImageComp

  return <Link to={ROUTES.HOME}>{ImageComp}</Link>
}
