import { mkdir as _mkdir, writeFile } from 'fs'
import { promisify } from 'util'
import { defaultGenesis } from './../constants'
import paths from './paths'
import geth from './geth'

const mkdir = promisify(_mkdir)
const write = promisify(writeFile)

const folder = async () => mkdir(paths.folder)

const genesis = async (config = {}) => {
  config = {...defaultGenesis, ...config}
  return write(paths.genesis, JSON.stringify(config, null, '\t'))
}

const data = () => geth.exec(`--datadir ${paths.data} init ${paths.genesis}`)

export default { folder, genesis, data }
