import styled from 'styled-components'
import { RegularButton } from '../atoms'
import { SimpleHeader } from '../molecules'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const Para = styled.p`
  padding: 1rem 2rem;
  color: var(--darkGrey);
`

const RegularButtonContainer = styled.div`
  width: 6rem;
  margin: 0 auto;
`

export default function SettingsResetPassword() {
  return (
    <>
      <SimpleHeader withArrow={true} arrowLink={ROUTES.SETTINGS}>
        Reset Password
      </SimpleHeader>
      <Para>
        Check you e-mail inbox to continue with the password reset process!
      </Para>
      <RegularButtonContainer>
        <Link to={ROUTES.SETTINGS}>
          <RegularButton color="blue"> Go back</RegularButton>
        </Link>
      </RegularButtonContainer>
    </>
  )
}
