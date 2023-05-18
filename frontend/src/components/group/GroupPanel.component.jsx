import React, { useEffect, useState } from "react";

import { GroupEdit, GroupForm, GroupList } from ".";
import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS, GET_ALL_USERS } from "../../api";

const GroupPanel = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_GROUPS)
  const [groups, setGroups] = useState([])

  const [activeGroup, setActiveGroup] = useState(null)
  const [shouldResetActiveGroup, setShouldResetActiveGroup] = useState(false)

  useEffect(() => {
    if(!loading) {
      setGroups(data.getAllGroups)

      if(shouldResetActiveGroup && activeGroup) {
        const newActiveGroup = data.getAllGroups.find(group => group.id == activeGroup.id)

        setActiveGroup(newActiveGroup)
      }
    }
  }, [data])

  const [users, setUsers] = useState([])

  {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)

    useEffect(() => {
      if(!loading) {
        setUsers(data.getAllUsers)
      }
    }, [data])
  }

  return (
    <>
      <GroupForm onCreated={() => refetch()} />
      <br /><br />

      <GroupList groups={groups} loading={loading} getActionsForGroup={(group) => (
          <button onClick={() => setActiveGroup(group)}>Редактировать</button>
        )
      } />

      <GroupEdit activeGroup={activeGroup} groups={groups} users={users} onEdit={(reset) => {
        refetch()

        if(reset) {
          setShouldResetActiveGroup(true)
        }
        else {
          setShouldResetActiveGroup(false)
        }
      }} />
    </>
  )
}

export { GroupPanel };