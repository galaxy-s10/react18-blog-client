# 简介

> 主要实现了 create-react-app 的大部分功能

- [x] 基于 react18 + webpack5
- [x] 路由管理：react-router-dom6.x
- [x] 状态管理：redux4.x + react-redux7.x + @reduxjs/toolkit
- [x] 代码规范：eslint + prettier + eslint-plugin-react

- [x] 支持热更新
- [x] 支持 Typescript
- [x] 支持路由懒加载

# 本地运行

安装依赖：

```bash
yarn install
```

启动本地服务，默认运行在 `localhost:8000` 端口（如果 8000 端口被占用了,则往后+1,直到找到一个能用的端口）

```bash
yarn start
```

# 构建部署

> 以下依赖使用了 cdn 加载

- @reduxjs/toolkit
- react
- react-dom
- react-redux
- react-router-dom
- redux

```bash
yarn build
```

# package.json

# 注意

当前运行的 node 版本：v14.17.0

1. 写 jsx/tsx 的时候，如果需要 style、className 等智能提示，则需要安装：@types/react
2. lint-staged，执行一些操作，如：prettier、eslint
3. husky，git 钩子
   1. pre-commit，在 git commit 前执行 lint-staged
   2. commit-msg，在 git commit 后执行 commitlint
4. commitizen，执行 git cz 的时候可规范进行提交 commit
5. @commitlint/cli，@commitlint/config-conventional，对 git commit 的提交信息进行约束
6. standard-version，更新 changeLog.md 以及 package.json 的 version。
