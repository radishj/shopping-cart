<template>
    <div>
    <div class="dashboard"  v-if="$store.state.page==='productPick'">
    <v-list-item>
        <v-btn @click="drawer = !drawer;"  color="indigo lighten-2 white--text" fab>
            <v-icon>mdi-sitemap</v-icon>
        </v-btn>
        <v-list-item-content>
            <v-list-item-title><span class="display-1"></span><span class="ml-3 display-1">: {{catSelected}}</span></v-list-item-title>
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

    <v-alert type="error" v-if="showWarning">
        {{warning}}
    </v-alert>
    <v-container class="my-5">
        <v-dialog
            v-model="showImgDlg"
            max-width="90%" 
        >
            <v-card @click="showImgDlg = false">
                <v-img
                    :src = "`https://mediavictoria.com/image/Processed/System/GroupSale_Large/${showImgDlgFolder}/${showImgDlgFileName}`"
                    
                ></v-img>
            </v-card>
        </v-dialog>
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
                        aspect-ratio = 1.333333
                        @click.stop="setShowImgDlg(product)"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-11px;right:-10px;">
                        <v-btn absolute @click="selectP(product)" color="indigo lighten-3 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1 title">
                        {{product.Name}}
                    </v-card-title>
                    
                    <v-card-actions class="pa-0 pl-2">
                        <v-card-text class="grey--text subtitle-1 pa-0 pl-1">
                                ${{product.UnitPrice}}/{{product.unittypeName}} x {{product.Unit}}{{product.unittypeName}}
                        </v-card-text>
                        <div class="flex-grow-1"></div>

                        <v-btn v-show="product.Info"
                            @click="product.showInfo = !product.showInfo"
                            icon
                        >
                            <v-icon>{{product.showInfo?'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="product.showInfo">
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

    <div class="basket"  v-if="$store.state.page==='basket'">
        <v-container>
            <span></span><h2 class="title mb-4"><v-icon size=40>shopping_cart</v-icon>  已选商品 :</h2>
            <div>
            <v-container>
                <v-row v-for="(product,index) in selectedProducts"
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
                        <v-text-field reverse=true label="每份量" class="pl-4" :value="product.Unit" readonly=true></v-text-field>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field reverse=true label="份数" class="pl-4" :value="product.qty" v-model="product.qty" @input="productQty()"></v-text-field>
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        <div v-if="product.TAX == 0">
                            <span>${{parseFloat(product.UnitPrice * product.Unit * product.qty).toFixed(2)}}</span>
                        </div>
                        <div v-else><v-badge left color="teal">
                            <span slot="badge">{{taxString(product.TAX)}}</span>
                            <span>${{parseFloat(product.UnitPrice * product.Unit * product.qty).toFixed(2)}}</span>
                        </v-badge></div>
                    </v-col>
                    <v-col cols="1" class="text-center">
                        <v-btn icon ripple @click="removeProduct(index)">
                            <v-icon color="red lighten-1">delete</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="9" class="mt-4 text-right">
                        Tax:
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        ${{thetax()}}
                    </v-col>
                    <v-col cols="1" class="mt-4 text-right">
                    </v-col>
                </v-row>
                <v-row no-gutters v-if="$store.state.hasDiscount">
                    <v-spacer></v-spacer>
                    <v-col cols="9" class="mt-4 text-right">
                        (连续团购)Discount:
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        ${{thediscount()}}
                    </v-col>
                    <v-col cols="1" class="mt-4 text-right">
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-spacer></v-spacer>
                    <v-col cols="7" class="mt-4 text-left pink--text" v-if="$store.state.deliveryChargeInfo!=''">
                        {{this.$store.state.deliveryChargeInfo}}
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        Total:
                    </v-col>
                    <v-col cols="2" class="mt-4 text-right">
                        ${{thetotal()}}
                    </v-col>
                    <v-col cols="1" class="mt-4 text-right">
                    </v-col>
                </v-row>
                <v-row no-gutters>
                     <v-col cols="10" class="mt-4 text-left">
                        <v-text-field label="注释（您的要求或建议）：" class="" v-model="info"></v-text-field>
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
                    tile v-if="!showWarning"
                    >
                    <v-btn color="success" @click="order()" larger min-width="150" style="float: right;">提交我的订单 &gt;&gt;</v-btn>
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
/*eslint no-console: [0, { allow: ["warn", "error"] }] */
import axios from 'axios';
import {mapGetters, mapMutations, mapActions} from 'vuex';
import router from '../router';
export default{
    data: () => ({
        showImgDlgFolder: '',
        showImgDlgFileName: '',
        showImgDlg: false,
        saleID: -1,
        showWarning: false,
        warning: "订单没有开放，订单开放后会我们群和公众号里发信息，敬请关注，谢谢！",
        drawer: false,
        catSelected: 'select',
        show: false,
        totalTax:0,
        total:0,
        info:'',
        finished: false,
        showDeliveryCharge: false,
        SERVER_URL: process.env.VUE_APP_DATA_SERVER_URL
    }),
    computed:{

                ...mapGetters(['page', 'customer', 'cats', 'theProducts', 'selectedProducts', 'getCatName', 'scbNo']),
    },
    methods:{
        ...mapMutations(['setPage', 'getProductTypeData', 'getProductData', 'getProductsInCat', 'ScbNoAddOne','addSelectedP']),
        ...mapActions(['getProductData','getProductsInCat']),
        removeProduct(index)
        {
            this.$store.state.selectedProducts.splice(index,1);
        },
        setShowImgDlg(p)
        {
            this.showImgDlgFolder = p.Folder;
            this.showImgDlgFileName = p.ImageFileName;
            this.showImgDlg=true;
        },
        productQty()
        {
            this.$store.commit('setCalc');
        },
        async order()
        {
            var discount = 0;
            if(this.$store.state.hasDiscount)
                discount = 0.03;
            var newOrder = {
                phone : this.customer.Phone,
                saleID : this.saleID,
                info : this.info,
                isDelivery : this.$store.state.isDelivery,
                discount : discount,
                total : this.thetotal()
            };
            await axios.post(this.SERVER_URL+'/order/new',newOrder).then(
                result => {
                    this.$store.state.newOrderID = result.data.ID;
                    this.selectedProducts.forEach(async p => {
                        var newItem = {
                            orderNo : result.data.ID,
                            productID : p.PID,
                            unitPrice : p.UnitPrice,
                            UnitWeight : p.Unit,
                            orderedQty : p.qty,
                            unit : p.Unit,
                            qty : p.qty,
                            info : p.Info,
                            wUnitType : p.WUnitType
                        };
                        await axios.post(this.SERVER_URL+'/orderitem/new',newItem).then(
                            async (result) => {
                                if(result.productID == p.PID)
                                {
                                    var pStock = {
                                        PID : p.PID,
                                        consumedQty : p.Unit * p.qty
                                    }
                                    await axios.post(this.SERVER_URL+'/product/stockqty',pStock);
                                }
                            }
                        );
                    })
                }
            );
            if(this.$store.state.newOrderID >= 0)
            {
                this.finished = true;
                router.push('Finish') ;
            }
        },
        thetotal() {
            return (parseFloat(this.$store.state.total) + parseFloat(this.$store.state.tax) - (this.$store.state.hasDiscount|0)*parseFloat(this.$store.state.discount)).toFixed(2);
        },
        thetax() {
            return this.$store.state.tax;
        },
        thediscount() {
            return this.$store.state.discount;
        },
        taxString(tax)
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
 
        async updateSelected(cat)
        {//alert(Object.keys(state));
            this.catSelected = cat.Name;
            await this.getProductsInCat(cat.ID);
            this.drawer = false;
        },
        getPage()
        {
            //alert(this.page);
            return this.page=='dash';
        },
        selectP(product)
        {
            if(this.showWarning)
                return;
            //product.qty = 1;
            var newP = {
                ...product,
                qty: 1
            };
            var pSelected = this.selectedProducts.find(function(e) {
                return (e.PID == product.PID)
            });
            if(!pSelected)
            {
                this.addSelectedP(newP);
                this.ScbNoAddOne();
            }
            this.$store.commit('setCalc');
            //$set(product, 'qty', 2);
            //Vue.set(this.selectedProducts,this.selectedProducts.length-1,copyProduct);
        },
    },
    beforeRouteLeave(to, from, next){
        if(this.finished)
            next();
        else
        {
            if(this.$store.state.customer.ID!=null){
                const answer = window.confirm('您购物车里的货品还未提交，确定要离开吗？')
                if(answer) {
                    next();
                } else {
                    next(false);
                }
            }
            next();
        }
     },

    async mounted(){
        if(this.$store.state.customer.ID==null)
        {
             router.push('/start') ;
        }
        //this.getProductTypeData();
        await this.$store.dispatch('getProductTypeData');
        await this.$store.dispatch('getProductData', 0);
        this.catSelected = this.getCatName(3);
        this.showWarning = !this.customer.city.area.SaleIsOn;
        axios.get(this.SERVER_URL+'/sale/last2sales/'+(this.customer.city.area.ID*2+1).toString()).then(
                async result => {
                    this.saleID = result.data[0].Id;
                    await axios.get(this.SERVER_URL+'/order/ps/'+this.customer.Phone+'/'+this.saleID).then(
                        result => {
                            if(result.data)
                            {
                                this.warning = "您本次团购的订单号是"+result.data.ID+",如需修改请微信或电话联系我们，7783502200，谢谢！";
                                this.showWarning = true;
                            }
                            else
                            {
                                this.showWarning = false;
                            }
                        }
                    )
                    axios.get(this.SERVER_URL+'/order/ps/'+this.customer.Phone+'/'+result.data[1].Id).then(
                        result => {
                            if(result.data)
                                this.$store.state.hasDiscount = true;
                            else
                                this.$store.state.hasDiscount = false;
                        },
                        error => {
                            console.log('Error: discount, '+error);
                        }
                    )
                },
                error => {
                    console.log('setCity:'+error);
                }
            )
        this.$store.dispatch('getProductsInCat',3); 
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