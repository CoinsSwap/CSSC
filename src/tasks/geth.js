import { execSync, spawn as _spawn } from 'child_process'
import paths from './paths'

const exec = params => execSync(`${paths.geth} --datadir ${path.data} --http --http.port "8085" ${params}`)
const spawn = params => {
  const defaultParams = ['--datadir', paths.data, '--http', '--http.port', 8085]
  const child = _spawn(paths.geth, [...defaultParams, ...params])

  child.stdout.on('data', data => {
    console.log(data.toString());
  })

  child.stderr.on('data', data => {
    console.log(data.toString());
  })

  return child
}

export default {exec, spawn}
