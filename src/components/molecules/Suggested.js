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

  &.white {
    background-color: var(--white);
  }

  &.border-grey {
    border-bottom: 1px solid var(--xLightGrey);
    border-radius: 0;
  }

  .suggested-title {
    font-size: 19px;
    font-family: 'Ubuntu', sans-serif;
    margin-top: 0;
    padding: 0 1.5rem;
  }
`

export default function Suggested({
  bg,
  bottomBorder,
  setProfileUser,
  profileUser,
}) {
  const [suggestedUsers, setSuggestedUsers] = useState()
  const { user } = useContext(UserContext)

  useEffect(() => {
    const getSuggested = async () => {
      const follows = await getSuggestedFollows({ user })
      setSuggestedUsers(follows)
    }

    if (user) getSuggested()
  }, [user])

  return suggestedUsers && suggestedUsers.length > 0 ? (
    <Container className={`${bg} ${bottomBorder}`}>
      <h1 className="suggested-title">Suggested follows</h1>
      {suggestedUsers
        ? suggestedUsers.map((suggestedUser, i) => {
            if (i <= 2)
              return (
                <FollowUserCard
                  user={user}
                  setProfileUser={setProfileUser}
                  profileUser={profileUser}
                  suggestedUser={suggestedUser}
                  key={suggestedUser.id}
                />
              )
            else return null
          })
        : null}
    </Container>
  ) : null
}
