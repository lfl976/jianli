# webpack 删除文件插件

webpack 提供了很多插件，但是有时可能需要我们自己写插件简化工作。

比如，生产模式打包时输出了`[name].js.LICENSE.txt`,影响把文件发布 cdn，可以通过[配置](https://webpack.js.org/plugins/terser-webpack-plugin/#extractcomments)让其不输出。

```js
optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })],
},
```

我们可以通过插件自己修改 webpack 打包输出的文件，也可以让文件不输出。

## 步骤

1. 首先需要找到一个合适的 webpack hook，让我们的插件在这个 hook 时刻执行。
2. 写一个插件。
3. 使用插件。

### webpack hooks

`emit`：输出 asset 到 output 目录之前执行。这个 hook 看起来合适。

### Writing a Plugin

`remove-file-plugin.js`

```js
class RemoveFilePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap(
      "Remove File Plugin",
      (compilation /* compliation参数中有输出的资源  */) => {
        console.log(compilation);
        for (const name in compilation.assets) {
          if (name.endsWith("LICENSE.txt")) {
            delete compilation.assets[name];
          }
        }
      }
    );
  }
}

module.exports = RemoveFilePlugin;
```

### 使用插件

`webpack.config.js`的`plugins`配置字段

```js
const RemoveFilePlugin = require("./remove-file-plugin");
module.exports = (env) => {
  return {
    mode: env.development ? "development" : "production",
    module: {
      rules: [
        {
          test: /(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    plugins: [new RemoveFilePlugin()],
  };
};
```

- [Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/#root)
- [webpack hooks](https://webpack.js.org/api/compiler-hooks/#emit)
