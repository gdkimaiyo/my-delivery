<template>
  <q-form class="form" @submit.prevent="onSubmit">
    <div class="row justify-center text-h6">My Information</div>
    <q-input
      class="q-py-md"
      filled
      v-model="fullname"
      label="Full Name *"
      dense
      type="text"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.trim().length > 0) || 'Please provide your full name',
      ]"
    />
    <q-input
      class="q-py-md"
      filled
      v-model="cellPhone"
      label="Cell Phone *"
      placeholder="0712345678 or +254712345678 or 254712345678"
      dense
      type="text"
      lazy-rules
      :rules="[
        (val) => validateMobile(val) || 'Please provide a valid phone number.',
      ]"
    />
    <q-input
      class="q-py-md"
      filled
      v-model="email"
      label="Email Address *"
      dense
      type="email"
      lazy-rules
      :rules="[
        (val) => validateEmail(val) || 'Please provide a valid email address',
      ]"
    />
    <q-input
      class="q-py-md"
      filled
      v-model="location"
      label="Your precise location *"
      dense
      type="text"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.trim().length > 0) ||
          'Please provide your exact location',
      ]"
    />
    <q-input
      class="q-py-md"
      filled
      v-model="pinLocation"
      label="Your pin location (Optional)"
      dense
      type="text"
    />
    <q-input
      v-model="message"
      class="q-py-md"
      spellcheck="false"
      label="Leave a note or message (Optional)"
      filled
      autogrow
    />
    <div class="q-mt-md">
      <q-btn no-caps rounded :loading="isLoading" type="submit" color="primary">
        Checkout
        <template v-slot:loading>
          <q-spinner class="on-left" color="white" />
        </template>
      </q-btn>
      <span v-if="isLoading" class="q-pl-md">Submiting...</span>
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import { validateEmail, validateMobile, getName } from "../utils/heplers";
import {
  getCustomerByEmail,
  register,
  uCustomer,
} from "../shared/services/user.service";
import { saveOrder } from "../shared/services/delivery.service";

export default defineComponent({
  name: "CheckoutForm",

  setup() {
    const cart = JSON.parse(localStorage.getItem("my_cart"));

    return {
      fullname: ref(null),
      cellPhone: ref(null),
      email: ref(null),
      location: ref(null),
      pinLocation: ref(null),
      message: ref(null),
      cartItems: ref(cart),
      isLoading: ref(false),
    };
  },

  methods: {
    async onSubmit() {
      this.isLoading = true;

      const user = {
        firstname: this.getName("first", this.fullname),
        lastname: this.getName("last", this.fullname),
        cellPhone: this.cellPhone,
        email: this.email,
        location: this.location,
      };

      const order = {
        location: this.location,
        pin: this.pinLocation,
        order: JSON.parse(JSON.stringify(this.cartItems)),
        message: this.message,
        amount: this.getCheckoutAmnt(),
      };

      await getCustomerByEmail(user.email)
        .then((response) => {
          this.saveUserOrder(response.data._id, order);

          // Update customer information, incase user updated their name,
          // location, phone number, e.t.c EXCEPT email
          const oldInfo = JSON.parse(localStorage.getItem("md_user"));
          if (this.infoChanged(oldInfo, user)) {
            user.userId = oldInfo._id;
            this.uCustomerInfo(user);
          }
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            this.saveCustomer(user, order);
          } else {
            Notify.create({
              type: "warning",
              message: error?.response?.data?.message
                ? error.response.data.message
                : "Request failed. Please check your network connection.",
              group: false,
            });
            this.isLoading = false;
          }
        });
    },

    async saveCustomer(payload, order) {
      await register(payload)
        .then((res) => {
          // Store customer info in localstorage
          this.cacheUser(res.data);

          this.saveUserOrder(res.data._id, order);
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    async saveUserOrder(userId, order) {
      const payload = {
        ...order,
        customer: userId,
      };
      await saveOrder(payload)
        .then((res) => {
          // Save order info in localstorage
          if (typeof Storage !== undefined) {
            let my_orders = [];
            if (localStorage.getItem("my_orders")) {
              my_orders = JSON.parse(localStorage.getItem("my_orders"));
              my_orders.push(res.data);
              localStorage.setItem("my_orders", JSON.stringify(my_orders));
            } else {
              my_orders.push(res.data);
              localStorage.setItem("my_orders", JSON.stringify(my_orders));
            }
          }
          this.$emit("checkoutSuccess");
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
        });
    },

    async uCustomerInfo(data) {
      // Update user profile
      await uCustomer(data)
        .then((res) => {
          // Store customer info in localstorage
          this.cacheUser(res.data);
        })
        .catch((error) => {});
    },

    cacheUser(data) {
      if (typeof Storage !== undefined) {
        // Remove any existing record in localstorage
        localStorage.removeItem("md_user");
        // Save new information
        localStorage.setItem("md_user", JSON.stringify(data));
      }
    },

    infoChanged(oldInfo, newInfo) {
      if (
        oldInfo?.firstname !== newInfo?.firstname ||
        oldInfo?.lastname !== newInfo?.lastname ||
        oldInfo?.cellPhone !== newInfo?.cellPhone ||
        oldInfo?.location !== newInfo?.location
      ) {
        return true;
      }
      return false;
    },

    getCheckoutAmnt() {
      let amnt = 0;
      this.cartItems?.forEach((item) => {
        amnt += item.price * item.quantity;
      });
      return amnt;
    },

    validateEmail,
    validateMobile,
    getName,
  },
});
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 575px) {
  //
}
</style>
