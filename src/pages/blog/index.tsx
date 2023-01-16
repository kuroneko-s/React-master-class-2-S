import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/Seo";
import { graphql, PageProps, Link } from "gatsby";

export default function Blog({ data }: PageProps<Queries.BlogPostsQuery>) {
  console.log(data);
  return (
    <Layout title="Blog">
      <section className="grid">
        {data.allMdx.nodes.map((file, idx) => (
          <article key={idx}>
            <Link to={`/blog/${file.frontmatter?.slug}`}>
              <h3>{file.frontmatter?.title}</h3>
              <h5>{file.frontmatter?.author}</h5>
              <h6>{file.frontmatter?.date}</h6>
              <p>{file.excerpt}</p>
            </Link>
          </article>
        ))}
      </section>
    </Layout>
  );
}

// graphql을 돌려서 nextjs에서 서버에서 값 불러와주는 그거 비스무리하게 동작해서 컴포넌트에 값 넘겨줌
export const query = graphql`
  query BlogPosts {
    allMdx {
      nodes {
        frontmatter {
          category
          title
          slug
          date(formatString: "YYYY.MM.DD")
          author
        }

        excerpt(pruneLength: 25)
      }
    }
  }
`;

export const Head = () => <Seo title="Blog" />;
