<template>
  <div class="row no-wrap q-pa-md">
    <div class="column" v-if="cartItems?.length > 0">
      <div class="row justify-center text-h6 q-mb-md">My Order</div>
      <div class="" v-for="(item, index) in cartItems" :key="index">
        <q-item>
          <q-item-section avatar>
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
              <q-btn
                flat
                round
                color="info"
                icon="cancel"
                @click="removeItem(item._id)"
              >
                <q-tooltip class="bg-info" :offset="[10, 10]">
                  Remove from cart
                </q-tooltip>
              </q-btn>
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

    <div class="column" v-else>
      <div class="row justify-center q-mt-xl q-mb-lg">
        <div>
          <q-icon name="fas fa-cart-plus" size="32px" class="cart-icon" />
        </div>
        <div class="subtitle q-my-lg">
          Your shopping cart is empty! Add items to your order for checkout.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import { formatCurrency } from "../utils/heplers";

export default defineComponent({
  name: "ShoppingCart",

  setup() {
    const cart = JSON.parse(localStorage.getItem("my_cart"));

    return {
      cartItems: ref(cart),
    };
  },

  methods: {
    formatCurrency,

    getCheckoutAmnt() {
      let amnt = 0;
      this.cartItems?.forEach((item) => {
        amnt += item.price * item.quantity;
      });
      return amnt;
    },

    viewItem(itemId) {
      this.$router.push(`/items/${itemId}`);
    },

    removeItem(itemId) {
      this.cartItems = this.cartItems.filter((item) => item?._id !== itemId);
      let my_cart = JSON.parse(localStorage.getItem("my_cart"));
      my_cart = my_cart?.filter((item) => item?._id !== itemId);
      localStorage.setItem("my_cart", JSON.stringify(my_cart));
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
.cart-icon {
  color: rgba(121, 131, 143, 0.85);
}
.subtitle {
  font-size: 14px;
}
@media only screen and (max-width: 575px) {
  .checkout-btn {
    width: 100%;
  }
}
</style>
