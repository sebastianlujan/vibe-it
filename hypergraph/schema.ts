import { Graph } from '@graphprotocol/grc-20';

/**
 * Create a schema for the World Miniapp.
 * and returns the operations to create the schema.
 */
export const createFullSchema = async () => {
  // === USER SCHEMA ===
  const { id: userNamePropId, ops: userNameOps } = Graph.createProperty({
    name: 'name',
    dataType: 'TEXT',
  });

  const { id: userAddressPropId, ops: userAddressOps } = Graph.createProperty({
    name: 'address',
    dataType: 'TEXT',
  });

  const { id: userTypeId, ops: userTypeOps } = Graph.createType({
    name: 'User',
    properties: [userNamePropId, userAddressPropId],
  });

  // === EVENT SCHEMA ===
  const { id: eventNamePropId, ops: eventNameOps } = Graph.createProperty({
    name: 'eventName',
    dataType: 'TEXT',
  });

  const { id: eventDatePropId, ops: eventDateOps } = Graph.createProperty({
    name: 'eventDate',
    dataType: "TEXT", 
  });

  const { id: eventTypeId, ops: eventTypeOps } = Graph.createType({
    name: 'Event',
    properties: [eventNamePropId, eventDatePropId],
  });

  // === REVIEW SCHEMA ===
  const { id: scorePropId, ops: scoreOps } = Graph.createProperty({
    name: 'score',
    dataType: 'NUMBER',
  });

  const { id: commentPropId, ops: commentOps } = Graph.createProperty({
    name: 'comment',
    dataType: 'TEXT',
  });

  const { id: reviewerPropId, ops: reviewerOps } = Graph.createProperty({
    name: 'reviewer',
    dataType: 'RELATION', // relation to User
  });

  const { id: eventPropId, ops: eventOps } = Graph.createProperty({
    name: 'event',
    dataType: 'RELATION', // relation to Event
  });

  const { id: reviewTypeId, ops: reviewTypeOps } = Graph.createType({
    name: 'Review',
    properties: [scorePropId, commentPropId, reviewerPropId, eventPropId],
  });

  return {
    ops: [
      ...userNameOps,
      ...userAddressOps,
      ...userTypeOps,
      ...eventNameOps,
      ...eventDateOps,
      ...eventTypeOps,
      ...scoreOps,
      ...commentOps,
      ...reviewerOps,
      ...eventOps,
      ...reviewTypeOps,
    ],
    typeIds: {
      userTypeId,
      eventTypeId,
      reviewTypeId,
    },
    propertyIds: {
      userNamePropId,
      userAddressPropId,
      eventNamePropId,
      eventDatePropId,
      scorePropId,
      commentPropId,
      reviewerPropId,
      eventPropId,
    },
  };
};