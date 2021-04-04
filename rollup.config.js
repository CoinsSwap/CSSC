export default [{
  input: 'src/index.js',
  output: [{
    dir: './',
    format: 'cjs'
  }]
}, {
  input: 'testnet/deploy.js',
  output: [{
    dir: './testnet/dist',
    format: 'cjs'
  }]
}]
