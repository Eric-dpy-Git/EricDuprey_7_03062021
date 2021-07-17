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
              ><router-link to="/Home/NewMessage"
                >Publier un message</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home/MyProfile"
                >Mes renseignements</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home" exact
                >Tous les messages</router-link
              ></b-nav-item
            >
            <b-nav-item @click="deconnexion" class="deconnexion"
              >Se déconnecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-jumbotron>
        <h1>Supprimer mon commentaire</h1>
      </b-jumbotron>
    </div>
    <div class="col-10 col-md-7 mx-auto comment">
      <b-card
        :header="User.username"
        bg-variant="light"
        text-variant="dark"
        class="text-center mb-2 col-12 mx-auto  "
      >
        <b-card-text>
          {{ commentUnique.content }}
        </b-card-text>
        <b-button
          @click="deleteComment"
          variant="danger"
          class="float-right"
          v-if="userId == User.id || isAdmin === true"
          >X</b-button
        >
      </b-card>
    </div>
    <div id="image">
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </div>
  </div>
</template>
<script>
//here monted in first vue
import axios from "axios";
const regexNumber = /^\d+$/;
export default {
  name: "DeleteComment",
  data() {
    return {
      commentId: this.$route.params.commentId,
      isAdmin: false,
      userId: null,
      sessionToken: null,
      commentUnique: [],
      User: [],

      submit: {
        commentId: this.$route.params.commentId,
      },
    };
  },
  mounted() {
    let self = this;
    this.sessionToken = JSON.parse(localStorage.getItem("session"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    this.userId = JSON.parse(localStorage.getItem("userId"));
    if (this.userId === undefined || this.userId === null) {
      this.$router.push("/");
    }
    if (!regexNumber.test(this.commentId)) {
      this.$swal("invalid", "", "error");
      window.location.replace("/Home");
    }
    axios
      .get(`http://localhost:3000/api/messages/comment/${this.commentId}/`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Barer ${this.sessionToken}`,
        },
      })
      .then(function(response) {
        self.commentUnique = response.data;
        self.User = response.data.User;
        console.log(response.data);
      })
      .catch(function(erreur) {
        console.log(erreur);
        window.location.reload();
      });
  },
  //here on event actions
  methods: {
    deleteComment() {
      const self = this;
      if (!regexNumber.test(this.submit.commentId)) {
        this.$swal("invalid", "", "error");
        window.location.replace("/Home");
      }
      axios
        .delete(
          `http://localhost:3000/api/messages/comment/${this.submit.commentId}/`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Barer ${this.sessionToken}`,
            },
          }
        )
        .then(function(response) {
          console.log(response.data);
          self.$swal("Commentaire supprimé", " ", "success");
          self.$router.push("/Home");
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
<!--here scss style -->
<style scoped lang="scss">
img {
  max-height: 50vh;
}

div {
  padding: 0;
}

.cardMessage {
  margin-top: 2rem;
  padding-bottom: 6rem;
}

.comment {
  margin: 15rem auto 5em auto;
}
</style>
