import { createReview } from './review';
import { scoreOps, reviewTextOps, eventOps, reviewerOps, reviewTypeOps } from './schema';
import { publishAllOps } from './publish';

// Ejemplo de cómo correr todo junto
async function main(walletClient: any) {
  const { ops: reviewOps } = createReview({
    score: 5,
    text: 'Great!',
    eventId: 'event-123',
    reviewerId: 'user-456',
  });

  const allOps = [
    ...scoreOps,
    ...reviewTextOps,
    ...eventOps,
    ...reviewerOps,
    ...reviewTypeOps,
    ...reviewOps,
  ];

  await publishAllOps(allOps, walletClient);
}

main({});