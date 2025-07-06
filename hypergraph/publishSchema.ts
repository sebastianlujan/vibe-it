// ignore the typescript error
// @ts-nocheck
import { publishOps } from '@graphprotocol/hypergraph-react';
import { Connect } from '@graphprotocol/hypergraph';
import { createFullSchema } from './src/schema';
import { ethers } from 'ethers';

export async function publishSchema() {
  const { ops } = await createFullSchema();
  console.log('ops', ops);

  // Create a private key and wallet
  const wallet = ethers.Wallet.createRandom();
  console.log('Wallet address:', wallet.address);
  console.log('Wallet private key:', wallet.privateKey);
  

  // Create the smart session client using the Connect module
  const smartSessionClient = Connect.createSmartSessionClient({
    privateKey: wallet.privateKey,
    rpcUrl: "https://rpc.ankr.com/eth_sepolia",
    chainId: 11155111 // Sepolia chain ID
  });

  console.log('ops', ops);
  
  await publishOps({
    name: 'My Schema',
    ops,
    walletClient: smartSessionClient,
    space: 'public',
  });

  console.log('✅ Published');
}

publishSchema();