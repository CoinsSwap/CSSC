import { readFile } from 'fs'
import { promisify } from 'util'
import paths from './paths'

const read = promisify(readFile)

const accounts = async () => {
  try {
    const files = await read(paths.accounts)
    return JSON.parse(files.toString())
  } catch (e) {
    return false
  }
}

const contractAddresses = async () => {
  try {
    const files = await read(paths.contractAddresses)
    return JSON.parse(files.toString())
  } catch (e) {
    return false
  }
}

export default { accounts, contractAddresses }
