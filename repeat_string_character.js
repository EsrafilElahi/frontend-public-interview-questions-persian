const string = 'helol';
const character = 'l';

const f1 = (str, char) => {
  let count = 0;

  for (const elem of str) {
    if (char === elem) {
      count++;
    }
  }

  console.log({ count });
  return count;
};

// f1(string, character);
// T: o(n)
// S: o(1)

const f2 = (str, char) => {
  const two = str.split(char);

  console.log({ len: two.length - 1, two, string });
};

// f2(string, character);
// T: o(n)
// S: o(n)

const f3 = (str, char) => {
  const strArr = str.split('');

  const res = strArr.filter((item) => item === char);

  console.log({ strArr, res });
};

// f3(string, character);
// T: o(n)
// S: o(n)

const f4 = (str, char) => {
  const strArr = str.split('');

  const count = strArr.reduce((acc, val) => {
    if (val === char) {
      acc += 1;
    } else {
      acc;
    }

    return acc;
  }, 0);

  console.log({ count });
};

f4(string, character);
// T: o(n)
// S: o(n)
