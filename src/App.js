// File: ./src/App.js

import React from "react"
import {AuthCluster} from "./auth-cluster"
import {InitCluster} from "./init-cluster"
import {CollectionCluster} from "./collection-cluster"
import {useCurrentUser} from "./hooks/current-user"

export default function App() {
  const cu = useCurrentUser()

  return (
    <div>
      <AuthCluster />
      <InitCluster address={cu.addr} />
      <CollectionCluster address={cu.addr} />
    </div>
  )
}
