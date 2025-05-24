import { gql } from "@apollo/client";
import { useLocale } from "next-intl";
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

// export async function GET_ALL_POSTS() {
//   gql`
//     query GetAllPosts(
//       $author: ID
//       $tag: ID
//       $category: ID
//       $locale: LanguageCodeFilterEnum
//     ) {
//       posts(
//         where: {
//           author: $author
//           tag: $tag
//           category: $category
//           language: $locale
//         }
//       ) {
//         nodes {
//           id
//           title
//           slug
//           date
//           excerpt
//           content
//           author {
//             node {
//               id
//               name
//               slug
//             }
//           }
//           categories {
//             nodes {
//               id
//               name
//               slug
//             }
//           }
//           tags {
//             nodes {
//               id
//               name
//               slug
//             }
//           }
//           featuredImage {
//             node {
//               sourceUrl
//               altText
//             }
//           }
//         }
//       }
//     }
//   `;
// }
// Query to get a post by ID and locale
export const GET_POST_BY_ID = gql`
  query GetPostById($id: ID!, $locale: LanguageCodeFilterEnum) {
    post(id: $id, idType: DATABASE_ID, language: $locale) {
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
`;

// Query to get a post by slug and locale
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!, $locale: LanguageCodeFilterEnum) {
    post(id: $slug, idType: SLUG, language: $locale) {
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
`;

// Query to get all categories with locale
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories($locale: LanguageCodeFilterEnum) {
    categories(where: { language: $locale }) {
      nodes {
        id
        name
        slug
        description
      }
    }
  }
`;

// Query to get category by ID and locale
export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: ID!, $locale: LanguageCodeFilterEnum) {
    category(id: $id, idType: DATABASE_ID, language: $locale) {
      id
      name
      slug
      description
    }
  }
`;

// Query to get category by slug and locale
export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!, $locale: LanguageCodeFilterEnum) {
    category(id: $slug, idType: SLUG, language: $locale) {
      id
      name
      slug
      description
    }
  }
`;

// Query to get posts by category ID and locale
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($categoryId: ID!, $locale: LanguageCodeFilterEnum) {
    posts(where: { categoryId: $categoryId, language: $locale }) {
      nodes {
        id
        title
        slug
        date
      }
    }
  }
`;

// Query to get posts by tag ID and locale
export const GET_POSTS_BY_TAG = gql`
  query GetPostsByTag($tagId: ID!, $locale: LanguageCodeFilterEnum) {
    posts(where: { tagId: $tagId, language: $locale }) {
      nodes {
        id
        title
        slug
        date
      }
    }
  }
`;

// Query to get tags by post ID and locale
export const GET_TAGS_BY_POST = gql`
  query GetTagsByPost($postId: ID!, $locale: LanguageCodeFilterEnum) {
    post(id: $postId, idType: DATABASE_ID, language: $locale) {
      tags {
        nodes {
          id
          name
          slug
        }
      }
    }
  }
`;

// Query to get all tags with locale
export const GET_ALL_TAGS = gql`
  query GetAllTags($locale: LanguageCodeFilterEnum) {
    tags(where: { language: $locale }) {
      nodes {
        id
        name
        slug
      }
    }
  }
`;

// Query to get tag by ID and locale
export const GET_TAG_BY_ID = gql`
  query GetTagById($id: ID!, $locale: LanguageCodeFilterEnum) {
    tag(id: $id, idType: DATABASE_ID, language: $locale) {
      id
      name
      slug
    }
  }
`;

// Query to get tag by slug and locale
export const GET_TAG_BY_SLUG = gql`
  query GetTagBySlug($slug: ID!, $locale: LanguageCodeFilterEnum) {
    tag(id: $slug, idType: SLUG, language: $locale) {
      id
      name
      slug
    }
  }
`;

// Query to get all pages with locale
export const GET_ALL_PAGES = gql`
  query GetAllPages($locale: LanguageCodeFilterEnum) {
    pages(where: { language: $locale }) {
      nodes {
        id
        title
        slug
        content
      }
    }
  }
`;

// Query to get page by ID and locale
export const GET_PAGE_BY_ID = gql`
  query GetPageById($id: ID!, $locale: LanguageCodeFilterEnum) {
    page(id: $id, idType: DATABASE_ID, language: $locale) {
      id
      title
      slug
      content
    }
  }
`;

// Query to get page by slug and locale
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!, $locale: LanguageCodeFilterEnum) {
    page(id: $slug, idType: SLUG, language: $locale) {
      id
      title
      slug
      content
    }
  }
`;

// Query to get all authors with locale
export const GET_ALL_AUTHORS = gql`
  query GetAllAuthors($locale: LanguageCodeFilterEnum) {
    users(where: { language: $locale }) {
      nodes {
        id
        name
        slug
        description
      }
    }
  }
`;

// Query to get author by ID and locale
export const GET_AUTHOR_BY_ID = gql`
  query GetAuthorById($id: ID!, $locale: LanguageCodeFilterEnum) {
    user(id: $id, idType: DATABASE_ID, language: $locale) {
      id
      name
      slug
      description
    }
  }
`;

// Query to get author by slug and locale
export const GET_AUTHOR_BY_SLUG = gql`
  query GetAuthorBySlug($slug: ID!, $locale: LanguageCodeFilterEnum) {
    user(id: $slug, idType: SLUG, language: $locale) {
      id
      name
      slug
      description
    }
  }
`;

// Query to get posts by author ID and locale
export const GET_POSTS_BY_AUTHOR = gql`
  query GetPostsByAuthor($authorId: ID!, $locale: LanguageCodeFilterEnum) {
    posts(where: { author: $authorId, language: $locale }) {
      nodes {
        id
        title
        slug
        date
      }
    }
  }
`;

// Query to get posts by author slug and locale
export const GET_POSTS_BY_AUTHOR_SLUG = gql`
  query GetPostsByAuthorSlug(
    $authorSlug: ID!
    $locale: LanguageCodeFilterEnum
  ) {
    user(id: $authorSlug, idType: SLUG, language: $locale) {
      id
      posts {
        nodes {
          id
          title
          slug
          date
        }
      }
    }
  }
`;

// Query to get featured media by ID and locale
export const GET_FEATURED_MEDIA_BY_ID = gql`
  query GetFeaturedMediaById($id: ID!, $locale: LanguageCodeFilterEnum) {
    mediaItem(id: $id, idType: DATABASE_ID, language: $locale) {
      id
      sourceUrl
      altText
    }
  }
`;
