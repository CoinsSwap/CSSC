import { writeFile } from 'fs'
import { promisify } from 'util'
import { Wallet } from 'ethers'
import paths from './paths'
import contracts from './contracts'
import tokens from './tokens'

const write = promisify(writeFile)

const accounts = async () => {
  const accounts = {}
  accounts.alice = Wallet.createRandom().privateKey
  accounts.bob = Wallet.createRandom().privateKey
  accounts.drew = Wallet.createRandom().privateKey

  await write(paths.accounts, JSON.stringify(accounts, null, 1))
  return accounts
}

const contractAddresses = async () => {
  const contractAddresses = {}
  contractAddresses.alice = await tokens.alice()
  contractAddresses.bob = await tokens.bob()
  contractAddresses.uniswapV1Exchange = await contracts.uniswapV1Exchange()

  let addresses = await contracts.uniswapV1Factory(contractAddresses)
  contractAddresses = {...contractAddresses, ...addresses}

  await write(paths.contractAddresses, JSON.stringify(contractAddresses, null, 1))

  addresses = await contracts.zerox()
  contractAddresses = {...contractAddresses, ...addresses}
  return contractAddresses
}

export default { accounts, contractAddresses }
