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
        <b-navbar-toggle target="navbar-toggle-collapse"> </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              ><router-link to="/Home" exact>Accueil</router-link></b-nav-item
            >
            <b-nav-item v-on:click="deconnexion" class="deconnexion"
              >Se déconnecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-jumbotron>
        <h1>Accès régulateur</h1>
      </b-jumbotron>
      <h2>Utilisateurs :</h2>
    </div>

    <div
      :key="index"
      v-for="(user, index) in users"
      class="col-10 col-md-8 mx-auto my-5 h3"
    >
      <b-card
        :header="user.username"
        tag="article"
        bg-variant="light"
        text-variant="dark"
        class="text-center mb-2  mx-auto"
      >
        <b-card-text>
          <p>Nom: {{ user.firstname }}</p>
          <p>Prénom {{ user.lastname }}</p>
        </b-card-text>
      </b-card>

      <router-link :to="`/Home/AdminHome/OneUser/${user.id}`">
        <b-button
          type="submit"
          variant="danger"
          class="  my-2 button"
          v-if="userId != user.id"
          >Supprimer</b-button
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      users: [],
      userId: null,
      sessionToken: null,
    };
  },
  mounted() {
    let self = this;
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.sessionToken = JSON.parse(localStorage.getItem("session"));
    if (this.userId === undefined || this.userId === null) {
      this.$router.push("/");
    }
    axios
      .get(`http://localhost:3000/api/admin/allUsers`, {
        headers: {
          Authorization: `Barer ${this.sessionToken}`,
        },
      })
      .then(function(response) {
        self.users = response.data.users;
        console.log(response.data);
      })
      .catch(function(erreur) {
        console.log(erreur);
      });
  },
  methods: {
    deconnexion: function() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-height: 50vh;
}
.button {
  font-weight: bold;
  font-size: 2rem;
}
div {
  padding: 0;
}
.container-fluid {
  margin-bottom: 8rem;
}
</style>
