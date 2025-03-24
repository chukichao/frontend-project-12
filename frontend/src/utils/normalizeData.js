export const normalizeData = (channels) => {
  const entities = channels.reduce((acc, n) => ((acc[n.id] = n), acc), {});
  const ids = Object.keys(entities);

  return { entities, ids };
};
