import { useEffect } from 'react'
import { SettingsTemplate } from '../components/templates'

export default function Settings() {
  useEffect(() => {
    document.title = 'Settings | Postr'
  }, [])
  return <SettingsTemplate />
}
