function add(a, b) {
    return a + b
}
const add2 = (a, b) => {
    return a + b
}
const add3 = (a, b) => a + b


function testFn() {
    console.log(this.a)
}
const obj = {
    a: 10
}
const obj2 = {
    a: 11
}
obj.fn = testFn
obj.fn()

obj2.fn = testFn
obj2.fn()

class Obj3 {
    a = 13
    testFn2 = () => {
        console.log(this.a)
    }
}
const obj3 = new Obj3()
obj3.testFn2() 
obj.fn = obj3.testFn2
obj.fn()
obj2.fn = obj3.testFn2
obj2.fn()

