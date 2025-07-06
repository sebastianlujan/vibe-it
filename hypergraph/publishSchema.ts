import { publishOps } from '@graphprotocol/hypergraph-react';
import { createFullSchema } from './schema';

export async function publishSchema() {
  const { ops } = await createFullSchema();
  const walletClient = await getWalletClientFromWagmi(); // usa wagmi

  await publishOps({
    ops,
    walletClient,
    space: 'public',
    name: 'My Schema',
  });

  console.log('✅ Published');
}
