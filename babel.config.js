const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        /**
         * useBuiltIns:
         * false: 默认值就是false,不用任何的polyfill相关的代码
         * usage: 代码中需要哪些polyfill, 就引用相关的api
         * entry: 手动在入口文件中导入 core-js/regenerator-runtime, 根据目标浏览器引入所有对应的polyfill
         */
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      // https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
      { runtime: 'automatic' },
    ],
    /**
     * webpack编译ts的方案，1，ts-loader；2，babel，现在用的是第二种方案，因此需要添加@babel/preset-typescrip。
     * 而且react_app源码在解析tsx的时候有这句注释： The preset includes JSX, Flow, TypeScript, and some ESnext features，
     * 因此添加@babel/preset-typescript，如果不添加'@babel/preset-typescript，export type xxx，就会报错：
     * Support for the experimental syntax 'flow' isn't currently enabled (11:8):
     * Add @babel/preset-flow (https://git.io/JfeDn) to the 'presets' section of your Babel config to enable transformation.
     * If you want to leave it as-is, add @babel/plugin-syntax-flow (https://git.io/vb4yb) to the 'plugins' section to enable parsing.
     * 因此需要添加@babel/preset-flow或@babel/preset-typescript。
     */
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
};
