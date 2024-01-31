import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wilde's Blog",
  description: "有时间记录点什么吧",
  base: "/blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
    ],

    sidebar: [
      {
        text: "About",
        link: "/about",
        items: [
          { text: "About", link: "/about" },
          { text: "resume", link: "/resume" },
        ],
      },
      // {
      //   text: "JavaScript",
      //   items: [
      //     { text: "ES2022新特性", link: "/ES2022新特性" },
      //     { text: "js片段", link: "/js片段" },
      //     { text: "React 18 新特性", link: "/React18新特性" },
      //     { text: "webpack删除文件插件", link: "/webpack删除文件插件" },
      //     { text: "JavaScript中的各种距离", link: "/JavaScript中的各种距离" },
      //     { text: "滚动居中菜单", link: "/滚动居中菜单" },
      //     { text: "ES2021新特性", link: "/ES2021新特性" },
      //     // { text: "Examples", link: "/examples" },
      //   ],
      // },
      {
        text: "SQL",
        items: [
          { text: "SQL连接查询", link: "/SQL连接查询" },
          // { text: "SQL数据类型", link: "/SQL数据类型" },
          // { text: "SQL基础", link: "/SQL基础" },
        ],
      },
      {
        text: "总结",
        items: [{ text: "2023总结", link: "/2023总结" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lfl976" }],
  },
});
