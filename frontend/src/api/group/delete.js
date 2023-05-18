import { gql } from "@apollo/client";

export const DELETE_GROUP = gql`
  mutation deleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`
