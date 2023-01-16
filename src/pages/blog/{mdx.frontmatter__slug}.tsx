import { graphql } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/Seo";

interface IBlogPostProps {
  data: Queries.PostInfoQuery;
  children: any;
}

export default function BlogPost({ data, children }: IBlogPostProps) {
  const image = getImage(
    data.mdx?.frontmatter?.imgae?.childImageSharp?.gatsbyImageData!
  );

  console.log(data);
  return (
    <Layout>
      <GatsbyImage image={image as any} alt={data.mdx?.frontmatter?.title!} />
      <div>{children}</div>
    </Layout>
  );
}

export const query = graphql`
  query PostInfo($frontmatter__slug: String) {
    mdx(frontmatter: { slug: { eq: $frontmatter__slug } }) {
      id
      body
      frontmatter {
        author
        category
        date
        slug
        title
        imgae {
          childImageSharp {
            gatsbyImageData(height: 500, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: IBlogPostProps) => (
  <Seo title={data.mdx?.frontmatter?.title ?? "Post Info"} />
);
