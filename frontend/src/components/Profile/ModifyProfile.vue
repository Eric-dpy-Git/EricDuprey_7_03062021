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
        <h1>Modifier mes renseignements</h1>
      </b-jumbotron>
    </div>

    <section id="modify" class="col-md-8 mx-auto my-5">
      <h2>Mon compte</h2>

      <b-form @submit="onSubmit" class=" mx-auto left">
        <b-form-group id="Email" label="Mon nouveau email :" label-for="email">
          <b-form-input
            v-model="form.email"
            id="email"
            type="email"
            required
            placeholder="Email professionnel"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="Username" label="Pseudo :" label-for="username">
          <b-form-input
            v-model="form.username"
            id="username"
            type="text"
            required
            placeholder="Nouveau pseudo"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="Firstname" label="Nom :" label-for="firstname">
          <b-form-input
            v-model="form.firstname"
            id="firstname"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="Lastname" label="Prénom :" label-for="lastname">
          <b-form-input
            v-model="form.lastname"
            id="lastname"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="Password" label="Mot de passe" label-for="password">
          <b-form-input
            type="password"
            id="password"
            aria-describedby="password-help-block"
            v-model="form.password"
            placeholder="Nouveau ou actuel"
            required
          ></b-form-input>
        </b-form-group>

        <b-button id="button" type="submit" variant="primary" class="col"
          >Modifier</b-button
        >
      </b-form>

      <hr class="col-8" />
    </section>
    <section id="image">
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
const REGEX_NAME = /^[a-zÀ-ÿ\d\-.'\s]{2,30}$/i;
const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
export default {
  name: "ModifyProfile",
  data() {
    return {
      form: {
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        userId: null,
        isAdmin: false,
        sessionToken: null,
      },
    };
  },
  mounted() {
    this.form.sessionToken = JSON.parse(localStorage.getItem("session"));
    this.form.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    this.form.userId = JSON.parse(localStorage.getItem("userId"));
    if (this.form.userId === undefined || this.form.userId === null) {
      this.$router.push("/");
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;
      if (
        !REGEX_NAME.test(this.form.username) ||
        !REGEX_NAME.test(this.form.firstname) ||
        !REGEX_NAME.test(this.form.lastname)
      ) {
        return this.$swal("invalid", "", "error");
      }
      if (
        !REGEX_PASSWORD.test(this.form.password) ||
        !REGEX_EMAIL.test(this.form.email)
      ) {
        return this.$swal("invalid", "", "error");
      }
      if (
        this.form.isAdmin == 0 ||
        this.form.isAdmin == 1 ||
        this.form.isAdmin === true ||
        this.form.isAdmin === false
      ) {
        axios
          .put(
            "http://localhost:3000/api/users/me/",
            {
              id: this.form.userId,
              email: this.form.email,
              username: this.form.username,
              firstname: this.form.firstname,
              lastname: this.form.lastname,
              password: this.form.password,
              isAdmin: this.form.isAdmin,
            },
            {
              headers: {
                Authorization: `Barer ${this.form.sessionToken}`,
              },
            }
          )
          .then(function(response) {
            console.log(response);
            self.$swal("Compte modifié", " ", "success");
            self.$router.push("/Home");
          })
          .catch(function(erreur) {
            console.log(erreur);
          });
      } else {
        return this.$swal("invalid", "", "error");
      }
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
  text-align: left;
}
.left {
  text-align: left;
  font-size: 1.5rem;
}

#button {
  font-weight: bold;
  font-size: 1.5rem;
}
#password-help-block {
  font-size: 1.5rem;
  font-weight: bold;
}
#Password,
#Lastname,
#Firstname,
#Username,
#Email {
  font-weight: bold;
}
</style>
