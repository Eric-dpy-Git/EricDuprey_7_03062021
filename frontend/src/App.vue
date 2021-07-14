<template>
  <div id="app">
    <router-view></router-view>

    <footer-bottom></footer-bottom>
  </div>
</template>

<script>
import Footer from "./components/Footer/Footer";

export default {
  name: "App",
  components: {
    "footer-bottom": Footer,
  },
};
</script>

<style lang="scss">
html,
body {
  font-size: 62.5%;
}

#app {
  h1 {
    margin-top: 6rem;
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 1em;
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1em;
    text-align: center;
  }

  p {
    font-size: 2rem;
    text-align: center;
  }

  .router-link-active {
    color: white;
    font-weight: bold;
  }

  a,
  .deconnexion {
    color: rgb(196, 180, 180);
    font-size: 1.5em;
    text-decoration: none;
  }

  #image {
    margin-bottom: 8rem;
  }

  input {
    height: 4rem;
    font-size: 2rem;
  }

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
