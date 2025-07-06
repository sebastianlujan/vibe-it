// @ts-nocheck
import { graph } from './client';
import { createReputationSchema } from './schema';

type ReviewData = {
  eventId: any;
  score: number;
  comment: string;
  reviewer: string;
};

export const createReputationEntity = async (reviewData: ReviewData) => {
  const { reviewTypeId, ops: schemaOps, propertyIds } = await createReputationSchema();

  const { id: entityId, ops: entityOps } = graph.createEntity({
    name: `Review of event ${reviewData.eventId}`,
    types: [reviewTypeId],
    values: [
      { property: propertyIds.scorePropId, value: graph.serializeNumber(reviewData.score) },
      { property: propertyIds.commentPropId, value: reviewData.comment },
      { property: propertyIds.userPropId, value: reviewData.reviewer },
    ],
  });

  return {
    ops: [...schemaOps, ...entityOps],
    entityId,
  };
};