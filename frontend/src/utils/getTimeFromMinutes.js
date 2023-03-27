export default (min) => {
  const minRound = Math.round(min);
  const hours = Math.floor(minRound / 60);
  const minutes = Math.floor(minRound % 60);
  return `${hours}h ${minutes}min`;
};
