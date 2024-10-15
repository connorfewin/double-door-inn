/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShow = /* GraphQL */ `
  subscription OnCreateShow($filter: ModelSubscriptionShowFilterInput) {
    onCreateShow(filter: $filter) {
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
export const onUpdateShow = /* GraphQL */ `
  subscription OnUpdateShow($filter: ModelSubscriptionShowFilterInput) {
    onUpdateShow(filter: $filter) {
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
export const onDeleteShow = /* GraphQL */ `
  subscription OnDeleteShow($filter: ModelSubscriptionShowFilterInput) {
    onDeleteShow(filter: $filter) {
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
export const onCreateAdminSettings = /* GraphQL */ `
  subscription OnCreateAdminSettings(
    $filter: ModelSubscriptionAdminSettingsFilterInput
  ) {
    onCreateAdminSettings(filter: $filter) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAdminSettings = /* GraphQL */ `
  subscription OnUpdateAdminSettings(
    $filter: ModelSubscriptionAdminSettingsFilterInput
  ) {
    onUpdateAdminSettings(filter: $filter) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAdminSettings = /* GraphQL */ `
  subscription OnDeleteAdminSettings(
    $filter: ModelSubscriptionAdminSettingsFilterInput
  ) {
    onDeleteAdminSettings(filter: $filter) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
