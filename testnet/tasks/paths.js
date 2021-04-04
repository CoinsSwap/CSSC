import { join } from 'path'

const folder = join(process.env.HOME, '.CSSC')
const accounts = join(folder, 'accounts.json')
const contractAddresses = join(folder, 'contractAddresses.json')

export default { folder, accounts, contractAddresses }
