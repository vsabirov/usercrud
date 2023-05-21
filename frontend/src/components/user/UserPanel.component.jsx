import React, { useEffect, useState } from "react";

import { UserForm, UserList, UserEdit } from ".";

const UserPanel = ({ users, loading, refetchAll }) => {
  const [activeUser, setActiveUser] = useState(null)
  const [shouldResetActiveUser, setShouldResetActiveUser] = useState(false)

  useEffect(() => {
    if(shouldResetActiveUser && activeUser) {
      const newActiveUser = users.find(user => user.id == activeUser.id)

      setActiveUser(newActiveUser)
    }
  }, [users])

  return (
    <>
      <h2>Пользователи</h2>

      <UserForm onCreated={() => { 
        setTimeout(() => refetchAll(), 200) 
      }}
      />
      <br /><br />

      <UserList users={users} loading={loading} getActionsForUser={(user) => (
          <button onClick={() => setActiveUser(user)}>Редактировать</button>
        )
      } />
      <br /><br />

      <UserEdit activeUser={activeUser} users={users} onEdit={(reset) => {
        setTimeout(() => refetchAll(), 200)

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