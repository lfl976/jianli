# vue2 简单实现

```html
<!DOCTYPE html>
<html>
  <head>
    <title>SimpleVue</title>
  </head>
  <body>
    <div id="app">
      <p>{{ message }}</p>
      <button @click="changeMessage">Change Message</button>
    </div>

    <script>
      // 1. 数据响应性
      function defineReactive(obj, key, value) {
        let dep = new Dep();
        Object.defineProperty(obj, key, {
          get() {
            if (Dep.target) {
              dep.addDep(Dep.target);
            }
            return value;
          },
          set(newValue) {
            value = newValue;
            dep.notify();
          },
        });
      }

      class Dep {
        constructor() {
          this.subs = [];
        }

        addDep(sub) {
          this.subs.push(sub);
        }

        notify() {
          this.subs.forEach((sub) => sub.update());
        }
      }

      class Watcher {
        constructor(vm, key, cb) {
          this.vm = vm;
          this.key = key;
          this.cb = cb;
          Dep.target = this;
          this.vm[this.key];
          this.update();
          Dep.target = null;
        }

        update() {
          console.log(this.vm[this.key]);
          this.cb.call(this.vm, this.vm.$data[this.key]);
        }
      }

      // 2. 模板编译
      function compile(el, vm) {
        const nodes = el.childNodes;
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node.nodeType === 1) {
            compile(node, vm);
          } else if (node.nodeType === 3) {
            const text = node.textContent;
            const reg = /\{\{(.*)\}\}/;
            if (reg.test(text)) {
              console.log(node.nodeType);
              const key = RegExp.$1.trim();
              new Watcher(vm, key, function (value) {
                node.textContent = text.replace(reg, value);
              });
            }
          }
        }
      }

      class SimpleVue {
        constructor(options) {
          this.$data = options.data;
          this.$el = document.querySelector(options.el);

          // 数据响应式
          Object.keys(this.$data).forEach((key) => {
            defineReactive(this.$data, key, this.$data[key]);
          });

          // 模板编译
          compile(this.$el, this);

          // 初始化视图
          this.$el.innerHTML = this.$el.innerHTML;
        }
      }

      const app = new SimpleVue({
        el: "#app",
        data: {
          message: "Hello, SimpleVue!",
        },
      });

      // 通过按钮改变数据
      app.changeMessage = function () {
        app.message = "Message changed!";
      };
      console.log(app);
    </script>
  </body>
</html>
```
