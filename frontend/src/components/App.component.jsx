import React from "react";

import { UserPanel } from "./user";
import { GroupPanel } from "./group";

import './App.style.css'

const App = () => {
  return (
    <>
      <div className="logo">
        <h1>UserCrud</h1>
      </div>
      
      <main>
        <section>
          <UserPanel />
        </section>
        <section>
          <GroupPanel />
        </section>
      </main>

      <footer>
        <h3><a href="http://localhost:3000/graphql">Песочница GraphQL</a></h3>
      </footer>
    </>
  )
}

export { App };