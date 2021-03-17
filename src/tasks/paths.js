import { join } from 'path'

const folder = join(process.env.HOME, '.CSSC')
const genesis = join(folder, 'genesis.json')
const geth = join(folder, 'geth')
// TODO: optional
const data = join(folder, 'data')

export default { folder, genesis, data, geth }
