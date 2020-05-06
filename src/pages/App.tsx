import React from "react"

import { useAuth0 } from "../components/Auth0Provider"
import Button from "../components/Button"

import * as styles from './global.module.scss';

export default () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div className={styles.Container}>
      <h1>Welcome to <strong>Marathon</strong>!</h1>
      {
      !isAuthenticated 
      ? <Button onClick={() => loginWithRedirect()}>Sign In</Button>
      : <Button onClick={() => logout()}>Sign Out</Button>
      }
    </div>
  )
}