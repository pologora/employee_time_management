import { useContext } from 'react';

export const getSafeContext = (
  context,
  name = 'context',
) => () => {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error(`Missing ${name} data!`);
  }
  return ctx;
};
