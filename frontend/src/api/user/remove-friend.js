import { gql } from "@apollo/client";

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: Int!, $friendId: Int!) {
    removeFriend(id: $id, friendId: $friendId)
  }
`
