import geth from './geth';
import paths from './paths';

export default () => geth.spawn([
  '--datadir', paths.data , '--networkid', 7475, '--nodiscover'
])
