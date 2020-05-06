import React from "react"

import { useAuth0 } from "../components/Auth0Provider"
import Button from "../components/Button"

import * as styles from './global.module.scss';

export default () => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  React.useEffect(() => console.log(user), [user])

  if (isLoading)
    return null

  return (
    <div className={styles.Container}>
      <h1>Welcome to <strong>Marathon</strong>{user ? `, ${user.nickname}` : ""}!</h1>
      {
      !isAuthenticated 
      ? <Button onClick={() => loginWithRedirect()}>Sign In</Button>
      : <Button onClick={() => logout()}>Sign Out</Button>
      }
    </div>
  )
}