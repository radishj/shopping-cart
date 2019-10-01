<template>
<div id="app">
  <v-app id="asdf111">
    <div>
      <v-toolbar dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>ShoppingCart</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn flat>
            Products
          </v-btn>
          <v-btn flat>
            <v-badge left color="green">
              <span slot="badge">$</span>
              <v-icon>shopping_cart</v-icon> Basket
            </v-badge>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-content>
      
    </v-content>

    <v-footer dark padless>
      <v-card flat tile class="indigo lighten-1 white--text text-center flex">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" dark icon>
            <v-icon size="24px">{{icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text>
          shopping card footer text here.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          &copy;2019 - <strong>ShoppingCard</strong>
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
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ]
    
  }),
};
</script>
