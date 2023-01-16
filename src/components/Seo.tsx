import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface ISeoProps {
  title: string;
}

export default function Head({ title }: ISeoProps) {
  const data = useStaticQuery<Queries.MyQueryQuery>(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <title>
      {title} | {data?.site?.siteMetadata?.title}
    </title>
  );
}
