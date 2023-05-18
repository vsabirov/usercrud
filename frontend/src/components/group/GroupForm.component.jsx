import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_GROUP } from "../../api/group/create";

const GroupForm = ({ onCreated }) => {
  const [newGroup] = useMutation(CREATE_GROUP)
  const [name, setName] = useState('')
  const [permissions, setPermissions] = useState('')

  const createGroup = (e) => {
    e.preventDefault()

    newGroup({
      variables: {
        name: name,
        permissions: permissions
      }
    }).then(_ => {
      setName('')
      setPermissions('')

      onCreated()
    })
  }

  return (
    <form className="centered">
      <div className="centered">
        <h4>Создание группы</h4>
      </div>

      <span>Название группы</span>
      &nbsp;&nbsp;&nbsp;
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <span>Разрешения группы</span>
      &nbsp;&nbsp;&nbsp;
      <input type="text" value={permissions} onChange={e => setPermissions(e.target.value)} />
      <br /><br />
      <div className="centered">
        <button onClick={e => createGroup(e)}>Создать</button>
      </div>
    </form>
  )
}

export { GroupForm };