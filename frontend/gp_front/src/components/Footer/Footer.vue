<template>
  <section class="container-fluid footer">
    <h3>{{ copyright }}</h3>
  </section>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      name: "Groupomania",
    };
  },
  computed: {
    copyright() {
      const currentYear = new Date().getFullYear();
      return `${this.name} depuis 1976 jusqu'à ${currentYear}`;
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5.5rem;
  padding-top: 1rem;
  background: hsl(240, 100%, 50%);
  color: white;
  font-size: 1.5rem;
}
</style>
