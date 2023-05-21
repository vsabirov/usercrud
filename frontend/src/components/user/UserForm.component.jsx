import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { CREATE_USER } from "../../api";

const UserForm = ({ onCreated }) => {
  const [newUser] = useMutation(CREATE_USER)
  const [username, setUsername] = useState('')

  const createUser = (e) => {
    e.preventDefault()

    newUser({
      variables: {
        username: username
      }
    }).then(_ => {
      setUsername('')
      onCreated()
    })
  }

  return (
    <form className="centered">
      <div className="centered">
        <h4>Регистрация пользователя</h4>
      </div>

      <span>Имя пользователя</span>
      &nbsp;&nbsp;&nbsp;
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      <br /><br />
      <div className="centered">
        <button className='positive' onClick={e => createUser(e)}>Зарегистрировать</button>
      </div>
    </form>
  )
}

export { UserForm };