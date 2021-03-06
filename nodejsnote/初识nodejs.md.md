## 1.  what

>  Node.js 是什么

+ node是javascript 在服务器后端领域的应用
  + Node.js 是谷歌 V8 引擎、libuv平台抽象层以及主体使用 Javscript 编写的核心库三者集合的一个包装外壳，大量使用了使用事件驱动来实现异步开发。此外，在实时的Web应用上采用了基于 WebSocket 的推送技术，客户端和服务器端都可以发起通信，能够自由地交换数据。非常优雅、实用的打通了前后端。
    + V8是谷歌开发的，目前公认最快的 Javascript 解析引擎，并且具备服务器端解析能力。libuv 是一个开源的、为 Node 定制而生的跨平台的异步 IO 库。
  + 没有 BOM、DOM
  + ECMAScript
    - 变量
    - 方法
    - 数据类型
    - 内置对象
    - Array
    - Object
    - Date
    - Math
  + 为 JavaScript 提供了一些服务器级别的 API
    - 文件操作的能力
    - http 服务的能力

## 2.why

> 为什么使用nodejs

+ 非阻塞的异步 I/O 调用
+ 统一协议端口：从 IRC 开始，有许多开源或者不开源的协议都运行在非标准端口上， 使用Node.js 则统一在标准的80端口运行 WebSockets。
+ 无需太复杂的计算：轻量级、高流量并且能良好的应对跨平台设备上运行密集型数据。
+ 对象数据库接口：Node.js十分适合通过对象数据库（object DB）来查询数据（如 MongoDB）。以 JSON 格式存储的数据允许 Node.js 直接处理，不需要纠结数据转换和匹配的问题。
+  队列输入:  聊天应用要处理高量并发的数据，而Node.js的队列输出正解决了这个问题：在数据真正的写入之前就承认客户端的数据是真实的。（开发中通常的做法是，种耗时的操作通过回调函数来异步处理，主线程继续往下执行）
+ 数据流接收数据：我们可以在线处理正在上传中的文件，因为数据是通过流的形式进行接收。那么，实时音频和实时视频在一个网页上就能进行，无需再通过一个应用程序。
+ Node.js擅长领域
  + 后台管理系统、实时交互系统、联网软件、高并发量的web应用程序；
  + 基于web、canvas等多人联网游戏；
  + 基于web的多人实时聊天客户端；
  + 单页面浏览器应用程序；
  + 操作数据库、为前端和移动端提供基于json的API；

## 3.  how

> nodejs的工作原理

+ event-driven  事件驱动

+ 模块系统

+ non-blocking  非阻塞的异步I/O调用

+ lightweight  省空间、省设备，轻量意味着更好的移植性

+ Node.js是跨平台的项目，可以运行在Linux、Unix、Windows

+ efficient 高效（node.js是基于单线程）

  + 在PHP或者JSP中，是每个新增一个连接（请求）便生成一个新的线程，这个新的线程会占用系统内存，最终会占掉所有的可用内存。而 Node.js 仅仅只运行在一个单线程中，使用非阻塞的异步 I/O 调用，所有连接都由该线程处理，在 libuv 的加分下，可以允许其支持数万并发连接（全部挂在该线程的事件循环中）

  + > 注意：Node.js也有潜在的缺陷，比如：如果所有客户端的请求共享单一线程时也会有问题, 大量的计算可能会使得 Node 的单线程暂时失去反应, 并导致所有的其他客户端的请求一直阻塞, 直到计算结束才恢复正常；
    >
    >
    >
    > ​       因此，开发时千万不要让一个 Exception 阻塞核心的事件循环，因为这将导致 Node.js 的应用程序崩溃。比如在 PHP 中某个页面挂掉是不会影响网站运行的，但是 Nodejs 是一个线程一个线程来处理所有的链接，因此一旦异常阻塞了都可能会影响到其他所有的链接。
    >
    >
    >
    > ​      当然，Node.js中有很多工具和策略来帮助我们解决上述的问题，比如：异常回调传递， Forever 进行进程监视等

## 4.  Node.js的开发环境配置

+ 安装：

  + 进入官网：https://nodejs.org/en/download/，根据机子型号下载32-bit或者64-bit的安装包。

  - 双击安装包进行安装

+ 初体验

  + 检查node版本

    ```bash
    node -v
    ```

  + REPL

    ```bash
    node
    >var a = 1
    undefined
    >var b = 2
    undefined
    >a + b
    3
    >_ - 4
    -1
    > .exit
    ```

  - 执行js文件

    - 新建文件test.js

      ```javascript
      //test.js
      var a = 1
      console.log(a)
      ```

    - cmd切换到test.js目录下

      ```bash
      node test.js
      ```








