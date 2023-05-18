import React from "react";
import { useMutation } from "@apollo/client";

const GroupList = ({ groups, loading, getActionsForGroup }) => {
  if(loading) {
    return <h1>Загрузка...</h1>
  }

  return (
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>Название группы</td>
          <td>Разрешения</td>
          <td>Пользователи</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {groups.map(group => (
          <tr key={group.id}>
            <td>{group.id}</td>
            <td>{group.name}</td>
            <td>{group.permissions}</td>
            <td>
              {group.users.map(user => (
                <span key={user.username}>{user.username} &nbsp;</span>
              ))}
            </td>
            <td>
                {getActionsForGroup(group)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { GroupList };