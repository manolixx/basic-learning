const a = 10;
const obj = { a: 10 }
obj.a = 11
// console.log(obj.a) // 11

let b = 0;
b = 10;

var c = 10
{
    var c = 11
}
// console.log(c) // 11

let d = 10
{
    let d = 11
    console.log(d) // 11 
}
console.log(d) // 10




