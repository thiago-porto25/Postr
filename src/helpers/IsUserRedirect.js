import { Route, Redirect } from 'react-router-dom'

export default function IsUserRedirect({
  user,
  loggedInPath,
  children,
  ...restProps
}) {
  return (
    <Route {...restProps}>
      {!user && children}
      {user && <Redirect to={{ pathname: loggedInPath }} />}
    </Route>
  )
}
