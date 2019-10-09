<template>
  <div>
    <v-app-bar flat app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>君知团购市场</v-toolbar-title>

       <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>
          Products
        </v-btn>
        <v-btn text href="Basket">
          <v-badge left color="green">
            <span slot="badge">5</span>
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
              v-for="cat in categories"
              :key="cat.ID"
              @click="updateSelected(cat)"
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
import axios from 'axios'
export default {
    data: () => ({
    drawer: false,
    selectedItem: {},
    categories: [],
    items:[
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      }]
    }),
    mounted(){
      this.getCats()
    },
    methods: { 
      getCats () {
      axios.get('http://localhost:3000/fresh/productTypes').then(
        result => {
            alert(result.data) 
            this.categories = result.data
        },
        error => {
            alert(error)
        }
    )
    },
    /**
    * update state to maintain selected item
    * and toggle view
    */
    updateSelected (item) {
        this.selectedItem = item;
        alert(item.title);
        this.drawer = !this.drawer;
     }
   }
};
</script>

<style>

</style>
