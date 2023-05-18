import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($id: Int!, $userId: Int!) {
    addUser(id: $id, userId: $userId)
  }
`
