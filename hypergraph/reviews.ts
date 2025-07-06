import { Graph } from '@graphprotocol/grc-20';
import { reviewTypeId, scorePropId, reviewTextPropId, eventPropId, reviewerPropId } from './schema';

export function createReview({ score, text, eventId, reviewerId }: {
  score: number;
  text: string;
  eventId: string;
  reviewerId: string;
}) {
  return Graph.createEntity({
    name: `Review of ${eventId}`,
    types: [reviewTypeId],
    values: [
      { property: scorePropId, value: Graph.serializeNumber(score) },
      { property: reviewTextPropId, value: text },
    ],
    relations: {
      [eventPropId]: { toEntity: eventId },
      [reviewerPropId]: { toEntity: reviewerId },
    },
  });
}