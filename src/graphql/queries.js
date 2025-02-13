/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      title
      descripton
      author
      verified
      images
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        descripton
        author
        verified
        images
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getShow = /* GraphQL */ `
  query GetShow($id: ID!) {
    getShow(id: $id) {
      id
      date
      day
      headliner
      opener
      notes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listShows = /* GraphQL */ `
  query ListShows(
    $filter: ModelShowFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShows(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        day
        headliner
        opener
        notes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAdminSettings = /* GraphQL */ `
  query GetAdminSettings($id: ID!) {
    getAdminSettings(id: $id) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAdminSettings = /* GraphQL */ `
  query ListAdminSettings(
    $filter: ModelAdminSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdminSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastUpdate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
