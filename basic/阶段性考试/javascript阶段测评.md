1.js的基本数据类型 ： Number String  Boolean Null Undefined Symbol
2.（js性能优化）什么是回流什么是重绘？ 
回流（重排），指几何属性需要改变的渲染。但感觉回流这个词比较高大上，后续统称回流吧。可以理解成将整个网页填白，对内容
重新渲染一次，只不过以人眼的感官速度去看浏览器是不会有任何变化的，若你拥有闪电侠的感官速度去看浏览器回流，就会发现每次
回流都会将页面清空，再从左上角第一个像素从左到右自上到下这样一点点渲染，直至右下角最后一个像素点。每次回流都会呈现该过
程，只是感受不到而已。渲染树的节点发生变化，影响了该节点的几何属性，导致该节点的位置发生变化，此时就会触发浏览器回流并
重新生成渲染树。回流意味着节点的几何属性变化，需要重新计算并生成渲染树，导致渲染树的全部/部分发生变化。

重绘： 重绘是指改变观感属性而不影响几何属性的渲染，相比回流，重绘在两者中会温和一点，后续谈到css的性能优化就会基于
该特点展开。渲染树的节点发生变化，但不影响节点的几何属性。由此可见，回流对于浏览器性能的消耗是高于重绘的，而且回流一定
会伴随着重绘，重绘不一定伴随回流。
3.简述js原型中（prototype）与隐式原型（__proto__）发概念？
原型
原型的本质：对象
所有的函数都有原型属性prototype
默认情况下，prototype是一个Object对象
prototype中默认包含一个属性：constructor，该属性指向函数对象本身

隐式原型
所有的对象都有隐式原型proto属性
隐式原型是一个对象，指向创建该对象的构造函数的原型prototype
在查找对象成员时，若对象本身没有该成员，则会到隐式原型中查找
隐式原型和原型出现的根本原因：js没有记录类型的元数据，因此js只能通过对象的隐式原型找到创建它的函数原型，从而确定其类型

所有函数的隐式原型，都指向Function的原型
所有的函数原型的隐式原型，都指向object原型

4.javascript 垃圾回收方法？
标记清楚（mark and sweep）
这是javaScript 最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数声明一个变量，垃圾回收机器将其标记为“进入环境”，
当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。
垃圾回收器会在运行的时候给储存在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），
在这些完成后仍存在的标记就是要删除的变量了
引用计数（reference counting）
在低版本ie经常存在内存泄漏，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数策略就是跟踪记录每个值被使用的次数，
当生命里一个变量并将一个引用类型赋值给该变量的时候这值引用次数+1，如果该变量的值变成了另一个，则这个值引用次数-1，当这
个值引用次数为0，说明没有变量在使用，这个值就没法被访问了，因此可以将其占用空间回收，这样垃圾回收器会在运行的时候清理掉
引用次数为0的值的占用空间。
在ie中虽然javaScript丢下通过标记清除的方式进行垃圾回收，但Bom与dom对象却是通过引用计数回收垃圾的，也就是说只要涉及
bom与dom都会出现循环引用问题。
5.javascript继承的6种方法？
1.原型链继承、2.借用构造函数继承3.组合继承（原型+借用构造函数）4。原型式继承5.寄生式继承6.寄生组合式继承

6.解释javaScript中this式如何工作的？
实际上this实在运行时进行绑定的，并不是在编写时绑定，他的上下文取决于函数调用时的各种条件。this的绑定和函数的声明位置没
有任何关系，只取决于函数的调用方式。总结：函数被调用时发生this绑定，this指向什么完全取决于函数在哪里被调用。
一、this的绑定规则this一共有四种绑定规则，接下来一一介绍每种规则的解释和规则直接的优先级 默认绑定（严格/非严格模式）
隐式绑定 显示绑定 new绑定 1.1默认绑定（严格/非严格模式）
独立函数调用：独立函数调用时，this使用默认绑定规则，默认绑定规则下this指向window（全局对象）。
严格模式下：this无法使用默认绑定，this会绑定到undefined


7.script标签 defer与async的区别？
如果没有defer 或 async属性，浏览器会立即加载并执行相对应的脚本。他不会等待后续加载的文档元素，读取到就会开始加载执行
相应的脚本。他不会等待后续加载的文档元素，读取到就会开始加载和执行，这样就阻塞了后续文档的加载。

defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析，其区别如下：
●执行顺序：多个带async属性的标签，不能保证加载的顺序；多个带defer属性的标签，按照加载顺序执行；
●脚本是否并行执行：async属性，表示后续文档的加载和执行与js脚本的加载和执行是并行进行的，即异步执行；
defer属性，加载后续文档的过程和js脚本的加载(此时仅加载不执行)是并行进行的(异步)，js脚本需要等到文档所有元素解析完
成之后才执行，DOMContentLoaded事件触发执行之前。

8.typescript比javascript有什么好处？
 1.1TypeScript是JavaScript的加强版，它给JavaScript添加了可选的静态类型和基于类的面向对象编程，它拓展类JavaScript
 的语法。所以ts的功能比js只多不少；
 1.2 TyptScript是纯面向对象的编程语言，包含类和接口的概念。
 1.3 ts在开发时就能给出编译错误，而js错误则需要再运行时才能暴露
 1.4作为强类型语言，你可以明确知道数据的类型。代码可读性极强，极狐每个人都能理解。
 1.5ts中有很多方便的特效，比如可选链
9.列举如下ts中枚举勒烯的取值分别是？并用js实现双向mapping
 enum ENUM{
    A,
    B,
    C="C",
    D="D",
    E=6,
    F,
 }
 console.log(ENUM)
 输出：
 {
  '0': 'A',
  '1': 'B',
  '6': 'E',
  '7': 'F',
  A: 0,
  B: 1,
  C: 'C',
  D: 'D',
  E: 6,
  F: 7
}
js实现
let Enum;
(function(Enum){
    //正向
    Enum['A']= 0;
    Enum['B']= 1;
    Enum['C']= 'C';
    Enum['D']= 'D';
    Enum['E']= 6;
    Enum['F']= 7;
    //逆向
    Enum[0]= 'A';
    Enum['1']= 'B';
    Enum['C']= 'C';
    Enum['D']= 'D';
    Enum['6']= 'E';
    Enum['7']= 'F';
}(Enum||(Enum={})))

10.javascript如何判断array和object？
var obj ={k:'1'};
let arr = [1,2];
使用Array.isArray(obj);
2.instanceof 运算符
console.log(obj instanceof Array) //false
console.log(arr instanceof Array)  //true
3. isPrototypeOf()函数
Array.prototype.isPrototypeOf(arr) //true是数组 false 不是数组
4.利用构造函数 constructor
console.log(obj.constructor == Array) //false
console.log(arr.constructor == Array) //true
5.使用typeof（对象）+类型名结合判断
function isArrayFour(arr){
    if(typeof arr === 'object'){
        if(arr.concat){
            return 'this is Array'
        }else{
            return 'this not Array'
        }
    }
}
console.log(typeof(obj)) //object
console.log(typeof(arr)) //object
console.log(isArrayFour(obj)) //this is Array
console.log(isArrayFour(arr)) //this not Array

