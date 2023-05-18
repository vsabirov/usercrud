import { gql } from "@apollo/client";

export const ADD_FRIEND = gql`
  mutation addFriend($id: Int!, $friendId: Int!) {
    addFriend(id: $id, friendId: $friendId)
  }
`
