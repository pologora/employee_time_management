export default function getAgienciesIdToNameMap(agencies) {
  const map = new Map();
  for (let i = 0; i < agencies.length; i += 1) {
    const { _id, name } = agencies[i];
    map.set(_id, name);
  }
  return map;
}
