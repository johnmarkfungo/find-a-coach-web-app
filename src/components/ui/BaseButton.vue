<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #FA923F;
  border: 1px solid #FA923F;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #c76414;
  border-color: #c76414;
}

.flat {
  background-color: transparent;
  color: #c76414;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #c76414;
  color: #c76414;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #f3cfb1;
}
</style>