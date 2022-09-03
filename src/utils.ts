
export function c(n: number, k: number) {
  if(k < 0 || k > n) {
    return 0;
  }

  let result = 1;
  for (let i = n - k + 1; i <= n; i++) {
    result *= i;
  }
  for (let i = 2; i <= k; i++) {
    result /= i;
  }

  return result;
}