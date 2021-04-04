import constants from './../constants'
import { BigNumber } from 'ethers'

const alice = async () => {
  const instance = await globalThis.CSSC.alice.sendTransaction({
    data: constants.alice
  })
  const tx = await instance.wait()
  return tx.contractAddress
}

const bob = async () => {
  const instance = await globalThis.CSSC.bob.sendTransaction({
    data: constants.bob
  })

  const tx = await instance.wait()
  return tx.contractAddress
}

export default { alice, bob }
