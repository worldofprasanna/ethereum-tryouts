const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(
  '<MNEMONIC FOR YOUR ACCOUNT>',
  '<INFURA ACCOUNT>'
);
const { interface, bytecode } = require('./compile');

const web3 = new Web3(provider);

const deploy = async () => {
   const accounts = await web3.eth.getAccounts();
   console.log('deploy from account - ', accounts[0]);
   const result = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({
           data: bytecode,
           arguments: ['Hi There !!!']
       })
       .send({
           gas: '1000000',
           from: accounts[0]
       });
   console.log('contract deployed to address - ', result.options.address);
};
deploy();