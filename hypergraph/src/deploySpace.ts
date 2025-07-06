import { Graph } from '@graphprotocol/grc-20';
// needs to be a valid address
const editorAddress = '0x000000000000000000000000000000000000';
const spaceName = 'Example-Name';

const spaceId = await Graph.createSpace({
  editorAddress, 
  spaceName, 
  // Optionally specify TESTNET or MAINNET. Defaults to MAINNET
  network: 'TESTNET',
});