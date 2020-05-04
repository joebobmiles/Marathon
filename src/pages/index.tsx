import { graphql } from 'gatsby';
import * as React from 'react';
import * as styles from './global.module.scss';

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
  const {
    name, tagline
  } = data.site.siteMetadata

  return (
    <div className={styles.Container}>
      <h1>{name}</h1>
      <p>{tagline}</p>
    </div>
  )
}
