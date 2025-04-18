// question 1
const arr = ["string", "folan", "hi"];
const str = "string";
arr[1] = "iran"; // yes changes ---> mutable
str[1] = "p"; // no changes ---> immutable
console.log(arr);
console.log(str);

// question 2
new Promise((resolve) => {
  console.log("1");
  resolve(10);
  console.log("1111");
}).then(() => console.log("2"));
console.log("3");

// question 3
const obj = {
  message: "hello",
  function: function hi() {
    console.log(this.message);
  },
};
obj.function();

// result of question 2
1
1111
3
2
// explain : 
console.log("1") → چون در بدنه Promise هست، بلافاصله اجرا می‌شه.

console.log("1111") → بعد از resolve اجرا میشه

console.log("3") → بلافاصله بعد از Promise اجرا می‌شه.

.then(() => console.log("2")) → در microtask queue قرار می‌گیره و بعد از اتمام synchronous code اجرا می‌شه.

خود بدنه promise اجرا میشه اما .then میره تو صف
