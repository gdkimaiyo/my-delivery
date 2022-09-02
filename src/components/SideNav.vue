<template>
  <q-list>
    <q-item-label
      header
      @click="goHome()"
      class="logo text-weight-bold q-my-md"
    >
      <!-- <span style="color: rgba(80, 176, 247)">my</span> -->
      <span style="color: #171717">my</span>
      <span class="text-primary">Delivery</span>
    </q-item-label>

    <div v-for="link in essentialLinks" :key="link.title" v-bind="link">
      <q-item clickable exact :to="link.link">
        <q-item-section v-if="link.icon" avatar>
          <q-icon :name="link.icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ link.title }}</q-item-label>
          <q-item-label caption v-if="link.caption">{{
            link.caption
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

const linksList = [
  {
    title: "Home",
    icon: "school",
    link: "/",
  },
  {
    title: "Make an Order",
    caption: "Make your order to be ordered",
    icon: "chat",
    link: "/make-an-order",
  },
  {
    title: "Terms and Conditions",
    icon: "record_voice_over",
    link: "/t&cs",
  },
  {
    title: "Help",
    caption: "Help, FAQs, How to",
    icon: "help",
    link: "/help",
  },
];

export default defineComponent({
  name: "SideNav",

  setup() {
    return {
      essentialLinks: linksList,
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
.logo {
  font-size: 1.7rem;
  cursor: pointer;
}
@media only screen and (max-width: 575px) {
  //
}
</style>
