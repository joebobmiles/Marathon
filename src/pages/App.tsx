import React from "react"

import { useAuth0 } from "../components/Auth0Provider"
import * as styles from './global.module.scss';

import Button from "../components/Button"

export default () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className={styles.Container}>
      <h1>Welcome to <strong>Marathon</strong>!</h1>
      <Button onClick={() => loginWithRedirect({})}>Sign In</Button>
    </div>
  )
}