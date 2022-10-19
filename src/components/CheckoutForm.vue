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
      label="Your location *"
      dense
      type="text"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.trim().length > 0) || 'Please provide your location',
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
        Submit
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
import { validateEmail, validateMobile } from "../utils/heplers";

export default defineComponent({
  name: "CheckoutForm",

  setup() {
    return {
      fullname: ref(null),
      cellPhone: ref(null),
      email: ref(null),
      location: ref(null),
      pinLocation: ref(null),
      message: ref(null),
      isLoading: ref(false),
    };
  },

  methods: {
    onSubmit() {
      this.isLoading = true;

      const data = {
        fullname: this.fullname,
        cellPhone: this.cellPhone,
        email: this.email,
        location: this.location,
        pinLocation: this.pinLocation,
        message: this.message,
      };

      console.log(data);

      setTimeout(() => {
        this.isLoading = false;
        this.$emit("checkoutSuccess");
      }, 3000);
    },

    validateEmail,
    validateMobile,
  },
});
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 575px) {
  //
}
</style>
