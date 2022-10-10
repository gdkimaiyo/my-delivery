<template>
  <div class="item-details">
    <div class="go-back gt-xs text-primary">
      <span class="cursor-pointer" @click="goBack()">
        <q-icon name="fas fa-arrow-left" class="q-pr-sm" size="16px" />
        Go back
      </span>
    </div>
    <div class="details q-mb-lg" v-if="!isLoading && details !== null">
      <div class="item-image">
        <q-img :src="getImgUrl(details.image)" class="side-image" />
      </div>
      <div class="item-desc">
        <div class="text-h6">
          {{ details.item }}
        </div>
        <div class="subtitle">
          {{ formatCurrency(details?.price) }}
        </div>
        <div class="text-subtitle1 q-mt-lg" v-if="details.desc">
          {{ details.desc }}
        </div>
        <div class="number-ordered q-mt-lg q-mb-md">
          <q-btn
            round
            style="background: rgba(101, 101, 101, 0.75)"
            icon="fas fa-minus"
            class="text-white q-mr-lg"
            @click="incrementNumber('minus')"
          />
          <span style="color: rgba(0, 0, 0, 0.5)">{{ numberToOrder }}</span>
          <q-btn
            round
            style="background: rgba(101, 101, 101, 0.75)"
            icon="fas fa-plus"
            class="text-white q-ml-lg"
            @click="incrementNumber('plus')"
          />
        </div>
        <div class="q-my-lg">
          <q-btn
            no-caps
            rounded
            color="primary"
            class="add-to-cart-btn text-weight-bold"
            @click="addToCart()"
          >
            Add to Order
          </q-btn>
        </div>

        <div class="subtitle q-my-lg" v-if="quantity > 0">
          <q-icon name="fas fa-circle-info" class="q-pr-sm" size="16px" />
          You have added {{ quantity }}
          <span v-if="quantity > 1">quantities</span>
          <span v-else>quantity</span>
          of this item to cart. Add new order to update cart.
        </div>

        <div class="go-back lt-sm text-primary">
          <span class="cursor-pointer" @click="goBack()">
            <q-icon name="fas fa-arrow-left" class="q-pr-sm" size="16px" />
            Go back
          </span>
        </div>
      </div>
    </div>
    <div
      class="details q-pa-md q-mb-lg"
      v-else-if="!isLoading && details === null"
    >
      <div class="text-negative">Connection Refused. Please reload.</div>
    </div>
    <div class="details q-pa-md q-mb-lg" v-else>
      <div class="item-image item-image-skeleton">
        <q-skeleton height="100%" square />
      </div>
      <div class="item-desc">
        <!-- Title Skeleton -->
        <div class="text-h6 q-mt-md">
          <q-skeleton type="QBtn" width="100%" />
        </div>
        <!-- Desc Skeleton -->
        <div class="text-subtitle1 q-mt-md q-mb-lg">
          <q-skeleton type="text" />
          <q-skeleton type="text" />
          <q-skeleton type="text" width="25%" />
        </div>

        <div class="q-my-lg">
          <q-skeleton type="QBtn" class="add-to-cart-btn" />
        </div>
      </div>
    </div>
    <q-separator inset class="gt-xs" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import { useRoute } from "vue-router";
import { getItem } from "../shared/services/item.service";
import { getImgUrl, formatCurrency } from "../utils/heplers";

export default defineComponent({
  name: "ItemDetails",

  setup() {
    const route = useRoute();

    return {
      itemId: ref(route.params.itemId),
      details: ref(null),
      isLoading: ref(false),

      numberToOrder: ref(1),
      quantity: ref(0),
    };
  },

  methods: {
    getImgUrl,
    formatCurrency,

    getItemDetails() {
      this.isLoading = true;
      getItem(this.itemId)
        .then((response) => {
          this.details = response.data;
          const cart = JSON.parse(localStorage.getItem("my_cart"));
          if (
            cart !== null &&
            cart?.filter((item) => item?._id === this.details?._id)?.length > 0
          ) {
            this.quantity = cart?.filter(
              (item) => item?._id === this.details?._id
            )[0]?.quantity;
            this.numberToOrder = this.quantity;
          }
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          if (error?.response?.status === 404) {
            Notify.create({
              type: "info",
              message: "ITEM NOT FOUND.",
              group: false,
              timeout: 5000,
            });
            this.$router.push("/");
          } else {
            Notify.create({
              type: "negative",
              message: "CONNECTION REFUSED.",
              group: false,
              timeout: 5000,
            });
          }
        });
    },

    goBack() {
      this.$router.back();
    },

    incrementNumber(status) {
      if (status === "plus") {
        this.numberToOrder += 1;
      } else {
        this.numberToOrder =
          this.numberToOrder > 1 ? this.numberToOrder - 1 : 1;
      }
    },

    addToCart() {
      if (localStorage.getItem("my_cart") && typeof Storage !== undefined) {
        let my_cart = JSON.parse(localStorage.getItem("my_cart"));
        // Remove current item from localstorage and update quantity.
        my_cart = my_cart?.filter((item) => item?._id !== this.details?._id);
        my_cart.push({
          ...this.details,
          quantity: this.numberToOrder,
        });
        localStorage.setItem("my_cart", JSON.stringify(my_cart));
        this.quantity = this.numberToOrder;
      } else {
        const my_cart = [
          {
            ...this.details,
            quantity: this.numberToOrder,
          },
        ];
        localStorage.setItem("my_cart", JSON.stringify(my_cart));
        this.quantity = this.numberToOrder;
      }
    },
  },

  mounted() {
    this.getItemDetails();
  },
});
</script>

<style lang="scss" scoped>
.item-details {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  margin-top: 32px;
}
.go-back {
  padding: 16px 0 8px 16px;
}
.details {
  display: flex;
  flex-direction: row;
  padding: 16px;
}
.item-image {
  width: 50%;
}
.side-image {
  height: 60vh;
}
.item-desc {
  width: 50%;
  margin-top: 24px;
  padding: 16px 0 16px 32px;
}
.add-to-cart-btn {
  width: 200px;
}

.subtitle {
  color: rgba(121, 131, 143, 0.85);
  font-size: 14px;
}

.item-image-skeleton {
  height: 450px;
}

@media only screen and (max-width: 575px) {
  .item-details {
    margin-top: 0;
  }
  .details {
    flex-direction: column;
    padding: 0;
  }
  .item-image,
  .item-desc {
    width: 100%;
    max-width: 100%;
  }
  .item-desc {
    padding: 16px;
    margin-top: 0;
  }
  .number-ordered,
  .go-back {
    text-align: center;
  }
  .add-to-cart-btn {
    width: 100%;
  }

  .item-image-skeleton {
    height: 330px;
  }
}
</style>
