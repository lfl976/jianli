# js 片段

## 实现 new

1. 创建一个空对象
2. 将这个对象的原型指向构造函数的 prototype 属性
3. 将构造函数的 this 赋值给这个空对象(因此 this 指向了这个对象)
4. 执行构造函数内部的代码(为这个新对象添加属性)

```js
function _new(Fn, ...args) {
  let obj = Object.create(Fn.prototype);
  const result = Fn.call(obj, ...args);
  return result instanceof Object ? result : obj;
}

// function A(){}
// _new(A)
```

## instanceof

```js
function _instanceof(leftValue, rightValue) {
  var proto = rightValue.prototype;
  var left = leftValue.__proto__;

  while (true) {
    if (left === null) {
      return false;
    }
    if (left === proto) {
      return true;
    }
    left = left.__proto__;
  }
}

// function A(){}
// var a = new A()
// _instanceof(a, A)
```

## 实现 bind

```js
Function.prototype._bind = function (context, ...args) {
  const fn = this;
  return function (...rest) {
    return fn.call(context, ...args, ...rest);
  };
};

// function test(){}
// test._bind(null, 1,2,3)(4,5,6);
```

## 柯里化

```js
function curry(fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args);
  } else {
    return function (...args2) {
      return curry(fn, ...args, ...args2);
    };
  }
}

// function add2(x, y, z) {
//     return x + y + z
// }

// const add = curry(add2)
// console.log(add(1, 2, 3));
// console.log(add(1)(2)(3));
```

## 防抖

事件触发 n 秒后执行函数，如果 n 秒内又触发了事件，重新计时

```js
function debounce(fn, delay) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, delay);
  };
}

// function print() {console.log(1)}
// let dfn = debounce(print,1000)
// document.onmousemove = function() {
//     dfn()
// }
```

## 节流

每隔 n 秒执行一次函数

```js
// 节流-定时器
function throttle(fn, delay) {
  var timer;
  return function () {
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn();
      timer = null;
    }, delay);
  };
}

// 节流-时间戳
function throttle2(fn, delay) {
  let previous = 0;
  return function () {
    const now = new Date();
    if (now - previous > delay) {
      fn();
      previous = now;
    }
  };
}

// function print() {console.log(1)}
// let tfn = throttle(print, 1000)
// document.onmousemove = function() {
//     tfn()
// }
```

## 生成随机字符串

```js
Math.random().toString(32).substring(2);
//'3nalkn8332g'
```

## UUID

```js
let uuid = self.crypto.randomUUID();
console.log(uuid); // for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
```

## 生成随机颜色

```js
`#${Math.floor(Math.random() * 0xffffff)
  .toString(16)
  .padEnd(6, "0")}`;
// '#a2e0f4'
```

## isPhone

```js
function isPhone(phone) {
  return /^1[3456789]\d{9}$/.test(phone);
}
```

## 发布订阅

```js
class MyEventEmit {
  eventMap = {};
  on(type, handler) {
    (this.eventMap[type] || (this.eventMap[type] = [])).push(handler);
  }

  emit(type) {
    this.eventMap[type].forEach((handler) => handler());
  }
}

var myEmit = new MyEventEmit();

myEmit.on("click", function () {
  console.log("emit...");
});
```

## isNaN() vs Number.isNaN()

- NaN 的类型为 number
- isNaN 函数会先用 Number 把参数转换为数值
- Number.isNaN 不会把参数转换为数值，只有参数为 NaN 时才返回 true

## RGB to Hex

```js
const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
// RGBToHex(255,165,1)
// 'ffa501'
```

## Get a Cookie Value

```js
const cookie = (name) =>
  `; ${document.cookie}`.split(`; ${name}=`).pop().split(";").shift();
// cookie('_ga')
// 'GA1.2.30664543.1648188756'
```

## React useDebounce

```js
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

// 使用
const debouncedSearchTerm = useDebounce(varible, 1000);

useEffect(() => {
  // TODO
}, [debouncedSearchTerm]);
```

## 交换两个变量的值

```js
var a = 1, b = 3;
// 1
a=[b, b=a][0]
// 2
var tem = a
a = b
b = tem
// 3
[b, a] = [a, b]
// 4
cosnt K = a => b => a
a = K(b)(b = a)
// 5
a = a + b
b = a - b
a = a - b
```

## Rating

```js
const rating = (star) => "★★★★★☆☆☆☆☆".slice(5 - star, 10 - star);
// rating(1) '★☆☆☆☆'
```

## getTop

```js
function getTop(e) {
  let offset = e.offsetTop;
  if (e.offsetParent != null) offset += getTop(e.offsetParent);
  return offset;
}
```

## 统计一个页面标签的数量

```js
Object.entries(
  [...document.querySelectorAll("*")]
    .map((item) => item.tagName)
    .reduce((acc, curr) => ((acc[curr] = ++acc[curr] || 1), acc), {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)
  .map((item) => item[0]);
```
