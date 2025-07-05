import { Graph } from '@graphprotocol/grc-20';

export const createReputationSchema = async () => {
    const { id: scorePropId, ops: scoreOps } = Graph.createProperty({ name: "score", dataType: "NUMBER" });
    const { id: commentPropId, ops: commentOps } = Graph.createProperty({ name: "comment", dataType: "TEXT" });
    const { id: userPropId, ops: userOps } = Graph.createProperty({ name: "reviewer", dataType: "RELATION" });
  
    const { id: reviewTypeId, ops: typeOps } = Graph.createType({
      name: "Review",
      properties: [scorePropId, commentPropId, userPropId]
    });
  
    return {
      reviewTypeId,
      ops: [...scoreOps, ...commentOps, ...userOps, ...typeOps],
      propertyIds: { scorePropId, commentPropId, userPropId }
    };
  };