import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function ProductInfo({ data }: PageProps<Queries.ProductQuery>) {
  console.log(data);

  return (
    <Layout title={data.contentfulStickers?.name!}>
      <div>
        <GatsbyImage
          image={getImage(data.contentfulStickers?.preview?.gatsbyImageData!)!}
          alt={data.contentfulStickers?.name!}
        />
        <h4>${data.contentfulStickers?.price}</h4>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Product($id: String) {
    contentfulStickers(children: {}, id: { eq: $id }) {
      name
      price
      preview {
        gatsbyImageData(height: 450, placeholder: BLURRED)
      }
    }
  }
`;
