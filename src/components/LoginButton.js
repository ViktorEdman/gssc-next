import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

export default function Component() {
  const [loginVisible, setLoginVisible] = useState(false)
  const toggleLogin = () => {
    setLoginVisible(!loginVisible)
  }

  //sign-in logic
  //signIn("credentials", {redirect: false, username: usernameInput, password: passwordInput})

  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      {/* Todo - make the sign-in window a pop-up instead of redirecting  */}
      <button onClick={() => /* toggleLogin() */
    signIn()}>Sign in</button>
      <div className="absolute bg-black rounded-lg mx-auto">{loginVisible
        ? "Sign in!"
        : null}
        </div>
    </>
  )
}