import { gql } from "@apollo/client";
import { getApolloClient } from "./apollo-client";
import { getLocale } from "next-intl/server";

// Query to get all posts with optional filters for author, tag, category, and locale

export async function GET_ALL_POSTS() {
  const locale = (await getLocale()).toUpperCase();

  const apolloClient = getApolloClient();

  const data = gql`
    query GetAllPosts(
      $author: Int
      $tag: String
      $categoryId: Int
      $locale: LanguageCodeFilterEnum
    ) {
      posts(
        where: {
          author: $author
          tag: $tag
          categoryId: $categoryId
          language: $locale
        }
      ) {
        nodes {
          id
          title
          slug
          date
          excerpt
          content
          author {
            node {
              id
              name
              slug
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
          tags {
            nodes {
              id
              name
              slug
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `;
  const response = await apolloClient.query({
    query: data,
    variables: {
      locale,
    },
  });
  return response?.data?.posts?.nodes;
}
export async function GET_POST_BY_SLUG_FUNC(
  slug: string,
  locale: string = "EN"
) {
  const apolloClient = getApolloClient();
  const language = locale.toUpperCase(); // Ensure language is uppercase (e.g., EN, ES, FR)
  const decodeSlug = decodeURIComponent(slug);

  const query = gql`
    query GetPostBySlug($slug: String!, $language: LanguageCodeEnum!) {
      generalSettings {
        title
      }
      postBy(slug: $slug) {
        id
        content
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
        author {
          node {
            id
            name
            slug
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        translation(language: $language) {
          id
          slug
          content
          title
          excerpt
          date
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          author {
            node {
              id
              name
              slug
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
          language {
            slug
            locale
          }
        }
      }
    }
  `;

  try {
    const response = await apolloClient.query({
      query,
      variables: {
        slug: decodeSlug,
        language,
      },
    });

    if (response.errors) {
      console.error("GraphQL Errors:", response.errors);
      throw new Error("Failed to fetch post data");
    }

    const postBy = response?.data?.postBy;
    const translation = postBy?.translation;

    // Return the translated post if available, otherwise fallback to the default post
    const post = translation && translation.id ? translation : postBy;

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Let the caller handle the error (e.g., redirect to 404)
  }
}
