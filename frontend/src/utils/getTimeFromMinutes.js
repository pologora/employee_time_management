export default (min) => {
  const hours = Math.floor(min / 60);
  const minutes = Math.floor(min % 60);
  return `${hours}g ${minutes}min`;
};
