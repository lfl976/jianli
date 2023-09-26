import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Leo's Blog",
  description: "探索技术、旅行和观察的精彩世界。",
  base: "/blog/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
    ],

    sidebar: [
      {
        text: "List",
        items: [
          { text: "Examples", link: "/examples" },
          { text: "About", link: "/about" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/lfl976" }],
  },
});
