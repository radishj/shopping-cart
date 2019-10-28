<template>
    <v-form ref="form">
    <v-container fluid>
            <v-card
                class="d-flex justify-center" flat tile color="rgb(255, 0, 0, 0)"
            >
            <p class="font-weight-bold mb-2 mt-4">您的信息</p>
            </v-card>
            
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field
                    :value="customerPhone()"
                    label="联系电话"
                    class="w-8"
                    readonly=true
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field
                    :value=this.customer.city.Name
                    label="城市"
                    class="w-8"
                    readonly=true
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-select
                    v-model="delieryType"
                    :items="delieryTypes"
                    label="送货方式"
                    class="w-8"
                    :rules="[rules.requireSelected]"
                    v-on:change="changeDelivery"
                ></v-select>
            </v-card>
            <v-card v-if="$store.state.isDelivery"
                class="d-flex justify-left pl-12" flat tile color="rgb(255, 0, 0, 0)"
            >
                <v-text-field   
                    v-model="TFAddress.address"
                    :rules="[rules.required]"
                    ref="TFAddress"
                    :label=TFAddress.Label
                    class="w-8"
                    :readonly=TFAddress.Readonly
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-center pl-3" flat tile color="rgb(255, 0, 0, 0)"
            >
            <v-btn
                    color="success"
                    class="ma-2 white--text pl-0"
                    ref="BtnGoNext"
                    @click="goNext"
                >
                    {{BtnGoNextText}}
                    <v-icon right dark>mdi-page-next-outline </v-icon>
                </v-btn>
            </v-card>
        </v-container>
    </v-form>
</template>
<script>
//import Vue from 'vue'
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
import {mapGetters} from 'vuex';
import router from '../router';
import util from '../components/shared/util.js';
export default{
    data: () => ({
        delieryTypes:["自取","送货上门"],
        delieryType:"",
        BtnGoNextText:"继续", 
        TFAddress:{Label:"街道名（号码隐藏，如需更改请与我们联系）",Readonly:true,address:""},
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
        ...mapGetters(['customer']),
    },
    methods:{
        customerPhone()
        {
            return util.formatPhoneNumber(this.customer.Phone);
        },
        changeDelivery(a){
            if(a=='自取')
            {
                this.$store.state.isDelivery=false;
                this.TFAddress.Readonly = true;
                this.BtnGoNextText = '信息正确，去选商品'
            }
            else
            {
                this.$store.state.isDelivery=true;
                //this.$nextTick(function () {
                if(this.customer.Address=='' || this.customer.Address==false)
                {
                    //this.$refs.refAddress.value = '';
                    this.TFAddress.Label = '请输入送货地址（街道号码和街道名）';
                    this.TFAddress.Readonly = false;
                    this.BtnGoNextText = '提交我的信息; 去选商品'
                }
                else
                {
                    this.TFAddress.Label = '街道名（号码隐藏，如需更改请与我们联系）';
                    this.TFAddress.Readonly = true;
                    this.BtnGoNextText = '信息正确，去选商品'
                }
            }
        },
        async goNext(){
            if(this.$refs.form.validate()){
                if(this.BtnGoNextText == '信息正确，去选商品')
                {
                    router.push('Dashboard') ;
                }
                else if(this.BtnGoNextText == '提交我的信息; 去选商品')
                {
                    await this.$store.dispatch('setCustomerAddress', {phone:this.customer.Phone, address:this.TFAddress.address});
                    router.push('Dashboard') ;
                }
            }
        },
    },
    async mounted(){
        if(this.customer.ID==null)
        {
             router.push('/start') ;
        }
        this.TFAddress.address = this.customer.Address.trim();
        this.TFAddress.address = this.TFAddress.address.substring(this.TFAddress.address.indexOf(' ')+1);
        if(this.$store.state.customer.city.Name == 'Victoria')
        {
            this.delieryTypes = ["送货上门"]
        }
    },
}
</script>

<style scoped>
    .w-8{max-width:80%}
    .w-9{max-width:90%}
</style>