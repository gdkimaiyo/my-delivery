<template>
  <div class="row no-wrap q-pa-md">
    <div class="column">
      <div class="row justify-center text-h6 q-mb-md">My Order</div>
      <div class="" v-for="(item, index) in cartItems" :key="index">
        <q-item>
          <q-item-section top avatar>
            {{ item.quantity }}
          </q-item-section>

          <q-item-section class="cursor-pointer" @click="viewItem(item._id)">
            <q-item-label>{{ item.item }}</q-item-label>
            <q-item-label caption lines="2" v-if="item.desc">
              {{ item?.desc }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              {{ formatCurrency(item.price * item.quantity) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <div class="row justify-center q-my-lg">
        <q-btn
          no-caps
          rounded
          color="primary"
          class="checkout-btn text-weight-bold"
          @click="checkout()"
        >
          Checkout
          <q-icon name="fas fa-circle" class="q-px-sm" size="6px" />
          {{ formatCurrency(getCheckoutAmnt()) }}
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import { formatCurrency } from "../utils/heplers";

export default defineComponent({
  name: "CheckoutDialog",

  setup() {
    const author = JSON.parse(localStorage.getItem("my_cart"));

    return {
      cartItems: ref(author),
    };
  },

  methods: {
    viewItem(itemId) {
      this.$router.push(`/items/${itemId}`);
    },

    formatCurrency,

    getCheckoutAmnt() {
      let amnt = 0;
      this.cartItems?.forEach((item) => {
        amnt += item.price * item.quantity;
      });
      return amnt;
    },

    checkout() {
      Notify.create({
        type: "info",
        color: "primary",
        message: "Checkout is under development",
        group: false,
        timeout: 5000,
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.checkout-btn {
  width: 200px;
}
@media only screen and (max-width: 575px) {
  .checkout-btn {
    width: 100%;
  }
}
</style>
