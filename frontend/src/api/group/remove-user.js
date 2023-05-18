import { gql } from "@apollo/client";

export const REMOVE_USER = gql`
  mutation removeUser($id: Int!, $userId: Int!) {
    removeUser(id: $id, userId: $userId)
  }
`
