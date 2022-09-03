
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randomOf<T>(items: T[]): T;
export function randomOf<T>(items: Iterable<T>): T;
export function randomOf<T>(items: T[] | Iterable<T>) {
  if(!Array.isArray(items)) {
    return randomOf([...items]);
  }

  return items[randomInt(0, items.length)];
}

// Base message
// Emoji
// More text

export class Noize {

  public random() {
    return Math.random();
  }
}