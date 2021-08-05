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
        <b-navbar-toggle target="navbar-toggle-collapse"> </b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              ><router-link to="/Home/AdminHome" v-if="isAdmin === true"
                >Accès régulateur</router-link
              ></b-nav-item
            >
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
            <b-nav-item v-on:click="deconnexion" class="deconnexion"
              >Se déconnecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Bonjour {{ data.username }}</h1>
      </b-jumbotron>
      <div>
        <p>Mon test Vuex {{ testVuex }}</p>
        <p>{{ currentValue }}</p>
        <b-button variant="success" v-on:click="increment" class="mx-1 my-1">
          <b-icon icon="hand-thumbs-up"></b-icon>
          <span id="green"> <!-- {{ messageUnique.likes }}  --></span>
        </b-button>
        <b-button variant="warning" v-on:click="decrement" class="mx-1 my-1">
          <b-icon icon="hand-thumbs-down"></b-icon>
          <span id="red"> <!-- {{ messageUnique.dislikes }} --> </span>
        </b-button>

        <!-- <button v-on:click="increment">+</button>
        <button v-on:click="decrement">-</button> -->
      </div>
    </div>
    <div
      :key="index"
      v-for="(message, index) in messages"
      class="col-10 col-md-6 col-xl-5 mx-auto cardMarginBottom"
    >
      <router-link :to="`/Home/OneMessage/${message.id}`">
        <b-card
          :img-src="message.attachment"
          :img-alt="message.title"
          img-top
          :header="message.User.username"
          tag="article"
          bg-variant="light"
          text-variant="dark"
          class="text-center mb-2 col-12 mx-auto h2 "
        >
          <b-card-text>
            <h2 id="title2">{{ message.title }}</h2>
            {{ message.content }}
          </b-card-text>
          <span>{{ message.createdAt | moment("from", "now") }}</span>
        </b-card>
      </router-link>
    </div>
    <div id="image">
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </div>
  </div>
</template>
<script>
//here monted in first vue
import axios from "axios";
//---------------------------------store
/* import store from "../../store/index";
console.log(store); */
export default {
  name: "Home",
  data() {
    return {
      //add currentValue
      currentValue: 0,
      data: [],
      messages: [],
      isAdmin: false,
      userId: null,
      sessionToken: null,
    };
  },
  mounted() {
    let self = this;
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.sessionToken = JSON.parse(localStorage.getItem("session"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

    if (this.userId === undefined || this.userId === null) {
      return self.$router.push("/");
    }
    setTimeout(() => {
      axios
        .get(`http://localhost:3000/api/users/me/${this.userId}`, {
          headers: {
            Authorization: `Barer ${this.sessionToken}`,
          },
        })
        .then(function(response) {
          self.data = response.data;
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
      axios
        .get(`http://localhost:3000/api/messages/`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Barer ${this.sessionToken}`,
          },
        })
        .then(function(response) {
          self.messages = response.data;
          console.log(response.data);
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    }, 500);
  },

  //work on store ------------------------------------
  /* computed: {
    displayTest() {
      return this.store.state.testVuex;
    },
  }, */
  //-------------------------------------------------
  //here on event action
  methods: {
    deconnexion: function() {
      localStorage.clear();
      this.$router.push("/");
    },
    increment() {
      this.currentValue = this.currentValue = +1;
    },
    decrement() {
      this.currentValue = this.currentValue = -1;
    },
  },
  //work on store ------------------------------------
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

#title2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.cardMarginBottom {
  margin-bottom: 8rem;
}
</style>
