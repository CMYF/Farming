## Farming 春沐源后台管理系统项目

- 请保持所有代码整齐划一，命名请尽量有意义！！！
- 请保持所有js代码要添加分号（;）
- 所有代码提交git前会先经过eslint检查，暂未实施（npm install pre-commit --save-dev）

>前后端分离


- 技术栈
	- java
	- html5
	- element-ui
	- js[vue.js,jQuery]
		- ES6
		- Nodejs
	- css[scss]/css3

### 前端

#### dev 开发流程
- 命令行下执行：'npm run dev'
- 打包上线: 'npm run build'
- 前端采取webpack编译构建开发，配合dev-server插件和node模拟后端服务器进行交互
- 前端渐进式采取es6开发
#
- 把根目录下node_test2.rar copy到项目外的任意目录
- 解压此文件
- 进入到根目录
- 命令行下执行： 'npm install'
- install完成后，执行 'npm start' 即可
``` bash
CMY-Farming
├───build                            # 构建脚本
├───node_modules                     # 第三方依赖，库等
├───dist                             # 上生产编译后的文件目录
├───src                              # 源代码
├───────assets                       # 静态资源，相对的资源路径，将由Webpack解析为模块依赖。
├───────components                   # 组件
├───────fetch                        # 编写请求
├───────lib                          # 第三方库
├───────router                       # 路由
├───────store                        # vuex
├───────views                        # 项目页面
├───static                           # 静态文件 绝对资源路径，不会被 Webpack 处理，它们会直接被复制到最终目录
├───test                             # 测试
├───node_test2.rar                   # 本地模拟服务器

```
#### 图片规范
- 图片格式
  - base64
  - 精灵图
- 图片使用需配合UI规范

#### 样式规范
- 优先使用 class 定义样式（浏览器有缓存）
- 本项目样式变量定义：cmy-variable.scss
- 尽量规避样式层级化（避免浏览器样式搜索）,嵌套scss不要超过三层
- 使用 scss
``` sass
##### 组件规范（同步UI，sass定义）
- font size
	- pc端：$font-base: 12px
- tipic color （未知)

#### js规范

- 优先使用单引号
- if等语句必须使用大括号
- 通常来说，代码即注释

#### 模块化

1. 模块化更多指的是功能(js文件)方面；
   - src/assets/js/modules目录
2. 模块化这里更多指的是业务方面或者跟业务有耦合；

- 本项目情况
	- 架构层：SPA，src目录下的各个页面顶级目录
	- 设计层，views目录下的[page].vue

#### 组件化

1. 组件化这里更多指的是按 UI 设计划分的组合了css，js，html元素的封装为一体的设计；
- 本项目情况
	- src目录下的components目录

#### 参考资料
- [vue](https://cn.vuejs.org/v2/guide/)
- [scss](https://www.sass.hk/guide/)
- [element-ui](http://element.eleme.io/#/zh-CN/component/installation)

