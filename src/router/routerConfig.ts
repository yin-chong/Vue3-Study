export default [
  {
    path: "",
    redirect: "index",
  },
  {
    path: "/index",
    name: "index",
    component: () => import("../views/index.vue"),
  },
  // vue3 基础语法学习
  {
    path: "/base-study",
    name: "base-study",
    component: () => import("../views/base-study.vue"),
  },
  // 表格封装
  {
    path: "/table",
    name: "table",
    component: () => import("../views/table.vue"),
  },
  // Hooks 鼠标事件监听
  {
    path: "/mouse",
    name: "mouse",
    component: () => import("../views/mouse.vue"),
  },
  // 手写promise
  {
    path: "/promise",
    name: "promise",
    component: () => import("../views/promise.vue"),
  },
  // 数组方法
  {
    path: "/array",
    name: "array",
    component: () => import("../views/array.vue"),
  },
];
