import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id)
  }
`
