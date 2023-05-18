import { gql } from "@apollo/client";

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $permissions: String!) {
    createGroup(name: $name, permissions: $permissions)
  }
`
