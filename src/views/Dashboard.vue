<template>
    <div>
    <div class="dashboard"  v-if="curPage==='dash'">
    <v-list-item>
        <v-list-item-avatar @click="drawer = !drawer;" >
            <v-icon>mdi-sitemap</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title><h2>>> {{catSelected}}</h2></v-list-item-title>
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
            <v-col cols="6" sm="4" md="3" lg="2">
                <v-card class="ma-1">
                    <v-img
                    :src = "products[0].img"
                    height="200px"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-11px;right:-10px;">
                        <v-btn absolute color="indigo lighten-2 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1">
                        {{products[0].name}}
                    </v-card-title>
                    
                    <v-card-actions class="pa-0 pl-2">
                        <v-card-text class="grey--text subtitle-1 pa-0 pl-1">
                                ${{products[0].price}}/{{products[0].unit}} x {{products[0].qty}}{{products[0].unit}}, {{products[0].info}}
                        </v-card-text>
                        <div class="flex-grow-1"></div>

                        <v-btn
                            icon
                            @click="show = !show"
                        >
                            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show">
                        <v-card-text>
                            {{products[0].detail}}
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                    
                </v-card>
            </v-col>
            <v-col
                v-for="k in 12"
                :key="k"
                :cols="6"
                :sm="4"
                :md="3"
                :lg="2"
            >
                <v-card class="ma-1">
                    <v-img
                    :src = "products[1].img"
                    height="200px"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-11px;right:-10px;">
                        <v-btn absolute color="indigo lighten-2 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1">
                        {{products[1].name}}
                    </v-card-title>
                    
                    <v-card-actions class="pa-0 pl-2">
                        <v-card-text class="grey--text subtitle-1 pa-0 pl-1">
                                ${{products[1].price}}/{{products[1].unit}} x {{products[1].qty}}{{products[1].unit}}, {{products[1].info}}
                        </v-card-text>
                        <div class="flex-grow-1"></div>

                        <v-btn
                            icon
                            @click="show1 = !show1"
                        >
                            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show1">
                        <v-card-text>
                            {{products[1].detail}}
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
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';
export default{
    data: () =>({
        drawer: false,
        catSelected: 'select',
        show: false,
        show1: false,
        products: [
            {
                id: 0,
                price: 8.89,
                img: require('@/assets/products/35.jpg'),
                name1: "普通羊肉片",
                qty: 2,
                unit: "磅",
                info: "180克",
                detail: "适合爆炒或切小后火锅"
            },
            {
                id: 1,
                price: 0.89,
                img: require('@/assets/products/DABAICAI.jpg'),
                name1: "大白菜(邵菜)",
                qty: 2,
                unit: "磅",
                info: "",
                detail: "华人最爱 - 炒菜,涮锅,煲汤,万能菜"
            }
        ]
    }),
    computed:{
        ...mapGetters(['cats', 'curPage'])
    },
    methods:{
        updateSelected(cat)
        {
            this.catSelected = cat.Name;
            this.drawer = false;
        },
        getPage()
        {
            alert(this.curPage);
            return this.curPage=='dash';
        },
        ...mapMutations(['getCats'])
    },
    mounted(){
        this.getCats();
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