// File: ./src/flow/is-initialized.script.js

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function isInitialized(address) {
  if (address == null)
    throw new Error("isInitialized(address) -- address required")

  return fcl
    .send([
      fcl.script`
        import NiftyHorns from 0xNiftyHorns

        pub fun main(address: Address): Bool {
          let acct = getAccount(address)
          if acct.getCapability(/public/CardCollection).check<&{NiftyHorns.CardCollectionPublic}>() {
            return true
          } else {
            return false
          }
        }
      `,
      fcl.args([fcl.arg(address, t.Address)]),
    ])
    .then(fcl.decode)
}