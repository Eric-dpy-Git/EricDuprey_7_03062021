<!-- here : html injected in App.vue page -->
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
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
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
        <h1>Se connecter</h1>
      </b-jumbotron>
    </div>
    <section>
      <h2>Inserez votre mail et votre mot de passe</h2>
    </section>
    <b-form @submit="onSubmit" class="col-md-8 mx-auto left">
      <b-form-group id="email" label="Votre email:" label-for="email">
        <b-form-input
          v-model="form.email"
          id="email"
          type="email"
          required
          placeholder="Mail utilisé pour l'inscription"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Votre mot de passe :"
        label-for="password"
      >
        <b-form-input
          type="password"
          id="password"
          aria-describedby="password-help-block"
          placeholder=""
          v-model="form.password"
          required
        ></b-form-input>
      </b-form-group>
      <hr class="col-8" />
      <b-button type="submit" variant="primary" class="col button"
        >Valider</b-button
      >
    </b-form>
    <section>
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </section>
    <div>
      <img src="../../assets/pict.png" width="310" alt="Photo de Groupomania" />
    </div>
  </div>
</template>
<script>
//here monted in first vue
import axios from "axios";
const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGEX_PASSWORD = /^(?=.*[A-Z])(?=.*[a-z])(?=.{2,}\d)([-+!*$@%_\w]{8,100})$/;
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
  //here on event actions
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;
      if (
        !REGEX_PASSWORD.test(this.form.password) ||
        !REGEX_EMAIL.test(this.form.email)
      ) {
        return this.$swal("Email ou mot de passe invalide", "error");
      }
      axios
        .post("http://localhost:3000/api/users/login/", {
          email: this.form.email,
          password: this.form.password,
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
              self.$swal("Connexion établie", " ", "success");
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
<!--here scss style -->
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
