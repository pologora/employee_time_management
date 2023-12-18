export function sortAlphabeticallyAscending(a, b) {
  if (a.surname < b.surname) {
    return 1;
  }
  if (a.surname > b.surname) {
    return -1;
  }
  return 0;
}

export function sortAlphabeticallyDescending(a, b) {
  if (a.surname < b.surname) {
    return -1;
  }
  if (a.surname > b.surname) {
    return 1;
  }
  return 0;
}

export function sortByPinAscending(a, b) {
  return a.pin - b.pin;
}

export function sortByPinDescending(a, b) {
  return b.pin - a.pin;
}
