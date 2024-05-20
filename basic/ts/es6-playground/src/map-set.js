const map = new Map()

map.set("1", 1)
map.set("2", 2)
const obj = { key: `1` }
map.set(obj, 10)
map.set("1", 11)

console.log(map.get("1"))
console.log(map.get(obj))

const set = new Set()

set.add(1)
set.add(2)
set.add(1)
set.add(1)

console.log(set)

const arr = [1, 2, 5, 1, 2, 5, 2, 6,]
const arrNew = [...new Set(arr)]

console.log(arrNew)



