import { useSession,  signOut } from "next-auth/react"
import { useState } from "react"
import LoginForm from "./LoginForm"

export default function Component() {
  const [loginVisible, setLoginVisible] = useState(false)
  const toggleLogin = () => {
    setLoginVisible(!loginVisible)
  }


  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <button className="hover:text-white" onClick={() => {
          setLoginVisible(false)
          signOut({redirect: false})
          }}>Sign out {session.user.name}</button>
      </>
    )
  }
  return (
    <>
      <button className="hover:text-white" onClick={() => toggleLogin()}>Sign in</button>
      {loginVisible
        ? <LoginForm toggleLogin={toggleLogin}></LoginForm>
        : null}
    </>
  )
}