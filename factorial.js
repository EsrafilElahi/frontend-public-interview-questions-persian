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


======================================

  // !5 ---> 5*4*3*2*1
// !4 ---> 4*3*2*1
// !3 ---> 3*2*1
// !2 ---> 2*1
// (!1 || !0) ---> 1

const factorial_recursive = (n) => {
  // base case
  if (n < 2) {
    return 1;
  }

  return n * factorial_recursive(n - 1);
};

// T: o(n)
// S: o(n)

const cache = { 0: 0, 1: 1 };
const factorial_cached = (n) => {
  if (n in cache) {
    return cache[n];
  }

  cache[n] = n * factorial_cached(n - 1);

  return cache[n];
};

// T: o(n)
// S: o(n)

const factorial_for = (n) => {
  if (n < 2) {
    return 1;
  }

  const arr = [];
  let sumFor = 1;
  for (let i = 2; i <= n; i++) {
    arr.push(i);
    sumFor *= i;
  }

  let sum = 1;
  arr.forEach((item) => {
    return (sum *= item);
  });

  const sumReduced = arr.reduce((acc, val) => {
    return (acc *= val);
  }, 1);

  console.log({ res, sum, sumFor, sumReduced });
};

// T: o(n)
// S: o(n) || o(1)

const factorial_while = (n) => {
  let res = 1;

  while (n > 1) {
    res *= n;
    n--;
  }

  return res;
};

// T: o(n)
// S: o(1)
console.log(factorial_while(6));
