<template>
  <q-page class="column q-pb-xl">
    <div id="preview-category" class="main-page q-pa-md">
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
          <div
            class="all-items-header q-pb-md"
            v-if="!isLoading && items !== null"
          >
            {{ items[0]?.category?.category }}
          </div>
          <AllItems :items="items" :isLoading="isLoading" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Notify } from "quasar";
import { useRoute } from "vue-router";
import AllItems from "../components/AllItems.vue";
import { getItems } from "../shared/services/item.service";

export default defineComponent({
  name: "CategoryPage",

  components: {
    AllItems,
  },

  setup() {
    const route = useRoute();

    return {
      categoryId: ref(route.params.categoryId),
      items: ref(null),
      isLoading: ref(false),
      text: ref(""),
    };
  },

  methods: {
    getAllItems() {
      this.isLoading = true;
      getItems()
        .then((response) => {
          this.items = response.data;
          // Get items from selected category
          this.items = this.items?.filter(
            (item) => item?.category?._id === this.categoryId
          );
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
  },

  mounted() {
    this.getAllItems();
  },
});
</script>

<style lang="scss" scoped>
.search-input {
  width: 50%;
  max-width: 50%;
}
.all-items-header {
  font-size: 28px;
  font-weight: 700;
}

@media only screen and (max-width: 575px) {
  .search-input {
    width: 100%;
    max-width: 100%;
  }
  .all-items-header {
    font-size: 24px;
  }
}
</style>
