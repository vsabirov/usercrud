import React, { useEffect, useState } from "react";

import { GroupEdit, GroupForm, GroupList } from ".";

const GroupPanel = ({ users, groups, loading, refetchAll }) => {
  const [activeGroup, setActiveGroup] = useState(null)
  const [shouldResetActiveGroup, setShouldResetActiveGroup] = useState(false)

  useEffect(() => {
    if(shouldResetActiveGroup && activeGroup) {
      const newActiveGroup = groups.find(group => group.id == activeGroup.id)

      setActiveGroup(newActiveGroup)
    }
  }, [groups])

  return (
    <>
      <h2>Группы</h2>

      <GroupForm onCreated={() => { 
        setTimeout(() => refetchAll(), 200) 
      }}
      />
      <br /><br />

      <GroupList groups={groups} loading={loading} getActionsForGroup={(group) => (
          <button onClick={() => setActiveGroup(group)}>Редактировать</button>
        )
      } />
      <br /><br />

      <GroupEdit activeGroup={activeGroup} groups={groups} users={users} onEdit={(reset) => {
        setTimeout(() => refetchAll(), 200)

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