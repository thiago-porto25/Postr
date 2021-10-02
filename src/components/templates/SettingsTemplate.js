import { LoggedInLayout } from '../layouts'
import {
  SettingsOrg,
  EditInfo,
  SettingsResetPassword,
  DeleteAccount,
} from '../organisms'
import { useContext, useState } from 'react'
import UserContext from '../../context/userContext'

export default function SettingsTemplate() {
  const { user } = useContext(UserContext)
  const [editInfoSection, setEditInfoSection] = useState(false)
  const [resetSection, setResetSection] = useState(false)
  const [deleteSection, setDeleteSection] = useState(false)

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      {!deleteSection && !editInfoSection && !resetSection ? (
        <SettingsOrg
          setEditInfoSection={setEditInfoSection}
          setResetSection={setResetSection}
          setDeleteSection={setDeleteSection}
          user={user}
        />
      ) : null}

      {editInfoSection && (
        <EditInfo user={user} setEditInfoSection={setEditInfoSection} />
      )}

      {resetSection && (
        <SettingsResetPassword user={user} setResetSection={setResetSection} />
      )}

      {deleteSection && (
        <DeleteAccount user={user} setDeleteSection={setDeleteSection} />
      )}
    </LoggedInLayout>
  )
}
