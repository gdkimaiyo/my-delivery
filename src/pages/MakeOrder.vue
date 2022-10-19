<template>
  <q-page class="column q-pb-xl">
    <div id="make-an-order" class="main-page q-pa-md q-mt-md">
      <div class="all-items-header q-pb-md q-pl-xs">Make an Order</div>
      <div class="">
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          :contracted="$q.screen.lt.sm"
          animated
        >
          <q-step
            :name="1"
            title="Pick Items to Order"
            icon="settings"
            :done="step > 1"
            class="q-mb-xl"
            style="min-height: 200px"
          >
            <AllItems :items="items" :isLoading="isLoading" />
          </q-step>

          <q-step
            :name="2"
            title="Review and Checkout"
            icon="fas fa-cart-plus"
            :done="step > 2"
            class="q-mb-lg"
            style="min-height: 200px"
          >
            <div class="details">
              <div class="checkout-form" v-if="cartItems?.length > 0">
                <CheckoutForm @checkoutSuccess="onCheckout" />
              </div>
              <div class="order-details" v-if="cartItems?.length > 0">
                <ShoppingCart @cartIsEmpty="onEmptyCart" />
              </div>
              <div
                class="q-mt-xl q-mb-lg"
                style="text-align: center"
                v-if="cartItems?.length == 0"
              >
                <div class="row justify-center" style="display: block">
                  <q-icon
                    name="fas fa-cart-plus"
                    size="32px"
                    class="cart-icon"
                  />
                </div>
                <div class="row justify-center subtitle q-my-lg">
                  Your shopping cart is empty!
                  <a
                    @click="$refs.stepper.previous()"
                    class="q-px-xs text-blue-8 cursor-pointer"
                  >
                    Go back
                  </a>
                  to previous step and add items to your order.
                </div>
              </div>
            </div>
          </q-step>

          <q-step
            :name="3"
            title="Order History"
            icon="fas fa-square-arrow-up-right"
            class="q-mb-lg"
            style="min-height: 200px"
          >
            <div class="text-h6">My Order History</div>
            <div class="subtitle q-my-lg">Order history unavailable!</div>
          </q-step>

          <!-- <template v-slot:navigation>
            <q-stepper-navigation>
              <div class="nav-btns q-mr-md">
                <q-btn
                  v-if="step === 1"
                  no-caps
                  rounded
                  @click="$refs.stepper.next()"
                  color="primary"
                >
                  Continue
                  <q-icon
                    name="fas fa-arrow-right"
                    class="q-pl-sm"
                    size="12px"
                  />
                </q-btn>
              </div>
            </q-stepper-navigation>
          </template> -->

          <template v-slot:message>
            <q-banner v-if="step === 1" class="text-dark q-px-lg q-mt-sm">
              Pick or add items you would like to order
              <div class="nav-btns q-mr-md">
                <q-btn no-caps rounded @click="goToNext()" color="primary">
                  Continue
                  <q-icon
                    name="fas fa-arrow-right"
                    class="q-pl-sm"
                    size="12px"
                  />
                </q-btn>
              </div>
            </q-banner>
            <q-banner v-else-if="step === 2" class="text-dark q-px-lg q-mt-sm">
              Review your order and checkout
              <div class="nav-btns q-mr-md">
                <q-btn
                  v-if="step > 1"
                  no-caps
                  flat
                  rounded
                  color="primary"
                  @click="$refs.stepper.previous()"
                  class="q-mr-sm"
                >
                  <q-icon
                    name="fas fa-arrow-left"
                    class="q-pr-sm"
                    size="12px"
                  />
                  Add more
                </q-btn>
                <q-btn
                  no-caps
                  flat
                  rounded
                  @click="this.$refs.stepper.next()"
                  color="primary"
                >
                  Order History
                  <q-icon
                    name="fas fa-arrow-right"
                    class="q-pl-sm"
                    size="12px"
                  />
                </q-btn>
              </div>
            </q-banner>
            <q-banner v-else class="text-dark q-px-lg q-mt-sm">
              View my entire order history
              <div class="nav-btns q-mr-md">
                <q-btn
                  v-if="step > 1"
                  no-caps
                  flat
                  rounded
                  color="primary"
                  @click="$refs.stepper.previous()"
                >
                  <q-icon
                    name="fas fa-arrow-left"
                    class="q-pr-sm"
                    size="12px"
                  />
                  Back
                </q-btn>
              </div>
            </q-banner>
          </template>
        </q-stepper>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import { getItems } from "../shared/services/item.service";
import AllItems from "../components/AllItems.vue";
import ShoppingCart from "../components/ShoppingCart.vue";
import CheckoutForm from "../components/CheckoutForm.vue";

export default defineComponent({
  name: "MakeOrder",

  components: {
    AllItems,
    ShoppingCart,
    CheckoutForm,
  },

  setup() {
    const cart = JSON.parse(localStorage.getItem("my_cart"));

    return {
      step: ref(cart?.length > 0 ? 2 : 1),
      items: ref(null),
      cartItems: ref(cart),
      isLoading: ref(false),
    };
  },

  methods: {
    getAllItems() {
      this.isLoading = true;
      getItems()
        .then((response) => {
          this.items = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.items = [];
          this.isLoading = false;
          Notify.create({
            type: "negative",
            message: "CONNECTION REFUSED.",
            group: false,
            timeout: 5000,
          });
        });
    },

    goToNext() {
      const cart = JSON.parse(localStorage.getItem("my_cart"));
      if (cart === null || cart?.length === 0) {
        Notify.create({
          type: "info",
          color: "secondary",
          message: "Pick items you wish to order to continue.",
          group: false,
          timeout: 5000,
        });
        // this.step = 1;
      }
      this.$refs.stepper.next();
    },

    onEmptyCart() {
      this.cartItems = [];
      Notify.create({
        type: "info",
        color: "secondary",
        message: "Pick items you wish to order to continue.",
        group: false,
        timeout: 5000,
      });
    },

    onCheckout() {
      // Go to order history and empty cart
      this.step = 3;
      const my_cart = [];
      localStorage.setItem("my_cart", JSON.stringify(my_cart));
      this.cartItems = [];
      Notify.create({
        type: "info",
        color: "primary",
        message: "Order successfully placed. Delivery is on the way.",
        group: false,
        timeout: 6000,
      });
    },
  },

  mounted() {
    this.getAllItems();
  },
});
</script>

<style lang="scss" scoped>
.all-items-header {
  font-size: 28px;
  font-weight: 700;
}

.nav-btns {
  float: right;
}

.navigation-btns {
  position: absolute;
  bottom: 128px;
  right: 64px;
}

.details {
  display: flex;
  flex-direction: row;
}
.checkout-form,
.order-details {
  width: 50%;
}

.subtitle {
  font-size: 14px;
  color: rgba(121, 131, 143, 0.85);
}

@media only screen and (max-width: 575px) {
  .all-items-header {
    font-size: 24px;
  }
  .nav-btns {
    float: left;
    margin-top: 16px;
  }

  .details {
    flex-direction: column;
    padding: 0;
  }
  .checkout-form,
  .order-details {
    width: 100%;
    max-width: 100%;
  }
}
</style>
