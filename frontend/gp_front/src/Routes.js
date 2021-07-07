import Login from "./components/Auth/Login.vue";
import Signup from "./components/Auth/Signup.vue";

export default [
  { path: "/", component: Login },
  { path: "/Signup", component: Signup },

  { path: "*", component: PageNotFound },
];
