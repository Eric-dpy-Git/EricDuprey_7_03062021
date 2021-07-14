<template>
  <div class="container-fluid">
    <div>
      <b-navbar toggleable type="dark" variant="primary" fixed="top">
        <b-navbar-brand>
          <router-link to="/Home"
            ><img
              alt="logo Groupomania"
              width="50"
              src="../../assets/gp.png"
            />GROUPOMANIA</router-link
          ></b-navbar-brand
        >
        <b-navbar-toggle target="navbar-toggle-collapse"> </b-navbar-toggle>
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
              >Se déconecter</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

      <b-jumbotron>
        <h1 id="title1">{{ messageUnique.title }}</h1>
      </b-jumbotron>
    </div>

    <section class="col-md-10 col-lg-6  mx-auto  cardMessage ">
      <b-card
        :img-src="messageUnique.attachment"
        :img-alt="messageUnique.title"
        img-top
        :header="'by ' + User.username"
        tag="article"
        style="width: 100%"
        bg-variant="light"
        text-variant="dark"
        class="h2 text-center mb-2 col-12 mx-auto "
      >
        <b-card-text>
          <h2 id="title2">{{ messageUnique.title }}</h2>
          <p>{{ messageUnique.content }}</p>
          <span id="dateMessage">{{
            messageUnique.createdAt | moment("from", "now")
          }}</span>
        </b-card-text>

        <div id="likesAndDislikes">
          <b-button variant="success" @click="onLike" class="mx-1 my-1">
            <b-icon icon="hand-thumbs-up"></b-icon>
            <span id="green"> {{ messageUnique.likes }} </span>
          </b-button>

          <b-button variant="warning" @click="onDislike" class="mx-1 my-1">
            <b-icon icon="hand-thumbs-down"></b-icon>
            <span id="red"> {{ messageUnique.dislikes }} </span>
          </b-button>
        </div>
      </b-card>

      <router-link :to="`/Home/ModifyMessage/${messageId}`">
        <b-button
          type="submit"
          variant="secondary"
          class="col-md-4 mx-2 my-2 button"
          v-if="userId == User.id || userId === 1"
          >Modifier</b-button
        >
      </router-link>

      <b-button
        @click="onSubmit"
        type="submit"
        variant="danger"
        class="col-md-4 mx-2 my-2 button"
        v-if="userId == User.id || userId === 1"
        >Supprimer</b-button
      >

      <b-button
        v-b-modal.modal-prevent-closing
        class="mx-2 col col-md-6 col-xl-5 button"
        variant="primary"
        >Publier un commentaire</b-button
      >

      <b-modal
        id="modal-prevent-closing"
        centered
        ref="modal"
        button
        title="Formulaire commentaire"
        button-size="lg"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit" id="modal">
          <b-form-group
            :state="commentState"
            label="Ecrivez votre commentaire :"
            label-for="comment"
            invalid-feedback="invalid"
          >
            <b-form-textarea
              v-model="submit.comment"
              id="comment"
              type="text"
              required
              :state="commentState"
              placeholder="Comentaire..."
              rows="6"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
        </form>
      </b-modal>
    </section>

    <section>
      <div
        :key="index"
        v-for="(comment, index) in Comments"
        class="col-10  mx-auto comment"
      >
        <b-card
          :header="comment.User.username"
          bg-variant="light"
          text-variant="dark"
          class="text-center mb-2  mx-auto h3 "
        >
          <b-card-text>
            <p>{{ comment.content }}</p>
          </b-card-text>
          <span id="dateComment" class="py-1 px-1">{{
            comment.createdAt | moment("from", "now")
          }}</span>
          <router-link
            :to="`/Home/OneMessage/${messageId}/DeleteComment/${comment.id}`"
            v-if="userId == comment.User.id || userId === 1"
          >
            <b-button variant="danger" class="float-right ">X</b-button>
          </router-link>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

