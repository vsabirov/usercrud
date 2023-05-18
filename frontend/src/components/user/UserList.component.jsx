import React from "react";
import { DELETE_USER } from "../../api/user/delete";
import { useMutation } from "@apollo/client";

const UserList = ({ users, loading, onUpdate }) => {
  const [removeUser] = useMutation(DELETE_USER)

  if(loading) {
    return <h1>Загрузка...</h1>
  }

  const deleteUser = (id) => {
    removeUser({
      variables: {
        id: id
      }
    }).then(_ => onUpdate())
  }

  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Имя пользователя</td>
          <td>Друзья</td>
          <td>Группы</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>
              {user.friends.map(friend => (
                <span key={friend.username}>{friend.username} &nbsp;</span>
              ))}
            </td>
            <td>
              {user.groups.map(group => (
                <span key={group.name}>{group.name} &nbsp;</span>
              ))}
            </td>
            <td>
              <button onClick={() => deleteUser(user.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { UserList };