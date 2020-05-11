import React from "react"

import { useAuth0 } from "../components/Auth0Provider"
import Button from "../components/Button"

import * as styles from './global.module.scss';

export default () => {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    logout,
    user
  } = useAuth0()

  const [ repositories, setRepositories ] = React.useState([])

  React.useEffect(() => {
    if (isAuthenticated && user !== undefined) {
      const makeRequest = async () => {
        const query = `
          query {
            viewer {
              repositories(first: 10) {
                edges {
                  node {
                    name
                    url
                  }
                }
              }
            }
          }
        `

        const request = {
          user_id: user.sub,
          query
        }

        const result = await fetch(
          process.env.GATSBY_PROXY_URL || "",
          {
            method: "POST",
            body: JSON.stringify(request)
          }
        )

        const data = await result.json()

        setRepositories(
          data.viewer.repositories.edges.map(({ node }) => node)
        )
      }

      makeRequest()
    }
  }, [isAuthenticated, user])

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

      <ul>
      {repositories.map(({ name, url }) => (
        <li key={name}><a href={url}>{name}</a></li>  
      ))}
      </ul>
    </div>
  )
}