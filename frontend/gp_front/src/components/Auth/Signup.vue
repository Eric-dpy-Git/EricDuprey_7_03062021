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
        <b-navbar-toggle target="navbar-toggle-collapse"> </b-navbar-toggle>
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
        <h1>Inscription</h1>
      </b-jumbotron>
    </div>

    <section>
      <h2>Le réseau Groupomanie</h2>
    </section>

    <b-form @submit="onSubmit" class="col-md-8 mx-auto left">
      <b-form-group id="Email" label="Email:" label-for="email">
        <b-form-input
          v-model="form.email"
          id="email"
          type="email"
          required
          placeholder="votre-mail@example.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Username" label="Pseudo :" label-for="username">
        <b-form-input
          v-model="form.username"
          id="username"
          type="text"
          required
          placeholder="Choisissez votre pseudo"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Firstname" label="Nom :" label-for="firstname">
        <b-form-input
          v-model="form.firstname"
          id="firstname"
          type="text"
          required
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Lastname" label="Prénom :" label-for="lastname">
        <b-form-input
          v-model="form.lastname"
          id="lastname"
          type="text"
          required
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Password" label="Mot de passe" label-for="password">
        <b-form-input
          type="password"
          id="password"
          aria-describedby="password-help-block"
          placeholder="1 Maj - 1 chiffre - 8 caract min. "
          v-model="form.password"
          required
        ></b-form-input>
        <b-form-text id="password-help-block"> </b-form-text>
      </b-form-group>

      <b-button type="submit" variant="primary" class="col button"
        >Valider</b-button
      >
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
/* from --> https://emailregex.com */
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* Minimum eight characters, at least one letter and one number */
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
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
              self.$swal(
                "Félicitations votre compte a été créé :) ",
                " ",
                "success"
              );
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
