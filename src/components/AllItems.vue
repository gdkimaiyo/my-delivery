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
      <q-btn
        unelevated
        dense
        round
        color="dark"
        class="add-more-btn"
        @click.stop="incrementNumber(item, 'one')"
        v-if="item?.inCart == 0"
      >
        <q-icon name="fas fa-plus" />
      </q-btn>
      <q-btn
        unelevated
        dense
        round
        color="dark"
        class="add-more-btn"
        :label="item?.inCart"
        v-if="item?.inCart > 0"
        @click.stop
      >
        <q-menu
          :offset="[60, 6]"
          class="bg-dark"
          style="border-radius: 24px; border: 1px solid #ffffff"
        >
          <div>
            <q-btn
              round
              dense
              style="background: rgba(101, 101, 101, 0.75)"
              icon="fas fa-minus"
              class="text-white"
              v-if="item?.inCart > 1"
              @click="incrementNumber(item, 'minus')"
            />
            <q-btn
              round
              style="background: rgba(101, 101, 101, 0.75)"
              size="sm"
              icon="fas fa-trash"
              class="text-white"
              v-if="item?.inCart == 1"
              @click="removeItem(item)"
            />
            <span class="number-to-order">{{ item?.inCart }}</span>
            <q-btn
              round
              dense
              style="background: rgba(101, 101, 101, 0.75)"
              icon="fas fa-plus"
              class="text-white"
              @click="incrementNumber(item, 'plus')"
            />
          </div>
        </q-menu>
      </q-btn>
      <!-- <q-btn unelevated rounded color="dark" class="add-more-btn">
        <q-icon name="fas fa-minus" />
        <span>{{ item?.inCart }}</span>
        <q-icon name="fas fa-plus" />
      </q-btn> -->
    </q-card>
  </div>
  <div
    class="q-pt-sm row items-start q-gutter-md"
    v-else-if="!isLoading && items?.length === 0"
  >
    <div class="text-negative">Connection Refused. Please reload.</div>
  </div>
  <div class="q-pt-sm row items-start q-gutter-md" v-else>
    <q-card class="food-item-card" v-for="index in 5" :key="index">
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

    incrementNumber(item, status) {
      this.items.forEach((element) => {
        if (element._id === item._id) {
          if (status === "plus") {
            element.inCart += 1;
          } else if (status === "minus") {
            element.inCart = element?.inCart > 1 ? element.inCart - 1 : 1;
          } else {
            element.inCart = 1;
          }
        }
      });
      this.addToCart(item);
    },

    addToCart(item) {
      if (typeof Storage !== undefined) {
        if (localStorage.getItem("my_cart")) {
          let my_cart = JSON.parse(localStorage.getItem("my_cart"));
          // Remove current item from localstorage and update quantity.
          my_cart = my_cart?.filter((product) => product?._id !== item?._id);
          my_cart.push({
            ...item,
            quantity: item.inCart,
          });
          localStorage.setItem("my_cart", JSON.stringify(my_cart));
        } else {
          const my_cart = [
            {
              ...item,
              quantity: item.inCart,
            },
          ];
          localStorage.setItem("my_cart", JSON.stringify(my_cart));
        }
      }
    },

    removeItem(item) {
      this.items.forEach((element) => {
        if (element._id === item._id) {
          element.inCart = 0;
        }
      });
      let my_cart = JSON.parse(localStorage.getItem("my_cart"));
      // Remove current item from localstorage.
      my_cart = my_cart?.filter((product) => product?._id !== item?._id);
      localStorage.setItem("my_cart", JSON.stringify(my_cart));
    },
  },
});
</script>

<style lang="scss" scoped>
.food-item-card {
  width: 18.5%;
  max-width: 18.5%;
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

.add-more-btn {
  border: 1px solid #ffffff;
  position: absolute;
  right: 8px;
  top: 8px;
}
.number-to-order {
  padding: 16px;
  color: #ffffff;
}
@media only screen and (max-width: 575px) {
  .food-item-card {
    width: 44.55%;
    max-width: 44.55%;
  }
  .food-item-name {
    font-weight: 500;
  }

  .food-item-image {
    height: 100px;
  }

  .number-to-order {
    padding: 8px;
  }
}
</style>
