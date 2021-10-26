import { useEffect } from 'react'
import { ResetPasswordTemplate } from '../components/templates'

export default function ResetPassword() {
  useEffect(() => {
    document.title = 'Reset password | Postr'
  }, [])
  return <ResetPasswordTemplate />
}
