<!-- here : html injected in App.vue page -->
<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="primary" fixed="top">
        <b-navbar-brand>
          <router-link to="/Home"
            ><img
              alt="logo Groupomania"
              width="60"
              src="../../assets/gp.png"
            />GROUPOMANIA</router-link
          ></b-navbar-brand
        >
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              ><router-link to="/Home" exact
                >Tous les messages</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home/MyProfile"
                >Mes renseignements</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home/ModifyProfile"
                >Modifier mes renseignements</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home/DeleteProfile"
                >Supprimer mon compte</router-link
              ></b-nav-item
            >
            <b-nav-item v-on:click="deconnexion" class="deconnexion"
              >Se déconnecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Mes renseignements</h1>
      </b-jumbotron>
    </div>
    <section id="coordonnées" class="col-md-6 mx-auto ">
      <h2>Mes coordonnées</h2>
      <p>Email : {{ data.email }}</p>
      <p>Pseudo : {{ data.username }}</p>
      <p>Prénom : {{ data.firstname }}</p>
      <p>Nom : {{ data.lastname }}</p>
      <hr class="col-8" />
    </section>
    <div id="image">
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </div>
  </div>
</template>
<script>
//here monted in first vue
import axios from "axios";
const REGEX_NUMBER = /^\d+$/;
export default {
  name: "MyProfile",
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    let self = this;
    let sessionToken = JSON.parse(localStorage.getItem("session"));
    let userId = JSON.parse(localStorage.getItem("userId"));

    if (userId === undefined || userId === null) {
      return this.$router.push("/");
    }
    if (!REGEX_NUMBER.test(userId)) {
      return this.$swal("invalid", "", "error");
    }
    axios
      .get(`http://localhost:3000/api/users/me/${userId}`, {
        headers: {
          Authorization: `Barer ${sessionToken}`,
        },
      })
      .then(function(response) {
        self.data = response.data;
      })
      .catch(function(erreur) {
        console.log(erreur);
      });
  },
  //here on event actions
  methods: {
    deconnexion: function() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>
<!--here scss style -->
<style scoped lang="scss">
div {
  padding: 0;
}
</style>
