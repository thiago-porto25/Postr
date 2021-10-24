import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

const Item = styled.li`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding-left: 1rem;
  font-family: 'Ubuntu', sans-serif;
  @media (max-width: 1200px) {
    width: fit-content;
    padding: 1rem;
  }

  p {
    font-size: 20px;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  svg {
    width: fit-content;
    font-size: 27px;
  }
`

export default function LeftBarListItem({ icons, children, to, ...rest }) {
  const [active, setActive] = useState(false)
  let navLinkRef = useRef(null)

  useEffect(() => {
    if (navLinkRef.current && navLinkRef.current.className === 'active')
      setActive(true)
  }, [navLinkRef])

  return (
    <NavLink
      {...rest}
      ref={(el) => {
        navLinkRef.current = el
      }}
      exact
      to={to}
      activeStyle={{ fontWeight: 'bold' }}
    >
      <Item>
        {active ? icons.fill : icons.outline}
        <p>{children}</p>
      </Item>
    </NavLink>
  )
}
