// File: ./src/hooks/collection.js

import {atomFamily, useRecoilState} from "recoil"
import {getCollectionIDs} from "../flow/get-collection-ids.script"
import {useCurrentUser} from "./current-user"

const DEFAULT = []
const IDLE = "IDLE"
const PROCESSING = "PROCESSING"

const $collection = atomFamily({
  key: "COLLECTION::STATE",
  default: DEFAULT,
})

const $status = atomFamily({
  key: "COLLECTION::STATUS",
  default: PROCESSING,
})

export function useCollection(address) {
  const cu = useCurrentUser()
  const [collection, setCollection] = useRecoilState($collection(address))
  const [status, setStatus] = useRecoilState($status(address))

  async function refetch() {
    setStatus(PROCESSING)
    await getCollectionIDs(address)
      .then(collection => {
        return collection
      })
      .then(setCollection)
    setStatus(IDLE)
  }

  return {
    collection,
    status,
    isCurrentUser: address === cu.addr,
    refetch,
    IDLE,
    PROCESSING,
    isIdle: status === IDLE,
    isProcessing: status === PROCESSING,
  }
}