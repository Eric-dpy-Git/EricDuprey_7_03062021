<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="dark" fixed="top">
        <b-navbar-brand>
          <img
            alt="Groupomania logo"
            width="50"
            src="../../assets/icon.png"
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
      <h2>Bienvenue</h2>
    </section>

    <b-form @submit="onSubmit" class="col-md-8 mx-auto left">
      <b-form-group id="Email" label="Email:" label-for="email">
        <b-form-input
          v-model="form.email"
          id="email"
          type="email"
          required
          placeholder="your-mail@example.com"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Username" label="Pseudo :" label-for="username">
        <b-form-input
          v-model="form.username"
          id="username"
          type="text"
          required
          placeholder=""
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

      <b-form-group id="Lastname" label="Prénom:" label-for="lastname">
        <b-form-input
          v-model="form.lastname"
          id="lastname"
          type="text"
          required
          placeholder=""
        ></b-form-input>
      </b-form-group>

      <b-form-group id="Password" label="Password" label-for="password">
        <b-form-input
          type="password"
          id="password"
          aria-describedby="password-help-block"
          placeholder=""
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
          console.log(response);
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
