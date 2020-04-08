export const Levels = {
  level1: [
    [
      {
        type: 'character',
        block: false,
        user: true,
        coordinates: { x: 0, y: 0 },
      },
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 1, y: 0 },
      },
      { type: 'rock', block: true, user: false, coordinates: { x: 2, y: 0 } },
    ],
    [
      { type: 'rock', block: true, user: false, coordinates: { x: 0, y: 1 } },
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 1, y: 1 },
      },
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 2, y: 1 },
      },
    ],
    [
      { type: 'rock', block: true, user: false, coordinates: { x: 0, y: 2 } },
      { type: 'rock', block: true, user: false, coordinates: { x: 1, y: 2 } },
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 2, y: 2 },
      },
    ],
    [
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 0, y: 3 },
      },
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 1, y: 3 },
      },
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 2, y: 3 },
      },
    ],
    [
      {
        type: 'terrain',
        block: false,
        user: false,
        coordinates: { x: 0, y: 4 },
      },
      { type: 'rock', block: true, user: false, coordinates: { x: 1, y: 4 } },
      { type: 'rock', block: true, user: false, coordinates: { x: 2, y: 4 } },
    ],
  ],
};

export const getTerrainProperties = (type, object, blocked) => ({
  type,
  object,
  blocked,
});
