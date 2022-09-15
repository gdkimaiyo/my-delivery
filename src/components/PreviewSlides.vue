<template>
  <div id="preview-slides">
    <div class="">
      <q-carousel
        v-model="slide"
        swipeable
        infinite
        :autoplay="autoplay"
        animated
        control-type="flat"
        control-color="primary"
        navigation
        padding
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        height="300px"
        class="bg-transparent gt-xs"
      >
        <q-carousel-slide
          class="column no-wrap flex-center"
          v-for="(group, index) in groups"
          :key="index"
          :name="index"
        >
          <div class="row fit items-center q-gutter-xs q-col-gutter no-wrap">
            <q-card
              class="my-card"
              flat
              bordered
              v-for="item in group.groups"
              :key="item._id"
            >
              <q-card-section class="items-center" horizontal>
                <q-img class="col-4 card-image" :src="getImgUrl(item.image)" />
                <q-card-section>
                  <div class="text-h6 item-name">{{ item.item }}</div>
                  <div v-if="item.desc" class="ellipsis-2-lines">
                    {{ item.desc }}
                  </div>
                  <q-btn
                    no-caps
                    rounded
                    color="primary"
                    class="q-mt-md"
                    @click="explore(item._id)"
                  >
                    Order Now
                    <q-icon
                      name="fas fa-arrow-right"
                      class="q-pl-sm"
                      size="16px"
                    />
                  </q-btn>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <!-- On Handset Devices -->
      <q-carousel
        v-model="slide"
        swipeable
        infinite
        :autoplay="autoplay"
        animated
        control-type="flat"
        control-color="primary"
        navigation
        padding
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
        height="200px"
        class="bg-transparent lt-sm"
      >
        <q-carousel-slide
          class="column no-wrap flex-center"
          v-for="(item, index) in items"
          :key="item._id"
          :name="index"
        >
          <div class="row fit items-center q-gutter-xs q-col-gutter no-wrap">
            <q-card class="my-card" flat bordered>
              <q-card-section class="items-center" horizontal>
                <q-img class="col-4 card-image" :src="getImgUrl(item.image)" />
                <q-card-section>
                  <div class="text-h6 item-name">{{ item.item }}</div>
                  <q-btn
                    no-caps
                    rounded
                    color="primary"
                    class="q-mt-sm"
                    @click="explore(item._id)"
                  >
                    Order Now
                    <q-icon
                      name="fas fa-arrow-right"
                      class="q-pl-sm"
                      size="12px"
                    />
                  </q-btn>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <!-- Backround Image -->
      <q-img src="../assets/bg-5.jpg" class="header-image absolute-top" />
    </div>

    <div class="all-items q-mt-md">
      <div class="row justify-center">
        <q-input
          label-color="text-black"
          class="search-input font-weight-bold q-ma-md"
          standout="bg-dark text-black"
          bg-color="grey-3"
          dense
          rounded
          outlined
          v-model="text"
          label="Search for fries, chips, drinks, e.t.c"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="items">
        <div class="all-items-header q-pb-md">Today's Offers</div>

        <AllItems :items="items" :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import AllItems from "../components/AllItems.vue";
import { getItems } from "../shared/services/item.service";
import { getImgUrl } from "../utils/heplers";

export default defineComponent({
  name: "PreviewSlides",

  components: {
    AllItems,
  },

  setup() {
    const now = new Date();
    let msTillReload =
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0) -
      now;
    if (msTillReload < 0) {
      msTillReload += 86400000; // it's past reload time (noon), try the following day.
    }

    return {
      slide: ref(0),
      autoplay: ref(true),
      items: ref(null),
      groups: ref([]),
      isLoading: ref(false),
      msecTillReload: ref(msTillReload),
      text: ref(""),
    };
  },

  methods: {
    getAllItems() {
      this.isLoading = true;
      getItems()
        .then((response) => {
          this.items = response.data;

          const chunkSize = 2;
          for (let i = 0; i < this.items.length; i += chunkSize) {
            const chunk = this.items.slice(i, i + chunkSize);
            this.groups.push({ groups: chunk });
          }
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

    getImgUrl,

    explore(itemId) {
      console.log(itemId);
    },

    triggerReload() {
      setTimeout(function () {
        console.log("Function triggered at noon everyday");
      }, this.msecTillReload);
    },
  },

  mounted() {
    this.getAllItems();
  },
});
</script>

<style lang="scss" scoped>
.header-image {
  height: 300px;
  z-index: -1;
  opacity: 0.8;
  filter: grayscale(35%);
}
.my-card {
  width: 50%;
  max-width: 50%;
  height: 160px;
  margin-right: 12px;
  color: rgba(1, 0, 0);
  // background-color: rgba(24, 35, 39);
  background-color: rgba(245, 242, 240);
  // background-color: rgba(245, 194, 92);
  // background-color: rgba(173, 224, 187);

  .card-image {
    height: 159px;
  }
}
.item-name {
  font-weight: 700;
}

.search-input {
  width: 50%;
  max-width: 50%;
  // color: rgba(16, 15, 15);
  // color: rgba(101, 101, 101);
  // background-color: rgba(238, 238, 238);
}
.all-items-header {
  font-size: 28px;
  font-weight: 700;
}

@media only screen and (max-width: 575px) {
  .header-image {
    height: 200px;
  }
  .my-card {
    width: 100%;
    max-width: 100%;
    height: 110px;

    .card-image {
      height: 109px;
    }
  }
  .q-carousel__slide,
  .q-carousel .q-carousel--padding {
    padding: 0;
  }

  .search-input {
    width: 100%;
    max-width: 100%;
  }
  .all-items-header {
    font-size: 24px;
  }
}
</style>
