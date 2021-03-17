import paths from './paths'
import geth from './geth'
import { join } from 'path'

const create = () => geth.exec('account new --password password')

export default { create }
