## vue基础用法
### 理论
#### 面试题1: 简单聊聊对于MVVM的理解 < = > 双向绑定
a. 语义化模版
b. MVC - model(结构)  view（dom） controller（调度）
c. MVVM - model  view  viewModel
    i. 数据本身会绑定在viewModel层，视图层根viewModel层相关联
    ii.i. 视图发生变化 => viewModel => 更改数字
    ii.ii. 数据发生变化 => viewModel => 更新视图

### 写法
compiler | defineReactive | tick
#### vue是如何利用mvvm进行写法统一和前端开发
数据双向绑定 => buildTemplate
a. 利用花括号{{  }}构筑了数据与vm的绑定关系
b. 通过视图绑定事件来处理数据 => v-model => :value @input

```js
    // app.vue
    <template>
        <div @click="() => msg++">{{msg}}-{{state.text}}</div>
        <div>{{deepEqual(msg, state.text)}}</div>
        <a-component v-model="data1"></a-component>
    </template>

    // 组合式
    <script setup>
        import { reactive } from 'vue'

        const msg = 'welcome to zhaowa'
        const state = reactive({
            text: 'zhaowa'
        })
    </script>
    
    // 选项式
    <script>
        import { deepEqual } from lodash
        export default {
            data() {
                return {
                    msg: 'welcome to zhaowa',
                    state: {
                        text: 'zhaowa'
                    },
                    deepEqual
                }
            },
            methods: {
                {/* ... */}
            }
        }
    </script>
```

buildTemplate => render()
```js
    <template>
        <div class="data1">{{data1}}</div>
    </template>

    // 更改
    render() {
        return (
            <div class="data1">{ data1 }</div>
        )
    }

    // 优化能力 - domdiff
    <div class="data1" v-for="(item, index) in tempArray" :key="index">
        {{item}}
    </div>

    1 2 3 4 5 6
    6 1 2 3 5 7

    // tick
    // render => vnode => dom
```

#### 生命周期
##### 面试题：vue生命周期
创建阶段： beforeCreate(setup) => created(setup) => beforeMount => mounted
bC: new Vue() - 实例创建 
c: data | props | method | computed - 数据操作

bM: vDom - 数据操作可以进行，不能涉及Dom
m: Dom - 任何操作

更新阶段： beforeUpdate => updated
bU: vDom
u: Dom

销毁阶段： beforeDestroy => destroyed
bD: 实例未被销毁
d: 完全被销毁

