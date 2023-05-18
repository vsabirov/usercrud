import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!) {
    createUser(username: $username)
  }
`
