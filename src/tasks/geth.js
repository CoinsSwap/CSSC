import { execSync, spawn as _spawn } from 'child_process'
import paths from './paths'

const exec = params => execSync(`${paths.geth} --datadir ${paths.data} --http --http.port "8085" ${params}`)
const spawn = async (params, _data) => {
  const defaultParams = ['--datadir', paths.data, '--http', '--http.port', 8085]
  const child = _spawn(paths.geth, [...defaultParams, ...params])

  child.stdout.on('data', data => {
    data = data.toString()
    if (data.toLowerCase().includes('password:')) child.stdin.write(`${_data}\n`)
  })

  child.stderr.on('data', data => {
    console.log(data.toString());
  })

  return child

}

export default {exec, spawn}
