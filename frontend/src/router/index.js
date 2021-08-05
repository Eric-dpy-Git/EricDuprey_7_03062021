import Login from "../views/Auth/Login.vue";
import Signup from "../views/Auth/Signup.vue";
import Home from "../views/Home/Home.vue";
import AdminHome from "../views/Admin/AdminHome.vue";
import AdminAllUsers from "../views/Admin/AdminAllUsers.vue";
import AdminOneUser from "../views/Admin/AdminOneUser.vue";
import MyProfile from "../views//Profile/MyProfile.vue";
import ModifyProfile from "../views//Profile/ModifyProfile.vue";
import DeleteProfile from "../views//Profile/DeleteProfile.vue";
import NewMessage from "../views//Message/NewMessage.vue";
import ModifyMessage from "../views//Message/ModifyMessage.vue";
import OneMessage from "../views/Message/OneMessage.vue";
import DeleteComment from "../views//Comment/DeleteComment.vue";

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
