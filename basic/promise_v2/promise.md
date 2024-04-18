### 异步解析
* 啥是异步
```js
    // 异步执行
    let count = 1
    let timer = setTimeout(function() {
        count++
        console.log('in', count)
    })

    console.log('out', count)
    // 为什么？

    // 循环执行 + 终止
    let count = 1
    let timer = setInterval(function() {
        count++
        console.log('in', count)
    }, 1000)
    console.log('out', count)

    setTimeout(function() {
        clearInterval(timer)
        console.log('clear')
    }, 5000)

    // 持续性的动作
    // 看不见的队列，存放着我们需要持续、等待、悄悄地执行的指令
```

### 1. 进程 & 线程
#### a. 概念 & 区别
#### b. 面试题：
* 映射到前端 - 浏览器 chrome新开一个窗口，是进程还是线程？ - 进程
* 发散方向：
方向一：窗口（进程）间通信 - storage、cookie => 多种存储的区别 => 回归项目
方向二：浏览器原理

#### 浏览器的执行原理

### 2. EVENT-LOOP
#### a. 执行栈
* JS单线程语言

#### b. 执行顺序题
```js
    setTimeout(() => {
        console.log('timeout')
    }, 0)                                       // 进入宏任务队列

    new Promise(resolve => {
        console.log('new Promise')              // 同步执行
        resolve()
    }).then(() => {
        console.log('Promise then')             // 放入微任务应用队列
    }).then(() => {
        console.log('Promise then then')        // 放入微任务应用队列
    })

    console.log('hi')                           // 同步执行
```

### promise
请求当前用户可访问 => 请求数据是否可以获取 => 请求当前页面的数据
回调地狱 
```js
    function wait500(input) {
        return new Promise((resolve, reject) => {
            console.log(500, input)
            setTimeout(() => {
                resolve(input + 500)
            }, 500)
        })
    }

    function wait1000(input) {
        return new Promise((resolve, reject) => {
            console.log(1000, input)
            setTimeout(() => {
                resolve(input + 1000)
            }, 1000)
        })
    }
    

    const p = new Promise((resolve, reject) => {
        resolve(1)
    })

    p.then(wait500)
    .then(wait500)
    .then(wait1000)
    .then(wait500)
    .then(wait1000)
    .then(result => {
        console.log('END', result)
    })

    // 全部执行 - all
    Promise.all([wait500, wait1000]).then(result => {
        console.log('all done', result)
    })

    // 竞争执行 - race
    Promise.race([wait500, wait1000]).then(result => {
        console.log('race done', result)
    })
```

#### b. 面试 - Promise
* 1. promise原理
状态：
主 - pending ｜ fulfilled ｜ rejected
executor - new Promise 立刻执行 ｜ 接收resolve reject

默认态 + 状态流转：
默认状态 - pending
状态流转 - pending => rejected | pending => fulfilled

返回值：
then - 接收onFulfilled和onRejected | value or reason

* 2. 手写
```js
    const PENDING = 'PENDING'
    const FULFILLED = 'FULFILLED'
    const REJECTED = 'REJECTED'

    // 完整版
    class myPromise {
        constructor(executor) {
            this.status = PENDING;
            this.value = undefined;
            this.reason = undefined;

            this.onResolvedCallbacks = [];
            this.onRejectedCallbacks = [];

            let resolve = value => {
                if (this.status === PENDING) {
                    this.status = FULFILLED;
                    this.value = value;
                    this.onResolvedCallbacks.forEach(fn => fn());
                }
            }

            let reject = reason => {
                if (this.status === PENDING) {
                    this.status = REJECTED;
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach(fn => fn());
                }
            }

            try {
                executor(resolve, reject);
            } catch (error) {
                reject(error);
            }
        }

        then(onFulfilled, onRejected) {
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
            onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };

            let promise2 = new myPromise((resolve, reject) => {
                if (this.status === FULFILLED) {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }

                if (this.status === REJECTED) {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }

                if (this.status === PENDING) {
                    this.onResolvedCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onFulfilled(this.value);
                                this.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });

                    this.onRejectedCallbacks.push(() => {
                        setTimeout(() => {
                            try {
                                let x = onRejected(this.reason);
                                this.resolvePromise(promise2, x, resolve, reject);
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });
                }
            });

            return promise2;
        } catch(onRejected) {
            return this.then(null, onRejected);
        }

        resolvePromise(promise2, x, resolve, reject) {
            if (promise2 === x) {
                return reject(new TypeError('Chaining cycle detected for promise'));
            }

            let called = false;
            if (x instanceof Promise) {
                x.then(y => {
                    this.resolvePromise(promise2, y, resolve, reject);
                }, error => {
                    reject(error);
                });
            } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
                try {
                    let then = x.then;
                    if (typeof then === 'function') {
                        then.call(x, y => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, y, resolve, reject);
                        }, error => {
                            if (called) return;
                            called = true;
                            reject(error);
                        });
                    } else {
                        resolve(x);
                    }
                } catch (error) {
                    if (called) return;
                    called = true;
                    reject(error);
                }
            } else {
                resolve(x);
            }
        }
    }   


    // 测试用例
    const asyncOperation = new myPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('异步逻辑 等待1s');
        }, 1000);
    });

    asyncOperation
        .then(value => {
            console.log('then:', value);
            return '1. 第一个then的返回';
        })
        .then(value => {
            console.log('Second then:', value);
            return new myPromise((resolve, reject) => {
                setTimeout(() => {
                    resolve('2. 第二个then的返回');
                }, 500);
            });
        })
        .then(value => {
            console.log('Third then:', value);
            throw new Error('3. 第三个then会报一个错误');
        })
        .catch(error => {
            console.error('Catch:', error.message);
        });
```
