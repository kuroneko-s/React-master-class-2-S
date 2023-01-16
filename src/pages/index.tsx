import * as React from "react";
import { PageProps, graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/Seo";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

const IndexPage = ({ data }: PageProps<Queries.StickersQuery>) => {
  console.log(data);
  return (
    <Layout title="Main Page">
      {data.allContentfulStickers.nodes.map((sticker, idx) => (
        <article key={idx}>
          <GatsbyImage
            image={getImage(sticker.preview?.gatsbyImageData!)!}
            alt={sticker.preview?.title!}
          />
          <Link to={`/products/${sticker.id}`}>
            <h3>{sticker.name}</h3>
            <h4>${sticker.price}</h4>
          </Link>
        </article>
      ))}
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query Stickers {
    allContentfulStickers {
      nodes {
        id
        name
        price
        preview {
          gatsbyImageData(placeholder: BLURRED, height: 400)
          sys {
            type
            revision
          }
          title
        }
      }
    }
  }
`;

export const Head = () => <Seo title="Home Page" />;
