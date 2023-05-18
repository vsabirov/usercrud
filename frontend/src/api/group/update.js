import { gql } from "@apollo/client";

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: Int!, $name: String!, $permissions: String!) {
    updateGroup(id: $id, name: $name, permissions: $permissions)
  }
`
