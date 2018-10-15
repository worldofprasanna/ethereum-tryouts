const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
   accounts = await web3.eth.getAccounts();
   inbox = await new web3.eth.Contract(JSON.parse(interface))
       .deploy({data: bytecode, arguments: ['Hi there']})
       .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
    it('deploys contract', ()=>{
        assert.ok(inbox.options.address);
    });
    it('should have message Hi there', async () => {
        const actualMessage = await inbox.methods.message().call();
        assert.equal(actualMessage, "Hi there");
    });
    it('should update the message value', async () => {
        await inbox.methods.setMessage("bye").send({ from: accounts[0] });
        const actualMessage = await inbox.methods.message().call();
        assert.equal(actualMessage, "bye");
    });
});

