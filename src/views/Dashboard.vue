<template>
    <div>
    <div class="dashboard"  v-if="curPage==='dash'">
    <v-list-item>
        <v-list-item-avatar @click="drawer = !drawer;" class="mr-2">
            <v-icon large>mdi-sitemap</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title><span class="display-1">-></span><span class="ml-3 display-1">{{catSelected}}</span></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
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

    <v-container class="my-5">
        <v-row class="mb-6" no-gutters>
            <v-col
                v-for="product in theProducts"
                :key= product.ID
                :cols="6"
                :sm="4"
                :md="3"
                :lg="2"
            >
                <v-card class="ma-1">
                    <v-img
                    :src = "`https://mediavictoria.com/image/Processed/System/GroupSale/${product.Folder}/${product.ImageFileName}`"
                    height="200px"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-11px;right:-10px;">
                        <v-btn absolute color="indigo lighten-2 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1">
                        {{product.Name}}
                    </v-card-title>
                    
                    <v-card-actions class="pa-0 pl-2">
                        <v-card-text class="grey--text subtitle-1 pa-0 pl-1">
                                ${{product.UnitPrice}}/{{product.WUnitType}} x {{product.Unit}}{{product.WUnitType}}
                        </v-card-text>
                        <div class="flex-grow-1"></div>

                        <v-btn
                            icon
                            @click="product.show = !product.show"
                        >
                            <v-icon>{{ product.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show1">
                        <v-card-text>
                            {{product.Info}}
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                    
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </div>
    <div class="basket"  v-if="curPage==='basket'">
        <v-container>
        <h2 class="display-2 mb-4">Basket</h2>

        <v-list>
            <template v-for="(product, index) in products">
                <v-list-item :key="product.id" avatar>
                    <v-list-item-avatar>
                        <img :src="product.img">
                    </v-list-item-avatar>

                    <v-list-item>
                        {{product.name1}}
                    </v-list-item>

                    <v-list-item>
                        {{product.price}}$
                    </v-list-item>

                    <v-list-item-action>
                        <v-text-field label="Quantity" reverse v-model="product.qty"></v-text-field>
                    </v-list-item-action>

                    <v-list-item>
                        {{product.price * product.qty}}$
                    </v-list-item>

                    <v-list-item-action>
                        <v-btn icon ripple>
                            <v-icon color="red lighten-1">delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
            </template>
        </v-list>

        <v-container>
            <v-btn color="success" larger style="float: right;">Go to payment</v-btn>
        </v-container>
    </v-container>
    </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default{
    data: () =>({
        drawer: false,
        catSelected: 'select',
        show: false,
    }),
    computed:{
        ...mapGetters(['cats', 'theProducts', 'curPage']),
    },
    methods:{
        ...mapMutations(['getProductTypeData', 'getProductData', 'getProductsInCat']),
        ...mapActions(['getProductData','getProductsInCat']),
        updateSelected(cat)
        {//alert(Object.keys(state));
            this.catSelected = cat.Name;
            this.getProductsInCat(cat.ID);
            this.drawer = false;
        },
        getPage()
        {
            //alert(this.curPage);
            return this.curPage=='dash';
        },
    },
    async mounted(){
        this.getProductTypeData();
        await this.$store.dispatch('getProductData', 0);
        //await this.$store.dispatch('getProductsInCat',0);
    },
}
</script>

<style scoped>
.v-card--reveal{
        align-items:center;
        bottom: 0;
        justify-content: center;
        opacity:0.5;
        position: absolute;
        width: 100%;
}
</style>