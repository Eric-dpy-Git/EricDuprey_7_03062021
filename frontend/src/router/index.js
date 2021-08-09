import Login from "../views/Auth/Login.vue";

export default [
  { path: "/", component: Login },
  { path: "/Signup", component: () => import("../views/Auth/Signup.vue") },

  { path: "/Home", component: () => import("../views/Home/Home.vue") },

  {
    path: "/Home/AdminHome",
    component: () => import("../views/Admin/AdminHome.vue"),
  },
  {
    path: "/Home/AdminHome/AllUsers",
    component: () => import("../views/Admin/AdminAllUsers.vue"),
  },
  {
    path: "/Home/AdminHome/OneUser/:id",
    component: () => import("../views/Admin/AdminOneUser.vue"),
  },

  {
    path: "/Home/MyProfile",
    component: () => import("../views//Profile/MyProfile.vue"),
  },
  {
    path: "/Home/ModifyProfile",
    component: () => import("../views//Profile/ModifyProfile.vue"),
  },
  {
    path: "/Home/DeleteProfile",
    component: () => import("../views//Profile/DeleteProfile.vue"),
  },

  {
    path: "/Home/NewMessage",
    component: () => import("../views//Message/NewMessage.vue"),
  },
  {
    path: "/Home/ModifyMessage/:messageId",
    component: () => import("../views//Message/ModifyMessage.vue"),
  },
  {
    path: "/Home/OneMessage/:messageId",
    component: () => import("../views/Message/OneMessage.vue"),
  },

  {
    path: "/Home/OneMessage/:messageId/DeleteComment/:commentId",
    component: () => import("../views//Comment/DeleteComment.vue"),
  },
];
