import { execSync } from 'child_process'
import { join } from 'path'
import paths from './paths'
import { gethVersion, gethCommit, platform } from './../constants'

const all = () => execSync(`rm -rf ${paths.folder}`)
const geth = () => execSync(`rm -rf ${paths.geth}`)
const download = () => execSync(`rm -rf ${join(paths.folder, 'COPYING')}`)

export default { all, geth, download }
