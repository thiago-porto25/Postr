import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { FollowUserCard } from '.'
import UserContext from '../../context/userContext'
import { getSuggestedFollows } from '../../services/authServices'

const Container = styled.article`
  width: 100%;
  height: 100%;
  background-color: var(--xxLightGrey);
  border-radius: 10px;
  padding: 1rem 0;

  .suggested-title {
    font-size: 19px;
    font-family: 'Ubuntu', sans-serif;
    margin-top: 0;
    padding: 0 1.5rem;
  }
`

export default function Suggested() {
  const [suggestedUsers, setSuggestedUsers] = useState()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getSuggested = async () => {
      const follows = await getSuggestedFollows({ user })
      setSuggestedUsers(follows)
    }

    if (user) getSuggested()
  }, [user])

  return (
    <Container>
      <h1 className="suggested-title">Suggested follows</h1>
      {suggestedUsers
        ? suggestedUsers.map((suggestedUser, i) => {
            if (i <= 2)
              return (
                <FollowUserCard
                  suggestedUser={suggestedUser}
                  key={suggestedUser.id}
                />
              )
            else return null
          })
        : null}
    </Container>
  )
}
