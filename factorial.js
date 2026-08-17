const factorial = n => {
  const array = [];
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }

  const res = array.reduce((acc, val) => {
    return (acc = acc * val);
  }, 1);

  return res;
};

factorial(5);

// 1*1 = 1
// 2*1 = 2
// 3*2 = 6
// 4*6 = 24

// o(n) + o(n) = o(n)
// time complexity ---> o(n)
// space complexity ---> o(n)

// ==================================

const factorial = n => {
  let res = 1;
  // for (let i = 1; i <= n; i++) {
  //   res = res * i;
  // }

  while (n > 1) {
    console.log({n});

    res = res * n;
    n--;
    // res *= n--;
  }

  return res;
};

factorial(5);

const recursiveFactorial = n => {
  // base case
  if (n < 2) {
    return 1;
  }

  return n * recursiveFactorial(n - 1);
};

// frame ---> callStack

// 5*4*3*2*1 => 5 * 4!

// 1*1 = 1
// 2*1 = 2
// 3*2 = 6
// 4*6 = 24

// o(n) + o(n) = o(n)
// time complexity ---> o(n)
// space complexity ---> o(n)

// o(n)
// time complexity ---> o(n)
// space complexity ---> o(1)

// ========================== cache ==========================
// بهترین تعادل بین سادگی، سرعت و حافظه
const factorial = (n, memo = {}) => {
  if (n <= 1) return 1;
  if (memo[n]) return memo[n];

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result = result * i;
  }
  memo[n] = result;
  return result;
};

// استفاده:
console.log(factorial(5)); // 120
console.log(factorial(10)); // 3628800
console.log(factorial(5)); // 120 (از کش میاد، O(1) زمان!)
