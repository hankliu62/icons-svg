import { Config, optimize } from 'svgo';
import { createTrasformStreamAsync } from '../creator';

export const svgo = (options: Config) => {
  return createTrasformStreamAsync(async (before) => {
    const { data } = await optimize(before, options);
    return data;
  });
};
