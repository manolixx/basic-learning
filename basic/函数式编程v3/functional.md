## 函数式
### 一、函数式编程的出现
* 发展历程：命令式 => 面向对象式 => 函数式

#### 1. 问题的出现 —— 从一道面试题开始
```js
    // 面试题：上接浏览器原理 —— 参数parse
    // 1. 数组在url中的展示形式
    // location.search => '?name[]=progressive$%coding&name[]=objective$%coding&name[]=functional$%coding'
    // 2. 参数提取拼接数组
    // ['progressive$%coding', 'objective$%coding', 'functional$%coding']
    // 3. 转换成数组对象
    // [{name: 'Progressive Coding'}, {name: 'Objective Coding'}, {name: 'Functional Coding'}]

    const _array = ['progressive$%coding', 'objective$%coding', 'functional$%coding']
    const _objArr = []

    const nameParser = (array, objArr) => {
        array.forEach(item => {
            let names = item.split('$%')
            let newName = []

            names.forEach(name => {
                let nameItem = name[0].toUpperCase() + name.slice(1)

                newName.push(nameItem)
            })
            _objArr.push({
                name: newName.join(' ')
            })
        })
        return objArr
    }

    // 问题：
    // 1. 过程中存在大量包裹逻辑 - 看完整段代码才明白在做啥
    // 2. 存在临时变量，并首尾封闭 - 迭代拓展难度高
```

#### 2. 解决方案 —— 函数化
```js
    // step1. 需求分析 => 数组 > 数组对象 => [字符串 > 对象]
    // nameParser => [ objHelper :: string > object ]

    // step2. 功能明确 => objHelper = formatName + assembleObj

    // step3. 功能拆分 => objHelper = [(split + capitalize + join)] + assembleObj

    // step4. 代码实现
    const _array = ['progressive$%coding', 'objective$%coding', 'functional$%coding']
    // 原子操作
    const assembleObj = (key, x) => {
        let obj = {}

        obj[key] = x
        return obj
    }
    const capitalize = str => str[0].toUpperCase() + str.slice(1)

    // 组装方案
    const formatName = 组装合并(join(' '), map(capitalize), split('$%'))
    const objHelper = 组装合并(assembleObj('name'), formatName)
    const nameParser = map(objHelper)

    nameParser(_array)
```

### 二、函数式编程的原理特点
#### 1. 什么事函数式原理
* 加法结合律 a + b + c = (a + b) + c | 因式分解 ｜ 完全平方公式
* 水源 => 组合（水管 + 转接头） => 花洒

#### 2. 理论思想
##### a. 函数 —— 一等公民 => 1. 逻辑功能实现的落脚点 —— 函数 2. 实现函数 + 拼接流程
##### b. 声明需求的习惯进行的 => react vue
##### c. 传参 => 返回参数：惰性函数；传入参数：科里化；
##### d. 纯函数

#### 2. 惰性函数
```js
    // test(1) test(2) test(3)
    let startCourse = name => {
        if (name === 'progressive') {
            return startCourse = () => {
                console.log('this is progressive')
            }
        } else if (name === 'objective') {
            return startCourse = () => {
                console.log('this is objective')
            }
        } else {
            return startCourse = () => {
                console.log('this is functional')
            }
        }
    }
    startCourse('progressive')()
```

#### 3. 无状态 & 无副作用 => 纯函数
* a. 无状态 - 幂等；数据不可变 - 不可以操作和改变原数据
* b. 无副作用 - 函数内部不能对整个系统做直接的改动残留

```js
    const _class = {
        name: 'objective'
    }

    // 违反无副作用
    const score = str => _class.name = _class.name + ':' + str

    // 违反无状态
    const score = obj => obj.name += '1'

    // **
    const score = name => name += '1'

    _class.name = socre(_class.name)

    const changeClass = (obj, name) => ({...obj, name})
```

#### 4. 流水线的组装 - 加工 & 组装
##### a. 加工 - 科里化
```js
    // f(x, y, z) => f(x)(y)(z)
    const sum = (x, y) => {
        return x + y
    }
    
    sum(1, 2)

    const sum = x => {
        return y => {
            return x + y
        }
    }
    sum(1)(2)

    // 流程 = 加工 + 组装
    const fetch = ajax(method, url, params)
    
    const fetch = ajax.get(method)
    const request = fetch(url)
    合并组合(fetch, request)
```

* 面试题：手写构造可拆分的传参累加函数
  add(1)(2)(3)(4)
```js
    // 1. 构造科里化结构
    // 2. 输入 外层arguments => 类数组的处理
    // 3. 传入参数无限拓展 => 递归 => 返回递归函数本身
    // 4. 主功能区 => 累加
    // 5. 组装输出
    const add = function() {
        // 包含传参
        let args = Array.prototype.slice.call(arguments)

        // 内层结构 - 主体
        let inner = function() {
            args.push(...arguments)
            return inner
        }

        // 全局处理的方法
        inner.toString = function() {
            return args.reduce((prev, cur) => {
                return prev + cur
            })
        }

        // 输出函数：又能够获取值
        return inner
    }

    '' + add(1)(2)(3)(4)
```

##### b. 组装 - 流水线
```js
    const compose = (f, g) => x => f(g(x))

    const sum1 = x => x + 1
    const sum2 = x => x + 2
    const sum12 = compose(sum1, sum2)
    sum12(1)
```

* 实际实现
```js
    // 命令式
    trim(reverse(toUpperCase(map(arr))))

    // 对象式
    arr.map().toUpperCase().reverse().trim()

    // 函数式
    compose(trim, reverse, toUpperCase, map)
    pipe()
```

<!-- koa co库 -->

### 四、BOX和函子 functor
```js
    // 一封信
    class Mail {
        constructor(content) {
            this.content = content
        }
        map(fn) {
            return new mail(fn(this.content))
        }
    }

    // 1. 拆开信
    let mail1 = new Mail('love')

    // 2. 读信
    let mail2 = mail1.map(function(mail) {
        return read(mail)
    })
    // 3. 烧
    let mail3 = mail1.map(function(mail) {
        return burn(mail)
    })
    // 4. 老妈查看
    mail3.map(function(mail) {
        return momCheck(mail)
    })

    // 链式
    new Mail('love').map(read).map(burn).map(momCheck)
```

=> 算法 + 架构设计
iterator 迭代器 职责链