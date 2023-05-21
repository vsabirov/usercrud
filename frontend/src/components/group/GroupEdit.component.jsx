import React, { useState } from 'react'

import { DELETE_GROUP, UPDATE_GROUP, ADD_USER, REMOVE_USER } from "../../api";

import { useMutation } from "@apollo/client";

import { UserList } from "../user";

const GroupEdit = ({ activeGroup, groups, users, onEdit }) => {
  const [removeGroup] = useMutation(DELETE_GROUP)
  const [updateGroup] = useMutation(UPDATE_GROUP)
  const [addUser] = useMutation(ADD_USER)
  const [removeUser] = useMutation(REMOVE_USER)

  const [newName, setNewName] = useState('')

  if(!activeGroup) {
    return
  }

  const deleteGroup = (id) => {
    removeGroup({
      variables: {
        id: id
      }
    }).then(_ => onEdit(true))
  }

  const changeName = (id) => {
    updateGroup({
      variables: {
        id: id,
        name: newName,
        permissions: activeGroup.permissions
      }
    }).then(_ => {
      setNewName('')

      onEdit(true)
    })
  }

  const makeUser = (user) => {
    addUser({
      variables: {
        id: activeGroup.id,
        userId: user.id
      }
    }).then(_ => onEdit(true))
  }

  const unmakeUser = (user) => {
    removeUser({
      variables: {
        id: activeGroup.id,
        userId: user.id
      }
    }).then(_ => onEdit(true))
  }

  return (
    <div className="box">
      <h2>Группа {activeGroup.name}</h2>

      <p>Сменить имя</p>
      <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
      <br /><br />
      <button className='positive' onClick={() => changeName(activeGroup.id)}>Отправить</button>

      <ul>
        <li>ID: {activeGroup.id}</li>
        <li>Разрешения: {activeGroup.permissions}</li>
        <li>Пользователи: {activeGroup.users.map(user => user.username + ' ')}</li>
      </ul>

      <button className='negative' onClick={() => deleteGroup(activeGroup.id)}>Удалить</button>
      <br /><br />

      <UserList users={users} loading={false} getActionsForUser={(user) => {
          let isUser = false
          activeGroup.users.forEach(groupUser => {
            if(groupUser.username == user.username) {
              isUser = true
            }
          })

          if(isUser) {
            return <button className='negative' onClick={() => unmakeUser(user)}>Удалить из группы</button>
          }
          else {
            return <button className='positive' onClick={() => makeUser(user)}>Добавить в группу</button>
          }
        }
      }/>
    </div>
  )
}

export {GroupEdit};