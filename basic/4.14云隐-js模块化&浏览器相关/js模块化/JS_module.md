## JS模块化
### 1. 不得不说的历史
#### 背景
JS本身是为了简单页面设计的补充：页面动画、表单提交，并不会内置命名空间或者模块化的概念
> 随着业务的飞速扩张，涌现出了大量的模块化诉求 => JS模块化解决方案的出现

#### 幼年期：无模块化
1. 开始需要在页面中增加不同类型的js的文件，如：动画js、验证js、格式化js
2. 多种js为了维护和可读性，被分在了不同的js文件中
3. 不同的文件在同一个模版中被引用
   ```js
    <script src='./jquery.js'></script>
    <script src='./main.js'></script>
    <script src='./dep1.js'></script>
    <script src='./dep2.js'></script>
   ```
认可：
相比较一个js文件，多个js文件是最简单模块化的思想
问题：
* 污染全局作用域 => 不利于大型项目的协作开发

#### 成长期：模块化的雏形 —— IIFE（语法侧的优化）
##### 作用域的把控
```js
let count = 0
const increase = () => ++count;
const reset = () => {
    count = 0
    console.log("count is reset")
}

increase()
reset()
```
利用函数的函数作用域
```js
(() => {
    let count = 0
    // ……
}())
```
尝试去定义一个简单的模块
```js
const iifeCounterModule = (() => {
    let count = 0
    return {
        increase: () => ++count
        reset: () => {
            count = 0
            console.log("count is reset")
        }
    }
})()
iifeCounterModule.increase()
iifeCounterModule.rest()
```
完成了一个模块的封装，实现了对外暴露功能，保留变量+不污染全局作用域
> 优化1: 如果依赖其他的模块呢？
```js
const iifeCounterModule = ((dependencyModule1, dependencyModule2) => {
    let count = 0
    // dependencyModule1, dependencyModule2
    return {
        increase: () => ++count
        reset: () => {
            count = 0
            console.log("count is reset")
        }
    }
})(dependencyModule1, dependencyModule2)
// 输入、逻辑（局部）、对外暴露接口
```

** 面试题1: 了解早期jquery的依赖处理以及模块加载方案？
答：IIFE 加 传参调配

实际书写时候，采用了revealing的写法：
```js
    const revealingCounterModule = (() => {
        let count = 0
        // dependencyModule1, dependencyModule2
        const increase = () => ++count
        const reset = () => {
            count = 0
            console.log("count is reset")
        }
        return {
            increase,
            reset
        }
    })()
    revealingCounterModule.increase()
    // 本质的实现和方案上并无不同，只是在写法思想上，更强调局部API做原理逻辑，暴露出去的是可调用的面向使用方的接口抽象
```

#### 成熟期：
##### CJS module: CommonJS
> nodejs 制定
特征：
* 通过module + exports来对外暴露接口
* require来调用其他模块
  
模块组织方式
```js
// 模块内部
const dependencyModule1 = require('./dependencyModule1')
const dependencyModule2 = require('./dependencyModule2')

let count = 0
// dependencyModule1, dependencyModule2
const increase = () => ++count
const reset = () => {
    count = 0
    console.log("count is reset")
}

exports.increase = increase
exports.reset = reset

module.exports = {
    increase,
    reset
}

// 引用处
const { increase, reset } = require('./commonJSCounterModule.js')
increase()
reset()

const commonJSCounterModule = require('./commonJSCounterModule.js')
commonJSCounterModule.increase()
commonJSCounterModule.reset()
```

> * 优点：
> CommonJS规范在服务端率先完成了JS的模块化，解决了依赖、全局变量污染的问题

> * 缺点：
> CommonJs主要诞生针对的环境是服务端，对于同步加载没问题。 => 浏览器端的异步问题

##### AMD规范
> 非同步模块的加载，允许指定回调函数
经典实现的框架：require.js

新增定义方式：
```js
// 1. 通过define来定义一个模块
define(id, [depends], callback)

// 2. 外部加载
require([module], callback)
```
```js
// 定义模块
define('amdCounterModule', ['dependencyModule1', 'dependencyModule2'], (dependencyModule1, dependencyModule2) => {
    let count = 0
    // dependencyModule1, dependencyModule2
    const increase = () => ++count
    const reset = () => {
        count = 0
        console.log("count is reset")
    }

    return {
        increase,
        reset
    }
})

// 引入模块
require(['amdCounterModule'], amdCounterModule => {
    amdCounterModule.increase()
    amdCounterModule.reset()
})
```
** 面试题2: 如果现在AMD中使用require来加载同步模块
AMD支持向前兼容，以提供回调的方式来加载同步模块
```js
    define(require => {
        const dependencyModule1 = require('./dependencyModule1')
        const dependencyModule2 = require('./dependencyModule2')

        let count = 0
        const increase = () => ++count
        const reset = () => {
            count = 0
        }

        return {
            increase,
            reset
        }
    })

    define((require, exports, module) => {
        const dependencyModule1 = require('./dependencyModule1')
        const dependencyModule2 = require('./dependencyModule2')

        let count = 0
        const increase = () => ++count
        const reset = () => {
            count = 0
        }

        exports.increase = increase
    })
```

> * 优点：适合在浏览器环境中异步加载模块，可以并行加载多个模块
> * 缺点：提高了开发成本，不能按需加载，而是必须提前加载所有依赖

##### CMD规范 - 编译型
> sea.js
特征：按需加载
```js
    define(function(require, exports, module) {
        let $ = require('jquery')
        // ....
        let dependencyModule1 = require('./dependencyModule1')
        // ....

        // exports.xxx = ...
        // module.exports = ...
    })
```

> * 优点：就近加载
> * 依赖打包，加载逻辑存在于每个模块中


#### 完全体 - ESM模块化
> 走向新时代 => ES

新增定义方式
引入 + 导出 => import + export

```js
import dependencyModule1 from './dependencyModule1.js'
import dependencyModule2 from './dependencyModule2.js'

let count = 0

export const increase = () => ++count
export const reset = () => {
    count = 0
}

export default {
    increase,
    reset
}
```

#### 兼容AMD & CJS
xxx.es.js
xxx.js
xxx.umd.js

umd 兼容 amd 和 cjs
```js
    (define => define((require, exports, module) => {
        const dependencyModule1 = require('dependencyModule1')
        const dependencyModule2 = require('dependencyModule2')

        let count = 0
        const increase = () => ++count
        const reset = () => {
            count = 0
        }

        module.exports = {
            increase,
            reset
        }
    }))(
        typeof module === 'object'
            && module.exports
            && typeof define !== 'function'
                ? // 当前为node / commonJS场景
                    factory => module.exports = factory(require, exports, module)
                : // 当前amd
                    define
    )
```

#### 更多方向 - 静态分析、预编译
```js
    <script>require.config(__FRAMEWORK__CONFIG__)</script>
```

模块化 => 组件化 => 工程化
#### 究极体：工程化
