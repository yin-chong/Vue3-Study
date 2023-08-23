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
  {
    path: "/base-study",
    name: "base-study",
    component: () => import("../views/base-study.vue"),
  },
];
