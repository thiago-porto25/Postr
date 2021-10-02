import { SimpleHeader } from '../molecules'
import * as ROUTES from '../../constants/routes'

export default function DeleteAccount() {
  return (
    <div>
      <SimpleHeader withArrow={true} arrowLink={ROUTES.SETTINGS}>
        Delete Account
      </SimpleHeader>
      delete
    </div>
  )
}
