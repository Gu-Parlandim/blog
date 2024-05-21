import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import Title from "@components/Title";
import HomeHero from "@components/HomeHero";
import * as S from "@styles/homeStyles";
import PostBlogCard from "@components/PostBlogCard";
import SEO from "@components/SEO";

const IndexPage: React.FC<PageProps<Queries.LastBlogPostsQuery>> = ({
  data,
}) => {
  return (
    <>
      <HomeHero />
      <S.Container>
        <Title>Postagens recentes</Title>

        <S.PostContainer>
          {data.allMdx.nodes.map((node) => {
            const { frontmatter, id, excerpt } = node;

            return (
              <PostBlogCard
                id={id}
                key={id}
                date={frontmatter?.date}
                excerpt={excerpt || ""}
                slug={frontmatter?.slug || ""}
                title={frontmatter?.title || ""}
                tags={frontmatter?.tags || []}
              />
            );
          })}
        </S.PostContainer>
      </S.Container>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query LastBlogPosts {
    allMdx(sort: { frontmatter: { date: DESC } }, limit: 5) {
      nodes {
        frontmatter {
          date(formatString: "DD-MM-YYYY")
          title
          slug
          tags
        }
        id
        excerpt
      }
    }
  }
`;

export const Head: HeadFC = () => <SEO title="Home" />;
