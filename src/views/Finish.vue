<template>
    <v-form ref="form">
        <v-container fluid>
            <v-card
                class="d-flex justify-center purple--text text--darken-1" flat tile color="rgb(255, 0, 0, 0)"
            >
            <p class="font-weight-bold mb-2 mt-4">下单成功，您的订单号是：{{this.$store.state.newOrderID}}</p>
            </v-card>
            
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field
                    :value = "customerPhone()"
                    label="联系电话"
                    class="w-8"
                    readonly={true}
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(0, 0, 0, 0)"
            >
                <v-text-field
                    :value="$store.state.customer.city.Name"
                    label="发货城市"
                    class="w-8"
                    readonly={true}
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field
                    :value="DeliveryType()"
                    label="送货方式"
                    class="w-8"
                    readonly={true}
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field   
                    :value="OrderInfo1()"
                    readonly={true}
                    class="w-8"
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field   
                    :value="OrderInfo2()"
                    readonly={true}
                    class="w-8"
                ></v-text-field>
            </v-card>
        </v-container>
    </v-form>
</template>
<script>
import {mapGetters} from 'vuex';
import util from '../components/shared/util.js';
import router from '../router';
//import Vue from 'vue'
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default{
    data: () => ({
        lCustomer:{},
        lCityNames:[],
        delieryTypes:["自取","送货上门"],
        delieryType:"",
        BtnGoNextText:"继续", 
        TFAddress:{Label:"街道名（号码隐藏，如需更改请与我们联系）"},
        rules: {
            required: value => !!value || '请填写',
            requireSelected: value => !!value || '请选择',
            counter: value => value.length <= 10 || 'Max 10 letters',
            phone: value => { 
                const pattern = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/
                return pattern.test(value) || '格式不对'
            }
        }
    }),
    computed:{
        ...mapGetters(['customer','cities'])
    },
    methods:{
        customerPhone()
        {
            return util.formatPhoneNumber(this.customer.Phone);
        },
        DeliveryType(){
            //var shortAddress = this.$store.state.customer.Address.substring(this.$store.state.customer.Address.indexOf(' ')+1);
            if(this.$store.state.isDelivery)
            {
                return '送货上门，地址：'+this.$store.state.customer.Address;
            }
            else 
            {
                return '自己取货'
            }
        },
        OrderInfo1()
        {
            var theTotal = parseFloat(this.$store.state.total) + parseFloat(this.$store.state.tax) - (this.$store.state.hasDiscount|0)*parseFloat(this.$store.state.discount);
            if(this.$store.state.deliveryChargeInfo!='')
            {
                theTotal += 5;
            }
            return '订单总价：$' + (theTotal+0.005).toFixed(2);
        },
        OrderInfo2()
        {
            return this.$store.state.customer.city.area.Info;
        }
    },
    mounted(){
        if(this.$store.state.customer.ID==null)
        {
             router.push('/') ;
        }
    }
}
</script>

<style scoped>
    .w-8{max-width:80%}
    .w-9{max-width:90%}
</style>