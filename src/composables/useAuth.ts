import type { Credentials, Sesion } from "../lib/types"
import { useRouter } from "vue-router"
import { computed } from 'vue'

export const useAuth = () => {
  const router = useRouter()

  const logIn = (credentials: Credentials) => {
    const username = credentials.email.split('@')[0]
    const session: Sesion = { email: credentials.email, username }
    localStorage.setItem('session', JSON.stringify(session))
    router.push("/")
  }

  const logOut = () => {
    localStorage.removeItem('session')
    router.push('/login')
  }

  const session = computed(() => {
    const data = localStorage.getItem('session')
    return data ? JSON.parse(data) as Sesion : null
  })

  return { logIn, logOut, session }
}
