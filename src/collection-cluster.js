// File: ./src/collection-cluster.js

import {useState, useEffect} from "react"
import {useCurrentUser} from "./hooks/current-user"
import {useCollection} from "./hooks/collection"

export function CollectionCluster({address}) {
  const collection = useCollection(address)
  useEffect(() => collection.refetch(), [address])
  if (address == null) return null

  return (
    <div>
      <h3>Collection: {address}</h3>
      <ul>
        {collection.collection.map(function(id, index) {
          return <li key={index}>{id}</li>;
        })}
      </ul>
    </div>
  )
}