const REGEX_CONTENT = /^[a-zÀ-ÿ\d\-.':)(+;,!?\s]{0,250}$/i;
const REGEX_NUMBER = /^\d+$/;
export default {
  name: "OneMessage",
  data() {
    return {
      messageId: this.$route.params.messageId,
      isAdmin: false,
      userId: null,
      sessionToken: null,
      messageUnique: [],
      User: [],
      usernameComment: "",
      commentState: null,
      Comments: [],

      submit: {
        messageId: this.$route.params.messageId,
        comment: "",
        commentId: "",
      },
    };
  },
  mounted() {
    let self = this;
    this.userId = JSON.parse(localStorage.getItem("userId"));
    this.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    this.sessionToken = JSON.parse(localStorage.getItem("session"));
    this.sessionToken = JSON.parse(localStorage.getItem("session"));
    if (this.userId === undefined || this.userId === null) {
      this.$router.push("/");
    }
    if (!REGEX_NUMBER.test(this.messageId)) {
      this.$swal("invalid", "", "error");
      window.location.replace("/Home");
    }

    axios
      .get(`http://localhost:3000/api/messages/${this.messageId}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Barer ${this.sessionToken}`,
        },
      })
      .then(function(response) {
        self.messageUnique = response.data;
        self.User = response.data.User;
        self.Comments = response.data.Comments;
        self.likes = response.data.likes;
        console.log(response.data);
      })
      .catch(function(erreur) {
        console.log(erreur);
      });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const self = this;

      if (!REGEX_NUMBER.test(this.submit.messageId)) {
        return this.$swal("invalid", "", "error");
      }
      axios
        .delete(
          `http://localhost:3000/api/messages/delete/${this.submit.messageId}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Barer ${this.sessionToken}`,
            },
          }
        )
        .then(function(response) {
          console.log(response);
          self.$swal("Message supprimé :) ", " ", "success");
          self.$router.push("/Home");
        })
        .catch(function(erreur) {
          console.log(erreur);
          // window.location.reload();
        });
    },

    deconnexion: function() {
      localStorage.clear();
      this.$router.push("/");
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.commentState = valid;
      return valid;
    },

    resetModal() {
      (this.comment = ""), (this.commentState = null);
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();

      this.handleSubmit();
    },

    handleSubmit() {
      const self = this;
      if (!this.checkFormValidity()) {
        return;
      }
      if (
        !REGEX_CONTENT.test(this.submit.content) ||
        !REGEX_NUMBER.test(this.userId) ||
        !REGEX_NUMBER.test(this.submit.messageId)
      ) {
        return this.$swal("invalid", "", "error");
      }
      axios
        .post(
          `http://localhost:3000/api/messages/${this.submit.messageId}/newComment/`,
          { userId: this.userId, content: this.submit.comment },
          {
            headers: {
              Authorization: `Barer ${this.sessionToken}`,
            },
          }
        )
        .then(function(response) {
          console.log(response);
          self.$swal("Commentaire ajouté :) ", " ", "success").then(function() {
            location.reload();
          });
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },

    onLike() {
      if (
        !REGEX_NUMBER.test(this.userId) ||
        !REGEX_NUMBER.test(this.submit.messageId)
      ) {
        return this.$swal("invalid", "", "error");
      }
      axios
        .post(
          `http://localhost:3000/api/messages/${this.submit.messageId}/like`,
          { userId: this.userId },
          {
            headers: {
              Authorization: `Barer ${this.sessionToken}`,
            },
          }
        )
        .then(function(response) {
          console.log(response);
          location.reload();
        })
        .catch(function(erreur) {
          console.log(erreur);
        });
    },

    onDislike() {
      if (
        !REGEX_NUMBER.test(this.userId) ||
        !REGEX_NUMBER.test(this.submit.messageId)
      ) {
        return this.$swal("invalid", "", "error");
      }
      axios
        .post(
          `http://localhost:3000/api/messages/${this.submit.messageId}/dislike`,
          { userId: this.userId },
          {
            headers: {
              Authorization: `Barer ${this.sessionToken}`,
            },
          }
        )
        .then(function(response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function(response) {
          console.log(response);
        });
    },
  },
};
</script>

<style scoped lang="scss">
img {
  max-height: 50vh;
}

div {
  padding: 0;
}

.cardMessage {
  margin-top: 2rem;
  padding-bottom: 8rem;
}

.comment {
  margin: 0 auto 5em auto;
}

.container-fluid {
  margin-bottom: 10rem;
}

#likesAndDislikes {
  float: right;
}

#red {
  font-weight: bold;
  font-size: 2rem;
}

#green {
  font-weight: bold;
  font-size: 2rem;
}

#dateMessage {
  font-size: 1.2rem;
}

#dateComment {
  font-size: 1.2rem;
  float: left;
}

.button {
  font-weight: bold;
  font-size: 1.5rem;
}

#title2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#modal {
  font-size: 2rem;
  font-weight: bold;
  &button {
    font-size: 2rem;
  }
}

#comment {
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
