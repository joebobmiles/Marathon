import { graphql } from 'gatsby';
import * as React from 'react';
import * as styles from './global.module.scss';

import Button from "../components/Button"


interface LandingPageProps {
  data: {
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

export default ({ data }: LandingPageProps) => {
  const {} = data.site.siteMetadata

  return (
    <div className={styles.Container}>
      <h1>Welcome to <strong>Marathon</strong>!</h1>
      <Button>Sign In</Button>
    </div>
  )
}
