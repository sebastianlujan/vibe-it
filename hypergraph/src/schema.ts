// @ts-nocheck
import { Graph } from '@graphprotocol/grc-20';

export const { id: scorePropId, ops: scoreOps } = Graph.createProperty({
  name: 'score',
  dataType: 'NUMBER',
});

export const { id: reviewTextPropId, ops: reviewTextOps } = Graph.createProperty({
  name: 'review_text',
  dataType: 'TEXT',
});

export const { id: eventPropId, ops: eventOps } = Graph.createProperty({
  name: 'event',
  dataType: 'RELATION',
});

export const { id: reviewerPropId, ops: reviewerOps } = Graph.createProperty({
  name: 'reviewer',
  dataType: 'RELATION',
});

export const { id: reviewTypeId, ops: reviewTypeOps } = Graph.createType({
  name: 'Review',
  properties: [scorePropId, reviewTextPropId, eventPropId, reviewerPropId],
});