// File: ./src/flow/init-account.tx.js

import * as fcl from "@onflow/fcl"
import * as t from "@onflow/types"

export async function initAccount() {
  const txId = await fcl
    .send([
      // Transactions use fcl.transaction instead of fcl.script
      // Their syntax is a little different too
      fcl.transaction`
        import NiftyHorns from 0xNiftyHorns

        transaction {
          prepare(acct: AuthAccount) {
            // First, check to see if a card collection already exists
            if acct.borrow<&NiftyHorns.Collection>(from: /storage/CardCollection) == nil {
              // create a new NiftyHorns Collection
              let collection <- NiftyHorns.createEmptyCollection() as! @NiftyHorns.Collection

              // Put the new Collection in storage
              acct.save(<-collection, to: /storage/CardCollection)

              // Create a public capability for the collection
              acct.link<&{NiftyHorns.CardCollectionPublic}>(/public/CardCollection, target: /storage/CardCollection)
            }
          }
        }
      `,
      fcl.payer(fcl.authz), // current user is responsible for paying for the transaction
      fcl.proposer(fcl.authz), // current user acting as the nonce
      fcl.authorizations([fcl.authz]), // current user will be first AuthAccount
      fcl.limit(999), // set the compute limit
    ])
    .then(fcl.decode)

  return fcl.tx(txId).onceSealed()
}
