<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="primary" fixed="top">
        <b-navbar-brand>
          <img
            alt="logo Groupomania"
            width="60"
            src="../../assets/gp.png"
          />GROUPOMANIA</b-navbar-brand
        >
        <b-navbar-toggle target="navbar-toggle-collapse"> </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              ><router-link to="/Signup">S'inscrire</router-link></b-nav-item
            >
            <b-nav-item
              ><router-link to="/" exact>Se connecter</router-link></b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Formulaire d'inscription</h1>
      </b-jumbotron>
    </div>

    <section>
      <h2>Bienvenue chez Groupomania</h2>
    </section>
    <b-form @submit="onSubmit" class="col-md-8 mx-auto left">
      <b-form-group id="Email" label="Votre email :" label-for="email">
        <b-form-input
          v-model="form.email"
          id="email"
          type="email"
          required
          placeholder="Inserez votre email professionnel"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="Username"
        label="Definissez un pseudo :"
        label-for="username"
      >
        <b-form-input
          v-model="form.username"
          id="username"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Firstname" label="Votre prénom :" label-for="firstname">
        <b-form-input
          v-model="form.firstname"
          id="firstname"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Lastname" label="Votre nom : " label-for="lastname">
        <b-form-input
          v-model="form.lastname"
          id="lastname"
          type="text"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="Password"
        label="Definissez un mot de passe :"
        label-for="password"
      >
        <b-form-input
          type="password"
          id="password"
          aria-describedby="password-help-block"
          placeholder="8 Caract. min. - 2 Chiffres - 1 Maj"
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="col button"
        >Valider</b-button
      >
    </b-form>

    <section>
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
  name: "Signup",
  data() {
    return {
      form: {
        email: "",
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        isAdmin: false,
      },
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (
        !REGEX_NAME.test(this.form.username) ||
        !REGEX_NAME.test(this.form.firstname) ||
        !REGEX_NAME.test(this.form.lastname)
      ) {
        return this.$swal(
          "un ou plusieurs champs suivant ne sont pas rempli correctement : ",
          "nom, prenom, pseudo",
          "error"
        );
      }
      if (
        !REGEX_PASSWORD.test(this.form.password) ||
        !REGEX_EMAIL.test(this.form.email)
      ) {
        return this.$swal(
          "un ou plusieurs champs suivant ne sont pas rempli correctement : ",
          "email, password",
          "error"
        );
      }
      const self = this;
      axios
        .post("http://localhost:3000/api/users/signup/", {
          email: this.form.email,
          username: this.form.username,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          password: this.form.password,
          isAdmin: this.form.isAdmin,
        })
        .then(function(response) {
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
              self.$swal("Compte créé", "", "success");
            }, 500);
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
}

.left {
  text-align: left;
  font-weight: bold;
  margin-top: 5rem;
  font-size: 2rem;
}

.container-fluid {
  margin-bottom: 8rem;
}

.button {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
}

input {
  height: 4rem;
  font-size: 2rem;
}
</style>
