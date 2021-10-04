// File: ./src/flow/get-collections-ids.script.js

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function getCollectionIDs(address) {
  if (address == null) return null

  return fcl
    .send([
      fcl.script`
        import NiftyHorns from 0xNiftyHorns

        pub fun main(address: Address): [UInt64] {
          let acct = getAccount(address)

          if acct.getCapability(/public/CardCollection).check<&{NiftyHorns.CardCollectionPublic}>() {
            let collectionRef = acct.getCapability(/public/CardCollection)
                                    .borrow<&{NiftyHorns.CardCollectionPublic}>()!
            return collectionRef.getIDs()
          } else {
            return []
          }
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}