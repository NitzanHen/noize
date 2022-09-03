import { c } from './utils';
import { binarySearch } from './binarySearch';

export type RandomVariable<T> = (x: number) => T;

export function bernoulliDistribution(p: number) {
  return (i: number) => {
    switch (i) {
      case 1: return p;
      case 0: return 1 - p;
      default: return 0;
    }
  }
}

export function binomialDistribution(n: number, p: number) {
  return (i: number) => Math.pow(p, i) * Math.pow(1 - p, n - i) * c(n, i);
}

export function variable<T>(probabilityMap: [T, number][]) {
  // Used to improve calculations in small probabilities

  const items = probabilityMap.map(([it]) => it);

  // Compute the (normalized) cumulative distribution function
  let acc = 0;
  const cdf: number[] = [];

  for (const [, p] of probabilityMap) {
    acc += p;
    cdf.push(acc);
  }

  console.log(cdf);
  

  return (x: number) => {
    if (x < 0) {
      return 0;
    }
    else if (x > 1) {
      return 1;
    }

    const index = binarySearch(cdf, (i => {
      //console.log(i, cdf[i-1], cdf[i], x)

      if (i !== 0 && x < cdf[i - 1]) { // Move right
        return 1;
      }
      else if (cdf[i] <= x) { // Move left
        return -1;
      }
      // cdf[i - 1] <= x < cdf[i] 
      return 0;
    }));

    return items[index];
  }
}

export function random<T>(variable: RandomVariable<T>): T {
  return variable(Math.random());
}

const n = 90;
const binomial = binomialDistribution(n, 0.5);
const map: [number, number][] = [...Array(n + 1).keys()].map(i => [i, binomial(i)]);
const rndVar = variable(map);

const results = new Map<number, number>();
for (let i = 0; i <= n; i++) {
  results.set(i, 0);
}


for (let i = 0; i < 1_000_000; i++) {
  const res = random(rndVar);
  results.set(res, results.get(res)! + 1);
}

console.log(results);
