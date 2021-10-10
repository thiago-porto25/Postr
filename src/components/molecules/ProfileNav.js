import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid var(--xLightGrey);

  div {
    height: 3rem;
    transition: 200ms ease;
    width: 100%;
    cursor: pointer;
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    hr {
      color: var(--primary);
      background-color: var(--primary);
      height: 3px;
      border-radius: 15px;
      margin: 0;
    }

    p {
      width: fit-content;
      margin: 0;
      align-self: center;

      &.bold {
        align-self: flex-end;
        font-weight: bold;
      }
    }

    &:hover {
      background-color: var(--xLightGrey);
    }
  }
`

export default function ProfileNav({ setIsOn, isOn, first, second }) {
  return (
    <Container>
      <div onClick={() => setIsOn(false)}>
        <p className={!isOn ? 'bold' : ''}>{first}</p>
        {!isOn && <hr />}
      </div>
      <div onClick={() => setIsOn(true)}>
        <p className={isOn ? 'bold' : ''}>{second}</p>
        {isOn && <hr />}
      </div>
    </Container>
  )
}
