<!-- here : html injected in App.vue page -->
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
      name: "by CONNECT-E",
    };
  },
  computed: {
    copyright() {
      const currentYear = new Date().getFullYear();
      return `1998 - ${this.name} -  ${currentYear}`;
    },
  },
};
</script>
<!--here scss style -->
<style scoped lang="scss">
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5.5rem;
  padding-top: 1rem;
  background: blue;
  color: white;
  font-size: 1.5rem;
}
</style>
