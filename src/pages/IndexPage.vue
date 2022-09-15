<template>
  <q-page class="column q-pb-xl">
    <div class="main-page q-pa-md">
      <PreviewSlides />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import PreviewSlides from "../components/PreviewSlides.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    PreviewSlides,
  },
});
</script>

<style lang="scss" scoped>
//
@media only screen and (max-width: 575px) {
  //
}
</style>
