import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../../api/group/delete";

const GroupList = ({ groups, loading, onUpdate }) => {
  const [removeGroup] = useMutation(DELETE_GROUP)

  if(loading) {
    return <h1>Загрузка...</h1>
  }

  const deleteGroup = (id) => {
    removeGroup({
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
              <button onClick={() => deleteGroup(group.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { GroupList };