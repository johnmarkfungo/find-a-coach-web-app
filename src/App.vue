<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';

export default {
  components: {
    'the-header': TheHeader,
  },
  created() {
    this.$store.dispatch('tryLogin');
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        console.log('Auto Logout Triggered');
        this.$router.replace('/login');
      }
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30x);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30x);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>