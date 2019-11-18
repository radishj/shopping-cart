<template>
  <div>
    <v-app-bar flat app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer;"></v-app-bar-nav-icon>
      <v-toolbar-title  style="padding-left: 5px;">: {{catSelected}}</v-toolbar-title>

       <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text >
          <p class="title mt-3">君知团购</p>
        </v-btn>
        <v-btn @click="setPage('basket')" text>
          <v-badge left color="green">
            <span slot="badge">{{scbNo}}</span>
            <v-icon>shopping_cart</v-icon> Basket
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
        <v-navigation-drawer v-model="drawer" fixed temporary class="mx-auto">
      <v-card
        class="mx-auto"
        max-width="300"
        tile
      >
        <v-alert
          icon="mdi-animation-play-outline"
          text
          color="blue darken-4"
          elevation="2"
          style="margin-bottom:2px"
        >
          <b>选择分类:</b>
        </v-alert>
        <v-list shaped>
          <v-list-item-group color="primary">
            <v-list-item
              v-for="cat in cats"
              :key="cat.ID"
              @click="updateSelected(cat);"
            >
              <v-list-item-icon>
                <v-icon color="blue">mdi-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="cat.Name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
</div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    data: () => ({
    drawer: false,
    catSelected: "半价特价商品",
    selectedItem: {},
    items:[
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      }]
    }),
    computed:
    {
        ...mapGetters(['cats','scbNo'])
    },
    methods: { 
      /**
      * update state to maintain selected item
      * and toggle view
      */
      ...mapMutations(['getCats', 'setPage']),

     show(info)
     {
       alert(info);
     },
      updateSelected (cat) {
           this.catSelected = cat.Name;
           this.$store.dispatch('getProductsInCat',cat.ID);
           this.drawer = false;
      }
    },
 

  };
</script>

<style>

</style>
