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
        <v-list shaped>
          <v-subheader class="font-weight-bold">选择分类</v-subheader>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              @click="updateSelected(item)"
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
    data: () => ({
    drawer: false,
    selectedItem: {},
    items:[
      {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜1'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅1'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜2'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅2'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      },
       {
        avatar: require('@/assets/img/vegetable.jpg'),
        herf: '#',
        title: '蔬菜'
      },
      {
        avatar: require('@/assets/img/hotpot.jpg'),
        herf: '#',
        title: '火锅'
      }]
    }),
    methods: { 
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
