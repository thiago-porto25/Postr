import { LoggedUserAvatar } from '../atoms'

export default function ProfileOrg({ user, posts }) {
  return (
    <div>
      <LoggedUserAvatar size="extra-larger" user={user} />
    </div>
  )
}
