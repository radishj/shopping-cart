<template>
  <div>
    <v-app-bar flat app dark>
      <v-app-bar-nav-icon ></v-app-bar-nav-icon>
      <v-toolbar-title>君知团购市场</v-toolbar-title>

       <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>
          Products
        </v-btn>
        <v-btn @click="setPage('basket')" text>
          <v-badge left color="green">
            <span slot="badge">{{scbNo}}</span>
            <v-icon>shopping_cart</v-icon> Basket
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
</div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    data: () => ({
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
     show(info)
     {
       alert(info);
     },
      updateSelected (item) {
          this.selectedItem = item;
          alert(item.title);
          this.drawer = !this.drawer;
      },
      ...mapMutations(['getCats', 'setPage'])
    },
 

  };
</script>

<style>

</style>
