<template>
  <div
    class="q-pt-sm row items-start q-gutter-md"
    v-if="!isLoading && items?.length > 0"
  >
    <q-card
      class="food-item-card cursor-pointer"
      v-for="item in items"
      :key="item._id"
      @click="viewItem(item._id)"
    >
      <img class="food-item-image" :src="getImgUrl(item.image)" />
      <q-card-section>
        <div class="food-item-name q-mb-xs ellipsis">
          {{ item.item }}
        </div>
        <div class="item-price">{{ formatCurrency(item.price) }}</div>
      </q-card-section>
    </q-card>
  </div>
  <div
    class="q-pt-sm row items-start q-gutter-md"
    v-else-if="!isLoading && items?.length === 0"
  >
    <div class="text-negative">Connection Refused. Please reload.</div>
  </div>
  <div class="q-pt-sm row items-start q-gutter-md" v-else>
    <q-card class="food-item-card" v-for="index in 10" :key="index">
      <q-skeleton height="150px" square />

      <q-item>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getImgUrl, formatCurrency } from "../utils/heplers";

export default defineComponent({
  name: "AllItems",

  props: {
    items: Array,

    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    getImgUrl,
    formatCurrency,

    viewItem(itemId) {
      this.$router.push(`/items/${itemId}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.food-item-card {
  width: 18.55%;
  max-width: 18.55%;
}
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
@media only screen and (max-width: 575px) {
  .food-item-card {
    width: 45%;
    max-width: 45%;
  }
  .food-item-name {
    font-weight: 500;
  }

  .food-item-image {
    height: 100px;
  }
}
</style>
