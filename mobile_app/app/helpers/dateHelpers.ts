export function getLocalTime() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  const localDateTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
  return localDateTime;
}

export function getBoundaryTime(hour: number) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset();
  const boundary = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
  );

  return new Date(boundary.getTime() - timezoneOffset * 60 * 1000);
}
