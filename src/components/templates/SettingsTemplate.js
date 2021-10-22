import { LoggedInLayout } from '../layouts'
import {
  SettingsOrg,
  EditInfo,
  SettingsResetPassword,
  DeleteAccount,
} from '../organisms'
import { useContext } from 'react'
import UserContext from '../../context/userContext'
import { Switch, Route } from 'react-router'
import * as ROUTES from '../../constants/routes'

export default function SettingsTemplate() {
  const { user, authUser } = useContext(UserContext)

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <Switch>
        <Route exact path={ROUTES.SETTINGS}>
          <SettingsOrg user={user} />
        </Route>

        <Route path={ROUTES.SETTINGS_EDIT}>
          <EditInfo user={user} />
        </Route>

        <Route path={ROUTES.SETTINGS_RESET}>
          <SettingsResetPassword user={user} />
        </Route>

        <Route path={ROUTES.SETTINGS_DELETE}>
          <DeleteAccount user={authUser} />
        </Route>
      </Switch>
    </LoggedInLayout>
  )
}
