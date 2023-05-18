import { gql } from "@apollo/client";

export const GET_ALL_GROUPS = gql`
  query {
    getAllGroups {
      id
      name
      permissions
      
      users {
        username
      }
    }
  }
`
