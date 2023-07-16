import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      assets {
        createdAt
        id
        publishedAt
        fileName
        url
        updatedAt
      }
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
      categories {
        id
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};
