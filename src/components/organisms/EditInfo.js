import styled from 'styled-components'
import { SimpleHeader } from '../molecules'
import * as ROUTES from '../../constants/routes'

export default function EditInfo({ user }) {
  return (
    <>
      <SimpleHeader withArrow={true} arrowLink={ROUTES.SETTINGS}>
        Edit Account Information
      </SimpleHeader>
    </>
  )
}
