'use client'
import fb, { useLogin } from 'firebase-util'
import RedirectSignIn from '@/_uis/tailwindcss/RedirectSignIn'
import { useRouter } from 'next/navigation'
import { AuthInfo } from '@/_features/config'
const login = () => {
  fb.init(AuthInfo)
  const { loginStatus, loginLoading } = useLogin()
  const router = useRouter()
  if (loginStatus) router.push('/')
  return loginLoading || loginStatus ? <p>Loading...</p> : <RedirectSignIn />
}

export default login
