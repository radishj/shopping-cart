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
                    v-model = "lCustomer.Phone"
                    label="联系电话"
                    class="w-8"
                    readonly={true}
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-left pl-12" flat tile color="rgb(0, 0, 0, 0)"
            >
                <v-select
                    v-model="lCustomer.city.Name"
                    :items="lCityNames"
                    label="发货城市"
                    class="w-8"
                    :rules="[rules.requireSelected]"
                    v-on:change="changeCity"
                ></v-select>
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
                    v-model="lCustomer.Address"
                    :rules="[rules.required]"
                    ref="TFAddress"
                    :label=TFAddress.Label
                    class="w-8"
                ></v-text-field>
            </v-card>
            <v-card
                class="d-flex justify-center pl-3" flat tile color="rgb(255, 0, 0, 0)"
            >
            <v-btn
                    color="success"
                    class="ma-2 white--text pl-3 pr-5 pt-2 pb-5"
                    ref="BtnGoNext"
                    @click="goNext"
                >
                    提交我的信息; 去选商品
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
        ...mapGetters(['customer','cities']),
    },
    methods:{
        changeCity(city){
            if(city == 'Victoria')
            {
                this.delieryTypes = ["送货上门"];
            }
            else
            {
                this.delieryTypes = ["自取","送货上门"];
            }
        },
        changeDelivery(a){
            if(a=='自取')
            {
                this.$store.state.isDelivery=false;
                this.BtnGoNextText = '信息正确，去选商品'
            }
            else
            {
                this.$store.state.isDelivery=true;
                //this.$nextTick(function () {
                this.TFAddress.Label = '请输入送货地址（街道号码和街道名）';
                this.BtnGoNextText = '提交我的信息，去选商品'
            }
        },
        async goNext(){
            if(this.$refs.form.validate()){
                await this.$store.dispatch('insertCustomer', {phone:this.lCustomer.Phone, address:this.lCustomer.Address,cityName:this.lCustomer.city.Name});
                await this.$store.dispatch('getCustomerData', this.lCustomer.Phone);
                this.$store.state.toNext=true;
                router.push('Dashboard') ;
            }
        },
        formatPhoneNumber(str){
            //Filter only numbers from the input
            let cleaned = ('' + str).replace(/\D/g, '');
            //Check if the input is of correct length
            let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
            if (match) {
                return '(' + match[1] + ') ' + match[2] + '-' + match[3]
            }
            else
                return null;
        }
    },
    async mounted(){
        this.lCustomer = {Phone:this.customer.Phone, Address:'', city:{Name:'',ID:-1,areaID:-1}};
        this.cities.forEach(city => {
            this.lCityNames.push(city.Name);
        });
    },
}
</script>

<style scoped>
    .w-8{max-width:80%}
    .w-9{max-width:90%}
</style>