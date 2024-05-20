function fib(n) {
    let a = 1
    let b = 1
    while (--n) {
        const t = b
        b += a
        a = t
    }
    return a
}
// console.log(fib(1))
// console.log(fib(2))
// console.log(fib(3))
// console.log(fib(4))

function* genFib() {
    // console.log("gen 开始执行")
    let a = 1
    let b = 1
    while (true) {
        // console.log("gen 即将yield")
        yield a
        // console.log("gen yield 返回")
        const t = b
        b += a
        a = t
    }
}
const gen = genFib()
for (let i = 0; i < 5; i++) {
    console.log(gen.next())
}

const [a, b, c, d, e, f, g] = genFib()
console.log(a, b, c, d, e, f, g)

let n = 10
for (let i of genFib()) {
    if (n-- == 0) break
    console.log(i)
}

for (let i of [1, 2, 3, 4, 5]) {
    console.log(i)
}

const obj = {
    key1: "val1", key2: "val2",
    [Symbol.iterator]: function () {
        let i = 1
        console.log(i)
        return {
            next: function () {
                const temp = { value: obj[`key${i}`], done: i <= 2 ? false : true }
                i++
                return temp
            }
        }
    }
}
for (let i of obj) {
    console.log(i)
}

const obj2 = { "0": "val0", "1": "val1", length: 2 }
obj2[Symbol.iterator] = Array.prototype[Symbol.iterator]
for (let i of obj2) {
    console.log(i)
}