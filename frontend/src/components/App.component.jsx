import React, {useState, useEffect} from "react";

import { UserPanel } from "./user";
import { GroupPanel } from "./group";

import { useQuery } from "@apollo/client";
import { GET_ALL_GROUPS, GET_ALL_USERS } from "../api";

import './App.style.css'

const App = () => {
  const [users, setUsers] = useState([])
  let refetchUsers = () => {}
  let usersLoading = true

  {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    refetchUsers = refetch
    usersLoading = loading

    useEffect(() => {
      if(!loading) {
        setUsers(data.getAllUsers)
      }
    }, [data])
  }

  const [groups, setGroups] = useState([])
  let refetchGroups = () => {}
  let groupsLoading = true

  {
    const {data, loading, error, refetch} = useQuery(GET_ALL_GROUPS)
    refetchGroups = refetch
    groupsLoading = loading

    useEffect(() => {
      if(!loading) {
        setGroups(data.getAllGroups)
      }
    }, [data])
  }

  return (
    <>
      <div className="logo">
        <h1>UserCrud</h1>
      </div>
      
      <main>
        <section>
          <UserPanel users={users} loading={usersLoading} refetchAll={() => {
            refetchUsers()
            refetchGroups()
          }}/>
        </section>
        <section>
          <GroupPanel users={users} groups={groups} loading={groupsLoading} refetchAll={() => {
            refetchUsers()
            refetchGroups()
          }}/>
        </section>
      </main>

      <footer>
        <h3><a href="http://localhost:3000/graphql">Песочница GraphQL</a></h3>
      </footer>
    </>
  )
}

export { App };