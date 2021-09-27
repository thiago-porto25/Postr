import styled from 'styled-components'
import { AiOutlineGithub } from 'react-icons/ai'

const Foot = styled.footer`
  background-color: var(--xLightGrey);
  padding: 1rem 0;

  p {
    margin: 0 1.2rem;
    font-style: italic;
    font-size: 14px;
    text-align: center;

    a {
      color: var(--primary);
      text-decoration: none;
    }
  }
`

export default function Footer() {
  return (
    <Foot>
      <p>
        Web app created by{' '}
        <a href="https://github.com/thiago-porto25">
          <AiOutlineGithub /> Thiago Porto
        </a>
        .{` `}
        <a href="https://storyset.com/people">
          People illustrations by Storyset.
        </a>{' '}
        <a href="https://www.freepik.com/vectors/people">
          People vector created by pikisuperstar.
        </a>
      </p>
    </Foot>
  )
}
