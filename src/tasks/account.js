import paths from './paths'
import geth from './geth'
import { join } from 'path'

const create = password => geth.spawn(['account', 'new'], password)

export default { create }
