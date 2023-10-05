# React 18 新特性

React 18 alpha 版已经发布了，新特性和新的 API 聚焦在用户体验和性能提升，一起来看看吧~

- [React18 已正式发布](https://reactjs.org/blog/2022/03/29/react-v18.html)

## 安装

```js
npm install react@alpha react-dom@alpha
```

## Root API

- **Leacy root API**： ReactDOM.render()
- **New root API**：ReactDOM.createRoot()

## 差别

旧 root API

```js
import React from "react";
import ReactDOM from "react-dom";

const container = document.getElementById("root");

ReactDOM.render(<App />, container);
```

新 root API（React 18）

```js
import * as ReactDOM from "react-dom";
import App from "App";

const container = document.getElementById("app");

// 创建个根节点
const root = ReactDOM.createRoot(container);

// 初始渲染: 渲染元素到根节点
root.render(<App tab="home" />);

// 更新时, 不需要再传递容器了
root.render(<App tab="profile" />);
```

## hydration

hydration 函数移动到了 `hydrateRoot`API<br/>
之前：

```js
import ReactDOM from "react-dom";
import App from "App";

const container = document.getElementById("app");

ReactDOM.hydrate(<App tab="home" />, container);
```

之后：

```js
import ReactDOM from "react-dom";
import App from "App";

const container = document.getElementById("app");

// 创建并渲染 hydration.
const root = ReactDOM.hydrateRoot(container, <App tab="home" />);

// 之后可以更新
root.render(<App tab="profile" />);
```

## render callback

在旧 root API，render 接受一个回调

```js
import ReactDOM from 'react-dom';
import App from 'App';

const container = document.getElementById('app');

ReactDOM.render(container, <App tab="home" />, function() {
  // 初始渲染或更新后调用
  console.log('rendered').
});
```

New root API

```js
import * as ReactDOM from "react-dom";
import App from "App";

const rootElement = document.getElementById("app");

ReactDOM.createRoot(rootElement).render(
  <App callback={() => console.log("renderered")} />
);
// 或者
ReactDOM.createRoot(rootElement).render(<App />);
requestIdleCallback(callback);
// 或者
ReactDOM.createRoot(rootElement).render(<App />);
setTimeout(callback, 0);
```

## Automatic batching

批量更新是指多个 state，而不是一个 state 多次更新。

## 差别

之前：

```js
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount((c) => c + 1);
    setFlag((f) => !f);
    // 两个属性更新了，但React只渲染一次（这个就是批量更新）
  }

  function handleClick2() {
    fetchSomething().then(() => {
      // React 17 及之前不会批量更新
      setCount((c) => c + 1); // Causes a re-render
      setFlag((f) => !f); // Causes a re-render
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

React 18 之前仅仅只有 React 事件处理函数中是批量更新的，promise，setTimeout，原生事件和其它事件中都不是批量更新。<br/><br/>
而 React18 中，在 promise，setTimeout，原生事件和其它事件中也都会批量更新了。<br/>
之后：

```js
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    fetchSomething().then(() => {
      // React 18 并且使用 New root API
      setCount((c) => c + 1);
      setFlag((f) => !f);
      // 只会渲染一次
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
```

## 不想批量更新？

```js
import { flushSync } from "react-dom";

function handleClick() {
  flushSync(() => {
    setCounter((c) => c + 1);
  });
  // React 现在更新DOM了
  flushSync(() => {
    setFlag((f) => !f);
  });
  // React 现在更新DOM了
}
```

## startTransition()

React 中如果更新的 DOM 树很大，ODM 比对要花很多时间，容易造成页面失去响应和卡顿。`startTransition()`可以来解决这个问题。
举一个例子：在输入框中输入文字，同时根据输入的文字查询数据展示提示列表。

```js
// 紧迫: 显示输入文字
setInputValue(input);

// 不紧迫: 显示查询结果
setSearchQuery(input);
```

这时如果结果很多，同步渲染结果列表，可能会让输入框卡顿。
React 18 之前所有的更新都是同时渲染的。<br/>

```js
// 紧迫: 显示文字
setInputValue(input);

// 标记state
startTransition(() => {
  // Transition: 显示结果
  setSearchQuery(input);
});
```

意味着 startTransition 标记的 state 更新可以被更加紧迫的更新打断。避免页面卡顿。

## Suspense

```js
<Layout>
  <NavBar />
  <Sidebar />
  <RightPane>
    <Post />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </RightPane>
</Layout>
```

http 请求会阻塞 html 的解析，把`<Comments/>`组件写到`<Suspense/>`中，React 可以跳过请求评论数据，继续解析剩余的 html。这样不会阻塞。

## useDeferredValue

不需要紧迫显示的 text 可以延迟一定时间，降低更新优先级

```js
const deferredValue = useDeferredValue(value, { timeoutMs: 3000 });
```

<br/><br/>

[React 18 所有更新讨论列表](https://github.com/reactwg/react-18/discussions)
