import Login from "./components/Auth/Login.vue";
import Signup from "./components/Auth/Signup.vue";

import Home from "./components/Home/Home.vue";

import AdminHome from "./components/Admin/AdminHome.vue";
import AdminAllUsers from "./components/Admin/AdminAllUsers.vue";
import AdminOneUser from "./components/Admin/AdminOneUser.vue";

import MyProfile from "./components/Profile/MyProfile.vue";
import ModifyProfile from "./components/Profile/ModifyProfile.vue";
import DeleteProfile from "./components/Profile/DeleteProfile.vue";

import NewMessage from "./components/Message/NewMessage.vue";
import ModifyMessage from "./components/Message/ModifyMessage.vue";
import OneMessage from "./components/Message/OneMessage.vue";

import DeleteComment from "./components/Comment/DeleteComment.vue";

export default [
  { path: "/", component: Login },
  { path: "/Signup", component: Signup },

  { path: "/Home", component: Home },

  { path: "/Home/AdminHome", component: AdminHome },
  { path: "/Home/AdminHome/AllUsers", component: AdminAllUsers },
  { path: "/Home/AdminHome/OneUser/:id", component: AdminOneUser },

  { path: "/Home/MyProfile", component: MyProfile },
  { path: "/Home/ModifyProfile", component: ModifyProfile },
  { path: "/Home/DeleteProfile", component: DeleteProfile },

  { path: "/Home/NewMessage", component: NewMessage },
  { path: "/Home/ModifyMessage/:messageId", component: ModifyMessage },
  { path: "/Home/OneMessage/:messageId", component: OneMessage },

  {
    path: "/Home/OneMessage/:messageId/DeleteComment/:commentId",
    component: DeleteComment,
  },
];
