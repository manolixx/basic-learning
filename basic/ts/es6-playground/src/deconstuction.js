let a = 0
let b = 1;

let t = a
a = b
b = t

// 等价于
[a, b] = [b, a]


const [fib1, fib2, fib3] = [1, 1, 2, 3, 5]
console.log(fib1, fib2, fib3)

const { key1: newKey, key2, key3, obj: { o1, o2 } } = { key1: 10, key2: 20, key3: "str", obj: { o1: 1, o2: 2 } }

console.log(newKey)
console.log(key2)
console.log(key3)
console.log(o1)
console.log(o2)