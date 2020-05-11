import { graphql, navigate } from 'gatsby';
import * as React from 'react';

import Auth0Provider from "../components/Auth0Provider"
import App from "./App"

interface LandingPageProps {
  data?: {
    site: {
      siteMetadata: {
        name: string;
        tagline: string;
      },
    },
  };
}

export const indexPageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        name
        tagline
      }
    }
  }
`;

const onRedirectCallback = (appState: any) => {
  navigate(
    appState && appState.targetUrl
    ? appState.targetUrl
    : window.location.pathname
  )
}

export default (props: LandingPageProps) => (
  <Auth0Provider
    domain={process.env.GATSBY_AUTH0_DOMAIN || ""}
    client_id={process.env.GATSBY_AUTH0_CLIENTID || ""}
    redirect_uri={process.env.GATSBY_AUTH0_CALLBACK || ""}
    onRedirectCallback={onRedirectCallback}
  >
    <App/>
  </Auth0Provider>
)
