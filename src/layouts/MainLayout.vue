<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title></q-toolbar-title>

        <!-- <div @click="goHome()" style="cursor: pointer">myDelivery</div> -->
        <div class="" v-if="showCheckout">
          <q-btn unelevated rounded no-caps color="dark">
            <q-icon name="fas fa-cart-plus" size="18px" class="q-pr-sm" />
            Checkout

            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              max-width="450px"
              max-height="93vh"
            >
              <ShoppingCart />
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <SideNav />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import SideNav from "components/SideNav.vue";
import ShoppingCart from "components/ShoppingCart.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    SideNav,
    ShoppingCart,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    },
  },

  computed: {
    showCheckout() {
      return useRoute().path === "/make-an-order" ? false : true;
    },
  },
});
</script>
