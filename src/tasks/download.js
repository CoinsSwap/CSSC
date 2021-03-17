import download from 'download'
import paths from './paths'
import { platform } from './../constants'

const geth = async () => {
  const url = () => {
    const base = `https://gethstore.blob.core.${platform}.net`
    return `${base}/builds/geth-${platform}-amd64-1.10.1-c2d2f4ed.zip`
  }

  return download(url(), paths.folder, {
    extract: true,
    map: file => {
      file.path = file.path.split('/')[1]
      return file
    }
  });
}

export default { geth }
