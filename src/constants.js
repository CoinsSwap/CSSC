import { platform as _platform } from 'os';

const platform = (() => {
  const platform = _platform()
  if(platform === 'win32') return 'windows'
  return platform
})();

const defaultGenesis = {
    'nonce': '0x0000000000000042',
    'timestamp': '0x0',
    'parentHash': '0x0000000000000000000000000000000000000000000000000000000000000000',
    'extraData': '0x00',
    'gasLimit': '0x1000000',
    'difficulty': '0x400',
    'mixhash': '0x0000000000000000000000000000000000000000000000000000000000000000',
    'coinbase': '0x3333333333333333333333333333333333333333',
    'alloc': {},
    'config': {
      'chainId': 74,
      'homesteadBlock': 0,
  		'eip150Block': 0,
      'eip155Block': 0,
      'eip158Block': 0
    }
}

const gethVersion = '1.10.1'
const gethCommit = 'c2d2f4ed'

export { platform, defaultGenesis, gethVersion, gethCommit }
