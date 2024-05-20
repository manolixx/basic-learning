
let isXX = true
let str = "this is string"
let num = 10
let u = undefined
let n = null
let arr = [1, 2, 3]
let obj = { key: "value" }


let isXX2: boolean = true
let str2: string = "this is string"
let num2: number = 10
let u2: undefined = undefined
let n2: null = null
let arr2: number[] = [1, 2, 3]
let arr3: Array<number> = [1, 2, 3]

let obj2: { key: string, key2: number[] } = { key: "value", key2: [1, 2, 3] }

let u3 = void 0


// tuple
let t: [number, string] = [1, "string"]
let arrT = [1, "string"]

// t[0] = "string"     会报错
// arrT[0] = "string"  不会报错

// enum 枚举

enum Sex {
    MAN = 10,
    WOMAN = 10,
}
console.log(Sex.MAN)
console.log(Sex.WOMAN)

enum Score {
    BAD = "BAD1",
    NG = "NG1",
    GOOD = "GOOD1",
    PERFECT = "PERFECT",
    PERFECT2 = "PERFECT",
    很好 = "PERFECT"
}

console.log(Score.BAD)

// 反向映射
console.log(Sex[10])
// string类型的enum不支持反向映射
console.log(Score["BAD1"])

console.log(Score)
// 不好的实践，
const test = { '10': 'MAN', '11': 'WOMAN', MAN: 10, WOMAN: 11 }
// 可以修改枚举值，造成不可预知的错误
test.MAN = 20

// any
let anyValue: any = "anyValue"
anyValue = 120
anyValue = true

let unknowValue: unknown = "1000"
unknowValue = 10
unknowValue = true

function add(num: number) {
    return num + 1
}
// add(anyValue)    不报错
// add(unknowValue) 报错

function voidFun(): void {
    console.log("no return")
}
function error(): never {
    throw new Error()
}
function deadLoop(): never {
    while (true) {
    }
}

interface Classmate {
    name: string
    age: number
    height?: number
    [prop: string]: any
}

const classmate1: Classmate = { name: "张三", age: 10, height: 180, xxx: 10 }
const classmate2: Classmate = { name: "李四", age: 11 }
const list: Classmate[] = [classmate1, classmate2]

type Classmate2 = {
    name: string
    age: number
    height?: number
}


interface A {
    name: D
}
interface B {
    name: E
}
interface D {
    d: boolean
}
interface E {
    e: string
}
type AB = A & B

let ab: AB = {
    name: {
        d: true,
        e: "string"
    }
}

interface A1 {
    t: string
}
interface B1 {
    t: number
}
type AB1 = A1 & B1
// let ab1: AB1 = { t: error() }
// ab1.t


const val: number | string = 10 > 5 ? 10 : "aaa"

type Color = "blue" | "yellow" | "red" | "gray"
const color: Color = "blue"
const colorMap: Record<Color, string> = {
    blue: "#124578",
    yellow: "#",
    red: "#",
    gray: ""
}

class Teacher {
    name: string
    courses: string[]
}
class Student {
    name: string
    startTime: Date
}
class TA {
    name: string
    age: number
}

type ClassNum = Teacher | Student | TA

function startCourse(num: ClassNum) {
    if ('courses' in num) {
        num
    } else {
        num
    }
    // if ("startTime" in num) {
    //     num
    // }
}

function startCourse2(num: ClassNum) {
    if (num instanceof Teacher) {
        num
    }
    if (num instanceof Student) {
        num
    }
}


const anyValNum: any = 10
function addNew({ num }: { num: number }) {
    return num + 1
}
addNew({ num: anyValNum as number })

const anyValStr: any = "this is string";

(<string>anyValStr).indexOf("is")

classmate1.height?.toFixed()
// 等价于
classmate1.height !== undefined && classmate1.height !== null
    ? classmate1.height.toFixed()
    : classmate1.height

const temp = classmate1.height!
// 等价于
const temp2 = classmate1.height as number
temp.toFixed()


const numberArr = new Array<number>()
const stringArr = new Array<string>()
const booleanArr: boolean[] = new Array<boolean>()
const classmateArr: Array<Classmate> = new Array<Classmate>()

const numberSet: Set<number> = new Set<number>()
const kvMap: Map<number, string> = new Map<number, string>()

type ClassmatePartial = Partial<Classmate>
type ClassmeteRequired = Required<Classmate>
type ClassmetaReadonly = Readonly<Classmate>

type ClassmetePick = Pick<Classmate2, "name" | "age">
// 等价于
type ClassmeteOmit = Omit<Classmate2, "height">

const myMap: Record<string, string> = {
    blue: "#124578",
    yellow: "#",
    red: "#",
    gray: "",
    xxx: 'xxx'
}

type AddFunctionReturnType = ReturnType<typeof addNew>

function fnTypeTest(num: Array<number>) {
    return num.map(i => i.toString()).map(i => i == "0" ? null : i)
}

type fnTypeTest2 = ReturnType<typeof fnTypeTest>

// keyof Classmate2 等价于 "name"|"age"|"height"
type ExcludeTest = Exclude<keyof Classmate2, "height">

type ClassNumExclude = Exclude<ClassNum, TA>

const DocoratorForPerson = ({ username }: { username: string }) => (target: any) => {
    target.username = username
}

@DocoratorForPerson({ username: "李四" })
class Person {
    static username: string
}

console.log(Person.username)

function demo1(target: any) {
    console.log("demo1")
}
function demo2() {
    console.log("demo2")
    return (target: any) => {
        console.log("demo2 里面")
    }
}
function demo3() {
    console.log("demo3")
    return (target: any) => {
        console.log("demo3 里面")
    }
}

function demo4(target: any) {
    console.log("demo4")
}

@demo1
@demo2()
@demo3()
@demo4
class Person2 {
    static username: string
}