import { readdir as _readdir, existsSync } from 'fs'
import { promisify } from 'util'
import paths from './paths'

const readdir = promisify(_readdir)

const folder = async () => {
  try {
    const files = await readdir(paths.folder)
    return files
  } catch (e) {
    return false
  }
}

const genesis = async () => {
  return existsSync(paths.genesis)
}

export default { folder, genesis }
