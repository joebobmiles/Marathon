/**
 * This is code taken from the Auth0 "Getting Started" example for React. For a
 * better understanding of how this code works, it is highly recommended that
 * you take a look there.
 */

import React, { useContext } from "react"
import createAuth0Client, { Auth0ClientOptions, Auth0Client } from "@auth0/auth0-spa-js"


const DEFAULT_REDIRECT_CALLBACK = (appState: any) =>
  window.history.replaceState({}, document.title, window.location.pathname)

export const Auth0Context = React.createContext({})
export const useAuth0 = () => useContext(Auth0Context)


type Auth0ProviderProps = React.HTMLAttributes<{}> & Auth0ClientOptions & {
  onRedirectCallback: (typeof DEFAULT_REDIRECT_CALLBACK)
}

export default ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}: Auth0ProviderProps) => {

  const [ isAuthenticated, setIsAuthenticated ] = React.useState(false)
  const [ user, setUser ] = React.useState()
  const [ auth0Client, setAuth0Client ] = React.useState(({} as Auth0Client))
  const [ isLoading, setIsLoading ] = React.useState(true)
  const [ isPopupOpen, setIsPopupOpen ] = React.useState(false)

  React.useEffect(() => {

    const initAuth0 = async () => {

      const auth0FromHook = await createAuth0Client(initOptions)
      setAuth0Client(auth0FromHook)
       
      console.log(auth0FromHook)

      if (window.location.search.includes("code=") &&
          window.location.search.includes("state="))
      {
        const { appState } = await auth0FromHook.handleRedirectCallback()
        onRedirectCallback(appState)
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated()

      setIsAuthenticated(isAuthenticated)

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser()
        setUser(user)
      }

      setIsLoading(false)
    }

    initAuth0()

  }, [])

  const loginWithPopup = async (params = {}) => {

    setIsPopupOpen(true)

    try {
      await auth0Client.loginWithPopup(params)
    } catch (error) {
      console.error(error)
    } finally {
      setIsPopupOpen(false)
    }

    const user = await auth0Client.getUser()
    setUser(user)
    setIsAuthenticated(true)

  }

  const handleRedirectCallback = async () => {

    setIsLoading(true)

    await auth0Client.handleRedirectCallback()
    const user = await auth0Client.getUser()

    setIsLoading(false)

    setIsAuthenticated(true)
    setUser(user)
    
  }


  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        isPopupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p: any[]) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p: any[]) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p: any[]) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p: any[]) => auth0Client.getTokenWithPopup(...p),
        logout: (...p: any[]) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  )

}