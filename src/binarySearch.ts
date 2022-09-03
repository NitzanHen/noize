
export type BinarySearchQuery<T> = (index: number, val: T) => number;

export function binarySearch<T>(arr: T[], query: BinarySearchQuery<T>) {
  let low = 0, high = arr.length - 1, mid;

  while(low <= high) {
    mid = Math.floor((low + high) / 2);
    const x = arr[mid];    

    const comparison = query(mid, x);

    //console.log(low, mid, high, x, comparison, '\n');

    if(comparison < 0) {
      // Move right
      low = mid + 1;
    }
    else if(comparison > 0) {
      // Move left
      high = mid - 1;
    }
    else {
      // Target found
      return mid;
    }
  }

  // Target not found
  return -1;
}