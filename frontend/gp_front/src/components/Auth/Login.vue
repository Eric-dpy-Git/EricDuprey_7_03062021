<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="primary" fixed="top">
        <b-navbar-brand>
          <img
            alt="Groupomania logo"
            width="50"
            src="../../assets/logo_w_gp.png"
          />Groupomania</b-navbar-brand
        >
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              ><router-link to="/Signup">Inscription</router-link></b-nav-item
            >
            <b-nav-item
              ><router-link to="/" exact>Connexion</router-link></b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Connexion</h1>
      </b-jumbotron>
    </div>

    <section>
      <h2>Mon compte</h2>
    </section>

    <b-form @submit="onSubmit" class="col-md-8 mx-auto left">
      <b-form-group id="email" label="Votre mail :" label-for="email">
        <b-form-input
          v-model="form.email"
          id="email"
          type="email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Mot de passe"
        label-for="password"
      >
        <b-form-input
          type="password"
          id="password"
          aria-describedby="password-help-block"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="col button"
        >Valider</b-button
      >
    </b-form>

    <section>
      <img
        src="../../assets/icon-left-font-monochrome-black.png"
        width="270"
        alt="rappel du logo de Groupomania"
      />
    </section>
  </div>
</template>

<script>
import axios from "axios";
/* from --> https://emailregex.com */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* Minimum eight characters, at least one letter and one number */
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;
      if (
        !PASSWORD_REGEX.test(this.form.password) ||
        !EMAIL_REGEX.test(this.form.email)
      ) {
        return this.$swal.fire(
          "Mauvaise entrée, verifiez : ",
          "votre email ou le mot de passe",
          "error"
        );
      }
      axios
        .post("http://localhost:3000/api/users/login/", {
          email: this.form.email,
          password: this.form.password,
        })
        .then(function(response) {
          /* console.log(response); */

          localStorage.setItem("session", JSON.stringify(response.data.token));
          localStorage.setItem("userId", JSON.stringify(response.data.userId));
          localStorage.setItem(
            "isAdmin",
            JSON.stringify(response.data.isAdmin)
          );

          let userId = JSON.parse(localStorage.getItem("userId"));

          if (userId != null) {
            setTimeout(() => {
              self.$router.push("/Home");
              self.$swal("Vous êtes connecté :) ", " ", "success");
            }, 1000);
          }
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  padding: 0;
  margin: 0;
}
.left {
  text-align: left;
  font-weight: bold;
  margin-top: 5rem;
  font-size: 2rem;
}
.button {
  font-size: 2rem;
  margin: 2rem auto;
  font-weight: bold;
}
#color {
  color: black;
  &:hover {
    color: red;
    font-weight: bold;
  }
}
</style>
