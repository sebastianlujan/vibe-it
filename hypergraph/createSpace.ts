import { Graph } from '@graphprotocol/grc-20';

const editorAddress = '0xFbC66bD8466f7B7628fD32F8a8C07f3976c73979'; 
const spaceName = 'MiniWorldSpace';

async function main() {
  try {
    const spaceId = await Graph.createSpace({
      initialEditorAddress: editorAddress,
      spaceName,
      network: 'TESTNET', // o 'MAINNET' si estás en producción
    });

    console.log('✅ Space created:', spaceId);
  } catch (err) {
    console.error('❌ Error creating space:', err);
  }
}

main();