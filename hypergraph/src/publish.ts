import { publishOps } from '@graphprotocol/hypergraph-react';
import { SPACE_ID } from './constants';

export async function publishAllOps(ops: any[], walletClient: any) {
  await publishOps({
    ops,
    walletClient,
    name: 'Publish Review or Schema',
    space: SPACE_ID,
  });
}