import React, { useState } from 'react'

import { DELETE_USER, UPDATE_USER, ADD_FRIEND, REMOVE_FRIEND } from "../../api";

import { useMutation } from "@apollo/client";

import { UserList } from ".";

const UserEdit = ({ activeUser, users, onEdit }) => {
  const [removeUser] = useMutation(DELETE_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [addFriend] = useMutation(ADD_FRIEND)
  const [removeFriend] = useMutation(REMOVE_FRIEND)

  const [newUsername, setNewUsername] = useState('')

  if(!activeUser) {
    return
  }

  const deleteUser = (id) => {
    removeUser({
      variables: {
        id: id
      }
    }).then(_ => onEdit(true))
  }

  const changeUserName = (id) => {
    updateUser({
      variables: {
        id: id,
        username: newUsername
      }
    }).then(_ => {
      setNewUsername('')

      onEdit(true)
    })
  }

  const befriend = (friend) => {
    addFriend({
      variables: {
        id: activeUser.id,
        friendId: friend.id
      }
    }).then(_ => onEdit(true))
  }

  const unfriend = (friend) => {
    removeFriend({
      variables: {
        id: activeUser.id,
        friendId: friend.id
      }
    }).then(_ => onEdit(true))
  }

  return (
    <div className="box">
      <h2>Пользователь {activeUser.username}</h2>

      <p>Сменить имя</p>
      <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)}/>
      <br /><br />
      <button className='positive' onClick={() => changeUserName(activeUser.id)}>Отправить</button>

      <ul>
        <li>ID: {activeUser.id}</li>
        <li>Друзья: {activeUser.friends.map(friend => friend.username + ' ')}</li>
        <li>Группы: {activeUser.groups.map(group => group.name + ' ')}</li>
      </ul>

      <button className='negative' onClick={() => deleteUser(activeUser.id)}>Удалить</button>
      <br /><br />

      <UserList users={users.filter(user => user.id !== activeUser.id)} loading={false} getActionsForUser={(user) => {
          let isFriend = false
          activeUser.friends.forEach(friend => {
            if(friend.username == user.username) {
              isFriend = true
            }
          })

          if(isFriend) {
            return <button className='negative' onClick={() => unfriend(user)}>Удалить из друзей</button>
          }
          else {
            return <button className='positive' onClick={() => befriend(user)}>Добавить в друзья</button>
          }
        }
      }/>
    </div>
  )
}

export {UserEdit};