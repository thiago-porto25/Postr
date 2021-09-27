import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LinkAuth = styled(Link)`
  text-decoration: none;
  color: var(--primary);

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 310px) {
    font-size: 14px;
  }
`

export default function AuthLink({ children, ...rest }) {
  return <LinkAuth {...rest}>{children}</LinkAuth>
}
