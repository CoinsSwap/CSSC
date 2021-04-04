import { providers, Wallet } from 'ethers'
import { join } from 'path'
import exists from './tasks/exists'
import setup from './tasks/setup'
import tokens from './tasks/tokens'

globalThis.CSSC = {}

const provider = new providers.JsonRpcProvider('http://127.0.0.1:8545');

(async () => {
  let accounts = await exists.accounts()
  if (!accounts) accounts = await setup.accounts()
  
  globalThis.CSSC.alice = new Wallet(accounts.alice, provider)
  globalThis.CSSC.bob = new Wallet(accounts.bob, provider)
  globalThis.CSSC.drew = new Wallet(accounts.drew, provider)

  let contractAddresses = await exists.contractAddresses()
  if (!contractAddresses) contractAddresses = await setup.contractAddresses()

  console.log(contractAddresses);
})()
