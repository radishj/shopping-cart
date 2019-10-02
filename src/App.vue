<template>
<div id="app">
  <v-app>
     <v-navigation-drawer v-model="drawer" absolute temporary class="mx-auto">
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

    <v-app-bar flat app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>君知团购市场</v-toolbar-title>

       <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>
          Products
        </v-btn>
        <v-btn text>
          <v-badge left color="green">
            <span slot="badge">5</span>
            <v-icon>shopping_cart</v-icon> Basket
          </v-badge>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
    <v-content>
      <router-view>

      </router-view>
    </v-content>

    <v-footer dark padless>
      <v-card text tile class="indigo lighten-1 white--text text-center flex">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" dark icon>
            <v-icon size="24px">{{icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text>
          君知易购团购车
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          &copy;2016 - <strong>Imprint Culture & Media Inc.</strong>
        </v-card-text>
      </v-card>

    </v-footer>

  </v-app>
</div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
  data: () => ({
    drawer: false,
    selectedItem: {},
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ],
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
      },
    ]
  }),
   methods: {
    
    /**
    * update state to maintain selected item
    * and toggle view
    */
    updateSelected (item) {
        this.selectedItem = item;
        alert(item.title);
     }
   }
};
</script>
