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

            <!-- <b-nav-item
              ><router-link to="/Home/DeleteProfile"
                >Supprimer mes renseignements</router-link
              ></b-nav-item
            > -->
            <!-- <b-nav-item
              ><b-navbar-brand to="/Home/DeleteProfile"
                >Supprimer mon profil</router-link
              ></b-nav-item
            > -->
            <b-nav-item v-on:click="deconnexion" class="deconnexion"
              >Se déconecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Supprimer mon compte</h1>
      </b-jumbotron>
    </div>

    <section id="delete" class="col-md-6 mx-auto my-5 ">
      <h2>Supprimer mon compte</h2>
      <hr class="col-8" />
      <b-button
        @click="onSubmit"
        type="submit"
        variant="danger"
        class="col button"
        >Supprimer</b-button
      >
    </section>

    <section id="image">
      <img
        src="../../assets/gpm.png"
        width="300"
        alt="image d'une poubelle qui signifie la suppression "
      />
    </section>
  </div>
</template>

<script>
import axios from "axios";

const REGEX_NUMBER = /^\d+$/;

export default {
  name: "DeleteProfile",
  data() {
    return {
      userId: null,
      sessionToken: null,
    };
  },
  mounted() {
    this.sessionToken = JSON.parse(localStorage.getItem("session"));
    this.userId = JSON.parse(localStorage.getItem("userId"));
    if (this.userId === undefined || this.userId === null) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;
      if (!REGEX_NUMBER.test(this.userId)) {
        return this.$swal("invalid", "", "error");
      }
      axios
        .delete(`http://localhost:3000/api/users/me/${this.userId}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Barer ${this.sessionToken}`,
          },
        })
        .then(function(response) {
          console.log(response);
          localStorage.clear();
          self.$router.push("/");
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },

    deconnexion: function() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
div {
  padding: 0;
}

p {
  font-size: 1.5rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.button {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
