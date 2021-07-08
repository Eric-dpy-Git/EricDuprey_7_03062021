<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="primary" fixed="top">
        <b-navbar-brand>
          <router-link to="/Home"
            ><img
              alt="Groupomania logo"
              width="50"
              src="../../assets/logo_w_gp.png"
            />Groupomania</router-link
          ></b-navbar-brand
        >
        <b-navbar-toggle target="navbar-toggle-collapse"></b-navbar-toggle>
        <b-collapse id="navbar-toggle-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              ><router-link to="/Home">Accueil</router-link></b-nav-item
            >
            <b-nav-item
              ><router-link to="/Home/MyProfile"
                >Mon Profil</router-link
              ></b-nav-item
            >
            <b-nav-item @click="deconnexion" class="deconnexion"
              >Déconnexion</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1>Créer un nouveau Message</h1>
      </b-jumbotron>
    </div>

    <b-form @submit="onSubmit" class="col-md-8 mx-auto form">
      <b-form-group
        label="Choisissez votre titre:"
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

      <b-form-group label-for="attachment" class="paddingForm">
        <p id="left">Sélectinnez une image :</p>
        <b-form-file
          id="attachment"
          placeholder="Nom de fichier"
          accept=" image/png, image/jpg, image/jpeg, image/gif"
          v-on:change="onImageChange"
        ></b-form-file>
      </b-form-group>

      <b-form-group
        label="Écrivez votre texte:"
        label-for="textarea"
        class="paddingForm"
      >
        <b-form-textarea
          v-model="form.content"
          id="textarea"
          type="text"
          placeholder="250 carctères max..."
          rows="8"
          max-rows="8"
        ></b-form-textarea>
      </b-form-group>

      <hr class="col-8" />

      <b-button type="submit" variant="success" class="col button"
        >Valider</b-button
      >
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

const TITLE_REGEX = /^[a-zÀ-ÿ\d\-.'!:;)(+?\s]{2,30}$/i;
const CONTENT_REGEX = /^[a-zÀ-ÿ\d\-.':)(+;,!?\s]{0,250}$/i;
const NUMBER_REGEX = /^\d+$/;
const IMG_REGEX = /\.(gif|jpeg|png|jpg)$/i;

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

      if (!TITLE_REGEX.test(this.form.title)) {
        return this.$swal(
          "Le titre doit faire entre 2 et 30 caractères !  ",
          "",
          "error"
        );
      }

      if (!CONTENT_REGEX.test(this.form.content)) {
        return this.$swal(
          "Le contenu ne peut pas contenir plus de 250 caractères !  ",
          "",
          "error"
        );
      }

      if (
        !NUMBER_REGEX.test(this.form.dislikes) ||
        !NUMBER_REGEX.test(this.form.likes)
      ) {
        return this.$swal(
          "Cette requête ne peut contenir que des chiffres !  ",
          "",
          "error"
        );
      }

      if (this.form.image == "undefined" && this.form.content == "") {
        return this.$swal(
          "Un titre et/ou une image est indispensable ",
          "",
          "error"
        );
      }

      if (this.form.image != "undefined") {
        if (!IMG_REGEX.test(this.form.image.name)) {
          console.log(this.form.image);
          return this.$swal(
            "Une image gif/jpg/jpeg/png est requise !  ",
            "",
            "error"
          );
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
          self.$swal("Message ajouté :) ", " ", "success");
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
