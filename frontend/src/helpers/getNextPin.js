export default function getNextPin(employees) {
  const biggestPin = employees.reduce(
    (acc, item) => (item.pin > acc ? item.pin : acc),
    0,
  );
  const defaultPin = (+biggestPin + 1).toString();
  return defaultPin;
}
