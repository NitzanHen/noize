import { variable } from './variable';

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomOf<T>(items: T[], weights?: number[]): T;
export function randomOf<T>(items: Iterable<T>, weights?: number[]): T;
export function randomOf<T>(items: T[] | Iterable<T>, weights?: number[] | undefined) {
  if (!Array.isArray(items)) {
    return randomOf([...items], weights);
  }

  const map = items.map((it, i) => [it, weights ? weights[i] : 1] as [T, number]);
  const rnd = variable(map);

  return rnd(Math.random());
}

export function roll(p: number) {
  return Math.random() > p;
}
  