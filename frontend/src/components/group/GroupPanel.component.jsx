import React, { useEffect, useState } from "react";

import { GroupForm, GroupList } from ".";
import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS } from "../../api/group/get";

const GroupPanel = () => {
  const {data, loading, error, refetch} = useQuery(GET_ALL_GROUPS)
  const [groups, setGroups] = useState([])

  useEffect(() => {
    if(!loading) {
      setGroups(data.getAllGroups)
    }
  }, [data])

  return (
    <>
      <GroupForm onCreated={() => refetch()} />
      <br /><br />
      <GroupList groups={groups} loading={loading} onUpdate={() => refetch()} />
    </>
  )
}

export { GroupPanel };