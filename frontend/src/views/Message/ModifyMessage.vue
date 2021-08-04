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
            <b-nav-item @click="deconnexion" class="deconnexion"
              >se déconnecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Modifier mon message</h1>
      </b-jumbotron>
    </div>

    <section>
      <h2>Modifier</h2>

      <b-form @submit="onSubmit" class="col-md-8 mx-auto form">
        <b-form-group
          label="Votre nouveau titre :"
          label-for="title"
          class="paddingForm"
        >
          <b-form-input
            v-model="form.title"
            id="title"
            type="text"
            required
            placeholder="Mon titre"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-for="attachment" class="paddingForm groupImage">
          <p id="left">Votre Image :</p>
          <b-form-file
            id="attachment"
            placeholder="Insérez une image"
            accept=" image/png, image/jpg, image/jpeg, image/gif"
            v-on:change="onImageChange"
          ></b-form-file>
        </b-form-group>

        <b-form-group
          label="Votre texte :"
          label-for="textarea"
          class="paddingForm"
        >
          <b-form-textarea
            v-model="form.content"
            id="textarea"
            type="text"
            placeholder="Votre texte"
            rows="6"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>

        <hr class="col-8" />
        <b-button type="submit" variant="primary" class="col  button"
          >Valider</b-button
        >
      </b-form>
    </section>
    <div id="image">
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

const REGEX_TITLE = /^[a-zÀ-ÿ\d\-.'!()+;?\s]{2,30}$/i;
const REGEX_CONTENT = /^[a-zÀ-ÿ\d\-.'()+:;,!?\s]{0,250}$/i;
const REGEX_NUMBER = /^\d+$/;
const REGEX_IMG = /\.(gif|jpeg|png|jpg)$/i;

export default {
  name: "ModifyMessage",
  data() {
    return {
      form: {
        messageId: this.$route.params.messageId,
        userId: null,
        sessionToken: null,
        image: "undefined",
        title: "",
        attachment: "",
        content: "",
        likes: 0,
        dislikes: 0,
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

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;
      if (!REGEX_TITLE.test(this.form.title)) {
        return this.$swal("invalid", "", "error");
      }
      if (!REGEX_CONTENT.test(this.form.content)) {
        return this.$swal("invalid", "", "error");
      }
      if (
        !REGEX_NUMBER.test(this.form.userId) ||
        !REGEX_NUMBER.test(this.form.dislikes) ||
        !REGEX_NUMBER.test(this.form.likes) ||
        !REGEX_NUMBER.test(this.form.messageId)
      ) {
        return this.$swal("invalid", "", "error");
      }
      if (this.form.image != "undefined") {
        if (!REGEX_IMG.test(this.form.image.name)) {
          return this.$swal("invalid", "", "error");
        }
      }

      const fd = new FormData();
      fd.append("userId", this.form.userId);
      fd.append("title", this.form.title);
      fd.append("image", this.form.image);
      fd.append("content", this.form.content);
      fd.append("likes", this.form.likes);
      fd.append("dislikes", this.form.dislikes);
      axios
        .put(
          `http://localhost:3000/api/messages/modify/${this.form.messageId}`,
          fd,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.form.sessionToken}`,
            },
          }
        )
        .then(function(reponse) {
          console.log(reponse);
          self.$swal("Message modifié ", " ", "success");
          self.$router.push("/Home");
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },

    onImageChange(e) {
      console.log(e.target.files[0]);
      this.form.image = e.target.files[0];
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

.form {
  text-align: left;
  font-weight: bold;
  font-size: 1.5rem;
}

.button {
  font-weight: bold;
  font-size: 2rem;
}

#left {
  text-align: left;
}

.paddingForm {
  padding: 0.5rem;
}

nav {
  max-width: 100vw;
}

#textarea {
  font-size: 2rem;
}
</style>
