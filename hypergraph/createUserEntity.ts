import { graph } from './client';
import { Graph } from '@graphprotocol/grc-20';

export const createUserEntity = async ({
  address,
  name,
}: {
  address: string;
  name: string;
}) => {
  // Could have this in a separate schema file, but keeping it simple for now
  const { id: namePropId } = Graph.createProperty({
    name: 'name',
    dataType: 'TEXT',
  });

  const { id: addressPropId } = Graph.createProperty({
    name: 'address',
    dataType: 'TEXT',
  });

  const { id: userTypeId } = Graph.createType({
    name: 'User',
    properties: [namePropId, addressPropId],
  });

  const { id: entityId, ops } = graph.createEntity({
    name: `User ${address}`,
    types: [userTypeId],
    values: [
      { property: namePropId, value: name },
      { property: addressPropId, value: address },
    ],
  });

  return { ops, entityId };
};