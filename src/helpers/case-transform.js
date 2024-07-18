export const snakeCaseToNormalString = (value) => {
  return value
    ?.split('_')
    .map((w) => `${w[0].toUpperCase()}${w.slice(1)}`)
    .join(' ');
};
