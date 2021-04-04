import { Contract, ContractFactory } from 'ethers'
import uniswapV1FactoryABI from '../../node_modules/@coinsswap/abis/abis/uniswap/v1/factory'
import uniswapV1ExchangeABI from '../../node_modules/@coinsswap/abis/abis/uniswap/v1/exchange'
import uniswapV2FactoryABI from '../../node_modules/@coinsswap/abis/abis/uniswap/v2/factory'
import uniswapV2Router02ABI from '../../node_modules/@coinsswap/abis/abis/uniswap/v2/router02'
import uniswapV2MigratorABI from '../../node_modules/@coinsswap/abis/abis/uniswap/v2/migrator'
import ensABI from '../../node_modules/@coinsswap/abis/abis/ens-registry'
import WETHABI from '../../node_modules/@coinsswap/abis/abis/weth'
import multicallABI from '../../node_modules/@coinsswap/abis/abis/multicall'
import gasRelayHubABI from '../../node_modules/@coinsswap/abis/abis/gas-relay-hub'

import bytecodes from '@coinsswap/bytecodes'

const sendTransaction = async (account, data) => {
  const transaction = await account.sendTransaction({ data })
  return transaction.wait()
}

const deployContract = async (ABI, bytecode, args = undefined) => {
  const contract = new ContractFactory(ABI, bytecode, CSSC.drew)
  const deployment = args ? await contract.deploy(...args, { chainId: 7475, gasLimit: 2100000 }) : await contract.deploy({ chainId: 7475, gasLimit: 2100000 })

  await deployment.deployTransaction.wait()
  return deployment.address
}

const uniswapV1Factory = async ({ alice, bob, uniswapV1Exchange, uniswapV1Factory, aliceExchange, bobExchange, uniswapV2 }) => {
  if (!uniswapV1Factory) {
    uniswapV1Factory = await sendTransaction(CSSC.drew, bytecodes.uniswap.V1Factory)
    uniswapV1Factory = uniswapV1Factory.contractAddress
  }
  const contract = await new Contract(uniswapV1Factory, uniswapV1FactoryABI, CSSC.drew)

  let link = await contract.initializeFactory(uniswapV1Exchange)
  link = await link.wait()
  console.log(`link created ${link.root}`)

  console.log(`creating Alice & Bob exchanges`);
  if (!aliceExchange) {
    await contract.createExchange(alice)
    await contract.createExchange(bob)

    aliceExchange = await contract.getExchange(alice)
    console.log(`created AliceExchange: ${aliceExchange}`);

    bobExchange = await contract.getExchange(bob)
    console.log(`created BobExchange: ${bobExchange}`);
  }

  if (!uniswapV2) {
    uniswapV2 = await deployContract(uniswapV2FactoryABI, bytecodes.uniswap.v2, [CSSC.drew.address])
    console.log(`deployed uniswapV2: ${uniswapV2}`)
  }

  const weth = await deployContract(WETHABI, bytecodes.uniswap.weth)
  console.log(`deployed WETH: ${weth}`);

  const uniswapV2Router02 = await deployContract(uniswapV2Router02ABI, bytecodes.uniswap.v2Router02, [uniswapV2, weth])
  console.log(`deployed uniswapV2Router02: ${uniswapV2Router02}`);

  const multicall = await deployContract(multicallABI, bytecodes.uniswap.multicall)
  console.log(`deployed multicall: ${multicall}`);

  const uniswapV2Migrator = await deployContract(uniswapV2MigratorABI, bytecodes.uniswap.v2Migrator, [uniswapV1Factory, uniswapV2Router02])
  console.log(`deployed uniswapV2Migrator: ${uniswapV2Migrator}`);

  const ens = await deployContract(ensABI, bytecodes.uniswap.ens, [CSSC.drew.address])
  console.log(`deployed ens: ${ens}`);

  const gasRelayHub = await deployContract(gasRelayHubABI, bytecodes.uniswap.gasRelayHub)
  console.log(`deployed gasRelayHub: ${gasRelayHub}`);

  return {
    uniswapV1Factory,
    uniswapV2Router02,
    uniswapV2,
    weth,
    multicall,
    uniswapV2Migrator,
    ens,
    aliceExchange,
    bobExchange
  }
}

const uniswapV1Exchange = async () => {
  const tx = await sendTransaction(CSSC.drew, bytecodes.uniswap.V1Exchange)
  const contract = await new Contract(tx.contractAddress, uniswapV1ExchangeABI)
  return tx.contractAddress
}

const zerox = async () => {

}

export default { uniswapV1Factory, uniswapV1Exchange, zerox }
