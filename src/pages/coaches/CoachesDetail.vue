<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>{{ rate }}/hour</h3>
        <base-badge
          v-for="area in selectedCoach.areas"
          :key="area"
          :title="area"
          :type="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Let's get in touch!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view> </router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    contactLink() {
      return '/coaches/' + this.id +'/contact';
    },
  },
  created() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
};
</script>