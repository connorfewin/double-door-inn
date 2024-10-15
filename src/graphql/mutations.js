/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createShow = /* GraphQL */ `
  mutation CreateShow(
    $input: CreateShowInput!
    $condition: ModelShowConditionInput
  ) {
    createShow(input: $input, condition: $condition) {
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
export const updateShow = /* GraphQL */ `
  mutation UpdateShow(
    $input: UpdateShowInput!
    $condition: ModelShowConditionInput
  ) {
    updateShow(input: $input, condition: $condition) {
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
export const deleteShow = /* GraphQL */ `
  mutation DeleteShow(
    $input: DeleteShowInput!
    $condition: ModelShowConditionInput
  ) {
    deleteShow(input: $input, condition: $condition) {
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
export const createAdminSettings = /* GraphQL */ `
  mutation CreateAdminSettings(
    $input: CreateAdminSettingsInput!
    $condition: ModelAdminSettingsConditionInput
  ) {
    createAdminSettings(input: $input, condition: $condition) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAdminSettings = /* GraphQL */ `
  mutation UpdateAdminSettings(
    $input: UpdateAdminSettingsInput!
    $condition: ModelAdminSettingsConditionInput
  ) {
    updateAdminSettings(input: $input, condition: $condition) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAdminSettings = /* GraphQL */ `
  mutation DeleteAdminSettings(
    $input: DeleteAdminSettingsInput!
    $condition: ModelAdminSettingsConditionInput
  ) {
    deleteAdminSettings(input: $input, condition: $condition) {
      id
      lastUpdate
      createdAt
      updatedAt
      __typename
    }
  }
`;
