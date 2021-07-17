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
            <b-nav-item v-on:click="deconnexion" class="deconnexion"
              >Se déconnecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-jumbotron>
        <h1>Compte régulateur</h1>
      </b-jumbotron>
    </div>
    <section id="delete">
      <h2>Supprimer le compte</h2>

      <b-button
        @click="onDelete"
        type="submit"
        variant="danger"
        class="col-6 mx-2 my-2 button"
        >Supprimer</b-button
      >
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
  name: "ModifyProfile",
  data() {
    return {
      form: {
        isAdmin: "",
        userId: null,
        sessionToken: null,
        id: this.$route.params.id,
      },
    };
  },
  mounted() {
    this.form.sessionToken = JSON.parse(localStorage.getItem("session"));
    this.form.userId = JSON.parse(localStorage.getItem("userId"));
    if (this.form.userId === undefined || this.form.userId === null) {
      this.$router.push("/");
    }
  },
  //here on event actions
  methods: {
    onDelete(evt) {
      evt.preventDefault();
      const self = this;
      if (
        !REGEX_NUMBER.test(this.form.id) ||
        !REGEX_NUMBER.test(this.form.userId)
      ) {
        return this.$swal("invalid", "", "error");
      }
      axios
        .delete(`http://localhost:3000/api/admin/deleteUser/${this.form.id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Barer ${this.form.sessionToken}`,
          },
        })
        .then(function(response) {
          console.log(response);
          self.$swal("Compte supprimé", " ", "success");
          self.$router.push("/Home/AdminHome");
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;
      if (this.form.isAdmin == 0 || this.form.isAdmin == 1) {
        axios
          .put(
            `http://localhost:3000/api/admin/updateUser/${this.form.id}`,
            {
              userId: this.form.userId,
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
            self.$router.push("/Home/AdminHome");
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
<!--here scss style -->
<style scoped lang="scss">
div {
  padding: 0;
}

p {
  text-align: left;
}
.button {
  font-weight: bold;
  font-size: 2rem;
}
.left {
  text-align: left;
  font-weight: bold;
}
#delete {
  margin-bottom: 8rem;
}
</style>
