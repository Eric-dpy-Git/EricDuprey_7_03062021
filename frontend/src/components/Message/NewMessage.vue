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
              ><router-link to="/Home"
                >Tous les messages</router-link
              ></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home/MyProfile"
                >Mes renseignements</router-link
              ></b-nav-item
            >
            <b-nav-item @click="deconnexion" class="deconnexion"
              >Se déconecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Publier un message</h1>
      </b-jumbotron>
    </div>

    <b-form @submit="onSubmit" class="col-md-8 mx-auto form">
      <b-form-group label="Votre titre :" label-for="title" class="paddingForm">
        <b-form-input
          v-model="form.title"
          id="title"
          type="text"
          required
          placeholder="Mon titre"
        ></b-form-input>
      </b-form-group>

      <b-form-group label-for="attachment" class="paddingForm">
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
          rows="3"
          max-rows="6"
        ></b-form-textarea>
      </b-form-group>

      <hr class="col-8" />

      <b-button type="submit" variant="primary" class="col button"
        >Valider</b-button
      >
    </b-form>
    <div id="image">
      <img src="../../assets/gpm.png" width="300" alt="logo Groupomania" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

const REGEX_TITLE = /^[a-zÀ-ÿ\d\-.'!:;)(+?\s]{2,30}$/i;
const REGEX_CONTENT = /^[a-zÀ-ÿ\d\-.':)(+;,!?\s]{0,250}$/i;
const REGEX_NUMBER = /^\d+$/;
const REGEX_IMG = /\.(gif|jpeg|png|jpg)$/i;

export default {
  name: "NewMessage",
  data() {
    return {
      form: {
        userId: null,
        title: "",
        attachment: "",
        image: "undefined",
        content: "",
        likes: 0,
        dislikes: 0,
        sessionToken: null,
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
    onImageChange(e) {
      console.log(e.target.files[0]);
      this.form.image = e.target.files[0];
    },
    onSubmit(evt) {
      console.log(this.form.userId);
      const self = this;
      evt.preventDefault();

      if (!REGEX_TITLE.test(this.form.title)) {
        return this.$swal("invalid", "", "error");
      }

      if (!REGEX_CONTENT.test(this.form.content)) {
        return this.$swal("invalid", "", "error");
      }

      if (
        !REGEX_NUMBER.test(this.form.dislikes) ||
        !REGEX_NUMBER.test(this.form.likes)
      ) {
        return this.$swal("invalid", "", "error");
      }
      if (this.form.image == "undefined" && this.form.content == "") {
        return this.$swal("invalid", "", "error");
      }
      if (this.form.image != "undefined") {
        if (!REGEX_IMG.test(this.form.image.name)) {
          console.log(this.form.image);
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
        .post("http://localhost:3000/api/messages/new/", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${this.form.sessionToken}`,
          },
        })
        .then(function(reponse) {
          console.log(reponse);
          self.form.image = "undefined";
          self.$swal("Message publié", " ", "success");
          self.$router.push("/Home");
        })
        .catch(function(response) {
          console.log(response);
          window.location.reload();
        });
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
  font-weight: bold;
  text-align: left;
  font-size: 2rem;
  margin-top: 10rem;
}

.button {
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: bold;
}

#left {
  text-align: left;
}

nav {
  max-width: 100vw;
}

#textarea {
  font-size: 2rem;
}
</style>
