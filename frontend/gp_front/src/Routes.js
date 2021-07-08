import Login from "./components/Auth/Login.vue";
import Signup from "./components/Auth/Signup.vue";

import Home from "./components/Home/Home.vue";

import MyProfile from "./components/Profile/MyProfile.vue";
import ModifyProfile from "./components/Profile/ModifyProfile.vue";

import NewMessage from "./components/Message/NewMessage.vue";

export default [
  { path: "/", component: Login },
  { path: "/Signup", component: Signup },

  { path: "/Home", component: Home },

  { path: "/Home/MyProfile", component: MyProfile },
  { path: "/Home/ModifyProfile", component: ModifyProfile },

  { path: "/Home/NewMessage", component: NewMessage },
];
