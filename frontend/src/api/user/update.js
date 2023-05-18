import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation updateUser($id: Int!, $username: String!) {
    updateUser(id: $id, username: $username)
  }
`
