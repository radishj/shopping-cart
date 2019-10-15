<template>
    <div>
    <div class="dashboard"  v-if="curPage==='productPick'">
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
                    height="150px"
                    width="200px"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-11px;right:-10px;">
                        <v-btn absolute @click="selectP(product)" color="indigo lighten-2 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1 title">
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
                    <div v-show="product.show">
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
            <span></span><h2 class="title mb-4"><v-icon size=40>shopping_cart</v-icon>  已选商品 :</h2>
            <div>
            <v-container>
                <v-row v-for="product in selectedProducts"
                        :key= product.ID
                        no-gutters
                        >
                    <v-col cols="2">
                        <v-img
                            :src = "`https://mediavictoria.com/image/Processed/System/GroupSale/${product.Folder}/${product.ImageFileName}`"
                            height="60px"
                            width="80px"
                        ></v-img>
                    </v-col>
                    <v-col cols="2" class="mt-4">
                        <b>{{product.Name}}</b>
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        ${{product.UnitPrice}}/{{product.unittypeName}}
                    </v-col>
                    <v-col cols="1">
                        <v-text-field reverse=true label="份量" class="pl-4" v-model="product.Unit" readonly=true></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field reverse=true label="份数" class="pl-4" v-model="product.qty"></v-text-field>
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        <div v-if="product.TAX == 0">
                            <span>${{parseFloat(product.UnitPrice * product.Unit * product.qty).toFixed(2)}}</span>
                        </div>
                        <div v-else><v-badge left color="teal">
                            <span slot="badge">{{TaxString(product.TAX)}}</span>
                            <span>${{parseFloat(product.UnitPrice * product.Unit * product.qty).toFixed(2)}}</span>
                        </v-badge></div>
                    </v-col>
                    <v-col cols="1" class="text-center">
                        <v-btn icon ripple>
                            <v-icon color="red lighten-1">delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="2" class="mt-4 text-right">
                        Tax: ${{getSProductsTaxTotal()}}
                    </v-col>
                    <v-col cols="1" class="text-center">
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="2" class="mt-4 text-right">
                        Total: ${{getSProductsTotal()}}
                    </v-col>
                    <v-col cols="1" class="text-center">
                    </v-col>
                </v-row>
            </v-container>
            </div>

            <v-container class="grey lighten-5">
                <v-row>
                <v-col>
                    <v-card
                    left
                    tile
                    >
                        <v-btn color="success" @click="setPage('productPick')" larger min-width="150" style="float: left;">&lt;&lt; 继续挑选</v-btn>
                    </v-card>
                </v-col>

                <v-spacer></v-spacer>

                <v-col>
                    <v-card
                    tile
                    >
                    <v-btn color="success" larger min-width="150" style="float: right;">我要下单 &gt;&gt;</v-btn>
                    </v-card>
                </v-col>
                </v-row>
            </v-container>
        </v-container>
    </div>
    </div>
</template>

<script>
//import Vue from 'vue'
import {mapGetters, mapMutations, mapActions} from 'vuex';
export default{
    data: () => ({
        drawer: false,
        catSelected: 'select',
        show: false,
        selectedProducts: [],
        totalTax:0,
        total:0
    }),
    computed:{
        ...mapGetters(['cats', 'theProducts', 'curPage', 'getCatName', 'scbNo']),
    },
    methods:{
        ...mapMutations(['getProductTypeData', 'getProductData', 'getProductsInCat', 'ScbNoAddOne', 'setPage']),
        ...mapActions(['getProductData','getProductsInCat']),
        TaxString(tax)
        {
            if(tax==0)
                return false;
            else if(tax==1)
            {
                return "T1"
            }
            else if(tax==3)
            {
                return "T2"
            }
        },
        getSProductsTotal()
        {
            var total=0;
            this.selectedProducts.forEach(e => {
                total += e.UnitPrice * e.Unit * e.qty;
            })
            total += this.totalTax;
            return parseFloat(total).toFixed(2);
        },
        getSProductsTaxTotal()
        {
            var taxTotal=0;
            const PST = 0.07;
            const GST = 0.05;
            this.selectedProducts.forEach(e => {//alert('aa:'+e.tax+';' +e.TAX&2/2+';'+e.TAX&1);
                var tax = (e.TAX&2)/2*PST + (e.TAX&1)*GST;//alert(tax);
                taxTotal += e.UnitPrice * tax * e.Unit * e.qty;
            })
            this.totalTax = parseFloat(taxTotal).toFixed(2);
            return this.totalTax;
        },
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
        selectP(product)
        {
            //product.qty = 1;
            var newP = {
                ...product,
                qty: 1
            };
            let exists = false;
            this.selectedProducts.forEach(function(e) {
                if(e.PID == product.PID)
                {
                    exists = true;
                    return false;
                }
            })
            if(!exists){
                this.selectedProducts.push(newP);
                this.ScbNoAddOne();
            }
            //$set(product, 'qty', 2);
            //Vue.set(this.selectedProducts,this.selectedProducts.length-1,copyProduct);
        }
    },
    async mounted(){
        //this.getProductTypeData();
        await this.$store.dispatch('getProductTypeData');
        await this.$store.dispatch('getProductData', 0);
        this.catSelected = this.getCatName(0);
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
/*.bottom-line{
    border-bottom: 1px dotted grey;
}*/
</style>