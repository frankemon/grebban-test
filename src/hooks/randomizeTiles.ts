const randomizeTiles: (tiles: number[]) => number[] = (tiles) => {
  const randomized = tiles.sort(() => Math.random() - 0.5);
  return randomized;
};

export default randomizeTiles;
