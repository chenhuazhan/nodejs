## 1.  模块化

> 在nodejs中，每个js文件都是一个独立的模块，各个模块中定义的变量，函数等默认只能当前模块中使用

nodejs模块化使用commonjs模块化标准

### 核心模块

- 核心模块是由 Node 提供的一个个的具名的模块，它们都有自己特殊的名称标识，例如
  - fs 文件操作模块
  - http 网络服务构建模块
    - require
    - 端口号
      - ip 地址定位计算机
      - 端口号定位具体的应用程序
    - Content-Type
      - 服务器最好把每次响应的数据是什么内容类型都告诉客户端，而且要正确的告诉
      - 不同的资源对应的 Content-Type 是不一样，具体参照：http://tool.oschina.net/commons
      - 对于文本类型的数据，最好都加上编码，目的是为了防止中文解析乱码问题
    - 通过网络发送文件
      - 发送的并不是文件，本质上来讲发送是文件的内容
      - 当浏览器收到服务器响应内容之后，就会根据你的 Content-Type 进行对应的解析处理
  - os 操作系统信息模块
  - path 路径处理模块
  - 。。。。
- 所有核心模块在使用的时候都必须手动的先使用 `require` 方法来加载，然后才可以使用，例如：
  - `var fs = require('fs')`

### npm包管理模块

使用npm包管理工具下载的第三方包

### 自定义模块

用户自己写的模块

### 模块加载require

在 Node 中，可以通过 require 方法来加载执行多个 JavaScript 脚本文件

- require 加载只能是执行其中的代码，文件与文件之间由于是模块作用域，所以不会有污染的问题
  - 模块完全是封闭的
  - 外部无法访问内部
  - 内部也无法访问外部

+ 加载核心模块和npm包管理模块

  ```javascript
  require('http')
  require('express')
  ```

+ 加载自定义模块

  引入这种模块时，相对路径必须加 ./，可以省略后缀名，相对路径中的 ./ 不能省略，否则报错

  ```javascript
  require('./login')
  require('./register.js')
  ```


### 模块导出exports

- 模块作用域固然带来了一些好处，可以加载执行多个文件，可以完全避免变量命名冲突污染的问题
- 但是某些情况下，模块与模块是需要进行通信的
- 在每个模块中，都提供了一个对象：`exports`
- 该对象默认是一个空对象，需要把外部访问使用的成员手动的挂载到 `exports` 接口对象中

- 然后谁来 `require` 这个模块，谁就可以得到模块内部的 `exports` 接口对象

  ```javascript
  //data.js
  exports.foo = 'hello'
  var bar = 'module'
  exports.bar = bar
  ```

  ```javascript
  //person.js
  module.exports = {
      name: 'zs',
      age: 18,
      eat(){
          console.log(this.name + '吃耙耙')
      }
  }
  ```

  ```javascript
  //index.js
  var data = require('./data')
  var person = require('./person')
  console.log(data.foo + ' ' + data.bar)
  person.eat()
  
  // 用来获取机器信息的
  var os = require('os')
  // 用来操作路径的
  var path = require('path')
  // 获取当前机器的 CPU 信息
  console.log(os.cpus())
  // memory 内存
  console.log(os.totalmem())
  // 获取一个路径中的扩展名部分
  // extname extension name
  console.log(path.extname('c:/a/b/c/d/hello.txt'))
  ```

## 2.  全局对象

> 类似客户端js开发环境的全局对象window对象，nodejs中的全局对象是global对象。



```
核心模块的本质也是文件
核心模块文件已经被编译到了二进制文件中了，我们只需要按照名字来加载就可以了
require('fs')
require('http')

第三方模块
凡是第三方模块都必须通过 npm 来下载
使用的时候就可以通过 require('包名') 的方式来进行加载才可以使用
不可能有任何一个第三方包和核心模块的名字是一样的
既不是核心模块、也不是路径形式的模块
   先找到当前文件所处目录中的 node_modules 目录
   node_modules/art-template
   node_modules/art-template/package.json 文件
   node_modules/art-template/package.json 文件中的 main 属性
   main 属性中就记录了 art-template 的入口模块
   然后加载使用这个第三方包
   实际上最终加载的还是文件

   如果 package.json 文件不存在或者 main 指定的入口模块是也没有
   则 node 会自动找该目录下的 index.js
   也就是说 index.js 会作为一个默认备选项

   如果以上所有任何一个条件都不成立，则会进入上一级目录中的 node_modules 目录查找
   如果上一级还没有，则继续往上上一级查找
   。。。
   如果直到当前磁盘根目录还找不到，最后报错：
     can not find module xxx
var template = require('art-template')

注意：我们一个项目有且只有一个 node_modules，放在项目根目录中，这样的话项目中所有的子目录中的代码都可以加载到第三方包
不会出现有多个 node_modules
模块查找机制
   优先从缓存加载
   核心模块
   路径形式的文件模块
   第三方模块
     node_modules/art-template/
     node_modules/art-template/package.json
     node_modules/art-template/package.json main
     index.js 备选项
     进入上一级目录找 node_modules
     按照这个规则依次往上找，直到磁盘根目录还找不到，最后报错：Can not find moudle xxx
   一个项目有且仅有一个 node_modules 而且是存放到项目的根目录
```