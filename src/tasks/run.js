import geth from './geth';

export default () => geth.spawn([
  '--networkid', 7475, '--mine', '--miner.threads', '1'
])
