import { Graph } from '@graphprotocol/grc-20';

export const createReputationSchema = async () => {
  // Simple properties for Review
  const { id: scorePropId, ops: scoreOps } = Graph.createProperty({
    name: "score",
    dataType: "NUMBER",
  });

  const { id: commentPropId, ops: commentOps } = Graph.createProperty({
    name: "comment",
    dataType: "TEXT",
  });

  // Relational properties for User and Event
  const { id: userPropId, ops: userOps } = Graph.createProperty({
    name: "reviewer",
    dataType: "RELATION", // Relation with User
  });

  const { id: eventPropId, ops: eventOps } = Graph.createProperty({
    name: "event",
    dataType: "RELATION", // Relation with Event
  });

  // Type of review 
  const { id: reviewTypeId, ops: typeOps } = Graph.createType({
    name: "Review",
    properties: [scorePropId, commentPropId, userPropId, eventPropId],
  });

  return {
    reviewTypeId,
    ops: [...scoreOps, ...commentOps, ...userOps, ...eventOps, ...typeOps],
    propertyIds: {
      scorePropId,
      commentPropId,
      userPropId,
      eventPropId,
    },
  };
};