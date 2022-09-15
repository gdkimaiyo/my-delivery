<template>
  <div class="q-pt-sm row items-start q-gutter-md">
    <q-card class="food-item-card" v-for="item in items" :key="item._id">
      <img class="food-item-image" :src="getImgUrl(item.image)" />
      <q-card-section>
        <div class="food-item-name q-mb-xs ellipsis">
          {{ item.item }}
        </div>
        <div class="item-price">KES {{ item.price }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getImgUrl } from "../utils/heplers";

export default defineComponent({
  name: "AllItems",

  props: {
    items: Array,
  },

  methods: {
    getImgUrl,
  },
});
</script>

<style lang="scss" scoped>
.food-item-card {
  width: 18.55%;
  max-width: 18.55%;

  .food-item-name {
    font-size: 16px;
    font-weight: bold;
  }

  .food-item-image {
    height: 150px;
    object-fit: cover;
    object-position: 50% 50%;
  }

  .item-price {
    // color: rgba(0, 0, 0, 0.6);
    color: rgba(101, 101, 101);
    font-size: 0.92rem;
    font-weight: 500;
    line-height: 1.75rem;
    letter-spacing: 0.00937em;
  }
}
@media only screen and (max-width: 575px) {
  .food-item-card {
    width: 45%;
    max-width: 45%;

    .food-item-name {
      font-weight: 500;
    }

    .food-item-image {
      height: 100px;
    }
  }
}
</style>
