import React, { useEffect, useState } from "react";

import { UserForm, UserList, UserEdit } from ".";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../api";

const UserPanel = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
  const [users, setUsers] = useState([])
  const [activeUser, setActiveUser] = useState(null)
  const [shouldResetActiveUser, setShouldResetActiveUser] = useState(false)

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers)

      if(shouldResetActiveUser && activeUser) {
        const newActiveUser = data.getAllUsers.find(user => user.id == activeUser.id)

        setActiveUser(newActiveUser)
      }
    }
  }, [data])

  return (
    <>
      <UserForm onCreated={() => refetch()} />
      <br /><br />

      <UserList users={users} loading={loading} getActionsForUser={(user) => (
          <button onClick={() => setActiveUser(user)}>Редактировать</button>
        )
      } />

      <UserEdit activeUser={activeUser} users={users} onEdit={(reset) => {
        refetch()

        if(reset) {
          setShouldResetActiveUser(true)
        }
        else {
          setShouldResetActiveUser(false)
        }
      }} />
    </>
  )
}

export { UserPanel };