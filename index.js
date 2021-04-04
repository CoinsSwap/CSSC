'use strict';

var fs = require('fs');
var util = require('util');
var path = require('path');
var os = require('os');
var child_process = require('child_process');
var download$2 = require('download');
var inquirer = require('inquirer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var download__default = /*#__PURE__*/_interopDefaultLegacy(download$2);
var inquirer__default = /*#__PURE__*/_interopDefaultLegacy(inquirer);

const folder$2 = path.join(process.env.HOME, '.CSSC');
const genesis$2 = path.join(folder$2, 'genesis.json');
const geth$3 = path.join(folder$2, 'geth');
// TODO: optional
const data$1 = path.join(folder$2, 'data');

var paths = { folder: folder$2, genesis: genesis$2, data: data$1, geth: geth$3 };

const readdir = util.promisify(fs.readdir);

const folder$1 = async () => {
  try {
    const files = await readdir(paths.folder);
    return files
  } catch (e) {
    return false
  }
};

const genesis$1 = async () => {
  return fs.existsSync(paths.genesis)
};

var exists = { folder: folder$1, genesis: genesis$1 };

const platform = (() => {
  const platform = os.platform();
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
};

const exec = params => child_process.execSync(`${paths.geth} --datadir ${paths.data} --http --http.port "8085" ${params}`);
const spawn = async (params, _data) => {
  const defaultParams = ['--datadir', paths.data, '--http', '--http.port', 8085];
  const child = child_process.spawn(paths.geth, [...defaultParams, ...params]);

  child.stdout.on('data', data => {
    data = data.toString();
    if (data.toLowerCase().includes('password:')) child.stdin.write(`${_data}\n`);
  });

  child.stderr.on('data', data => {
    console.log(data.toString());
  });

  return child

};

var geth$2 = {exec, spawn};

const mkdir = util.promisify(fs.mkdir);
const write = util.promisify(fs.writeFile);

const folder = async () => mkdir(paths.folder);

const genesis = async (config = {}) => {
  config = {...defaultGenesis, ...config};
  return write(paths.genesis, JSON.stringify(config, null, '\t'))
};

const data = () => geth$2.exec(`init ${paths.genesis}`);

var setup = { folder, genesis, data };

const geth$1 = async () => {
  const url = () => {
    const base = `https://gethstore.blob.core.${platform}.net`;
    return `${base}/builds/geth-${platform}-amd64-1.10.1-c2d2f4ed.zip`
  };

  return download__default['default'](url(), paths.folder, {
    extract: true,
    map: file => {
      file.path = file.path.split('/')[1];
      return file
    }
  });
};

var download$1 = { geth: geth$1 };

const all = () => child_process.execSync(`rm -rf ${paths.folder}`);
const geth = () => child_process.execSync(`rm -rf ${paths.geth}`);
const download = () => child_process.execSync(`rm -rf ${path.join(paths.folder, 'COPYING')}`);

var cleanup = { all, geth, download };

var run = () => geth$2.spawn([
  '--networkid', 74, '--mine', '--miner.threads', '1'
]);

const create = password => geth$2.spawn(['account', 'new'], password);

var account = { create };

const password = async () => {
  const answers = await inquirer__default['default'].prompt([{
    name: 'password',
    type: 'password',
    message: 'Enter account password',
    validate: string => string?.length >= 8
  }]);

  return answers.password
};

var prompts = { password };

var index = async networkid => {
  const folder = await exists.folder();
  if (!folder) await setup.folder();
  if (folder) {
    if (folder.indexOf('genesis.json') === -1) await setup.genesis();
    if (folder.indexOf('geth.exe') == -1) {
      await download$1.geth();
      await cleanup.download();
    }
    if (folder.indexOf('data') === -1) {
      await setup.data();
      await account.create(await prompts.password());
    }
    return run()
  }
  await setup.genesis();
  await download$1.geth();
  await setup.data();
  await cleanup.download();
  await account.create(await prompts.password());
  return run()
};

module.exports = index;
