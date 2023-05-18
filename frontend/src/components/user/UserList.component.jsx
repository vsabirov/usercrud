import React from "react";

const UserList = ({ users, loading, getActionsForUser }) => {
  if(loading) {
    return <h1>Загрузка...</h1>
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
                {getActionsForUser(user)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { UserList };