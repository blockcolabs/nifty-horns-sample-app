// File: ./src/config.js

import {config} from "@onflow/fcl"

config()
  .put("accessNode.api", process.env.REACT_APP_ACCESS_NODE) // Configure FCL's Access Node
  .put("discovery.wallet", process.env.REACT_APP_WALLET_DISCOVERY) // Configure FCL's Wallet Discovery mechanism
  .put("0xNiftyHorns", process.env.REACT_APP_CONTRACT_NIFTYHORNS) // Will let us use `0xNiftyHorns` in our Cadence
