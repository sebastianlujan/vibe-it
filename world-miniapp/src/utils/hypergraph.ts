import { publishOps } from '@graphprotocol/hypergraph-react';
import { useHypergraphApp } from '@graphprotocol/hypergraph-react';
import { createReputationEntity } from '../hypergraph/reputationPublisher';

export async function publishReview(reviewData: {
  eventId: string;
  score: number;
  comment: string;
  reviewer: string; // Address or user ID
}) {
  try {
    // 1. Get client
    const { getSmartSessionClient } = useHypergraphApp();
    const smartSessionClient = await getSmartSessionClient();

    // 2. Create entity + ops
    const { ops, entityId } = await createReputationEntity({
      eventId: reviewData.eventId,
      score: reviewData.score,
      comment: reviewData.comment,
      reviewer: reviewData.reviewer,
    });

    // 3. Publish
    await publishOps({
      ops,
      walletClient: smartSessionClient,
      space: 'public',
      name: 'Publish Review',
    });

    return { success: true, entityId };
  } catch (err) {
    console.error('[publishReview] Error:', err);
    return { success: false, error: err };
  }
}