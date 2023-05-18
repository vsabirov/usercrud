import React, { useEffect, useState } from "react";

import { UserForm, UserList } from ".";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../api/user/get";

const UserPanel = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  return (
    <>
      <UserForm onCreated={() => refetch()} />
      <br /><br />
      <UserList users={users} loading={loading} onUpdate={() => refetch()} />
    </>
  )
}

export { UserPanel };