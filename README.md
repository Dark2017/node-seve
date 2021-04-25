# node-serve

## 开始
```
建议使用淘宝镜像源（双倍快乐）安装依赖包：
cnpm i 
or
npm i
运行命令：
npm start
热更新模式：
npm run hot
打包win可执行文件：
npm run pkg
```
## 技术栈
```
前端：vue
后端：nodejs（koa2）
数据库：mysql
```

## 项目介绍
```
本着探索的精神前往js世界中的node后台，想试试node作为服务端的优劣以及用js写服务端的好奇心，于是乎诞生了这个项目，仅仅是作为demo去学习或者帮助初入node的同学们，欢迎大佬来指点。🐶


前端主要是vue2.x脚手架搭建的项目，在这个项目里前端不作为重点，主要是后端，有兴趣可以移步至https://gitee.com/Dark2017/vue-admin查看。

后端主要基于koa2以及各类koa中间件，具体可以查看package中的相应依赖。

```
## 目录结构
```
├─ node-serve
│  ├─ controllers------------------------------接口逻辑
│  │  ├─ common
│  │  │  └─ index.js
│  │  └─ other
│  │     └─ index.js
│  ├─ db---------------------------------------连接数据库
│  │  └─ index.js
│  ├─ koa.js-----------------------------------主入口
│  ├─ logs-------------------------------------日志存放目录
│  │  ├─ access.log-2021-03-09.log
│  │  └─ application.log-2021-03-09.log
│  ├─ middleware-------------------------------中间件
│  │  ├─ logger.js
│  │  └─ schedule.js
│  ├─ package-lock.json------------------------锁死依赖
│  ├─ package.json-----------------------------依赖
│  ├─ public-----------------------------------静态资源目录（暂存图片）
│  ├─ README.md--------------------------------介绍
│  ├─ route------------------------------------路由
│  │  └─ index.js
│  └─ utils------------------------------------工具类
│     ├─ httpCode.js
│     └─ utils.js
```


```


```