<template>
<v-form ref="form">
   <v-container fluid>
        <v-row justify="space-around">
        <v-col cols="10">
            <v-img src="http://mediavictoria.com:60/image/system/Junzhituangou1.jpg" width="100%"></v-img>
            <div class="subheading pt-8"><b>请输入您的联系电话号码:</b></div>
        </v-col>
        </v-row>
        <v-card
            class="d-flex justify-center"
            flat
            tile
             color="rgb(255, 0, 0, 0)"
        >
            <v-text-field
                v-model="phone"
                prepend-icon="mdi-phone-forward-outline"
                :rules="[rules.required, rules.phone]"
                label="格式 123-456-7890"
                class="w-5"
            ></v-text-field>
            <v-btn
                color="success"
                class="ma-2 white--text"
                @click="goNext"
            >
                继续 
                <v-icon right dark>mdi-page-next-outline </v-icon>
            </v-btn>
        </v-card>
    </v-container>
  </v-form>
</template>
<script>
//import Vue from 'vue'
import axios from 'axios';
import router from '../router';
import {mapGetters, mapMutations} from 'vuex';
export default{
    data: () => ({
        phone: "",
        rules: {
            required: value => !!value || '请填写',
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
        ...mapMutations(['reset', 'setCustomer', 'setCustomerPhone']),
        async goNext(){
            this.$store.state.newOrderID = -1;
            this.phone = this.phone.replace(/\D/g,'');
            this.setCustomerPhone(this.phone);
            if(this.$refs.form.validate()){
                await this.$store.dispatch('getCustomerData', this.phone);
                if(this.customer)
                {
                    await axios.get(process.env.VUE_APP_DATA_SERVER_URL+'/sale/last2sales/'+(this.customer.city.area.ID*2+1).toString()).then(
                        async result => {
                            this.$store.state.sales = result.data;
                            this.saleID = result.data[0].Id;
                            var lastSaleID = result.data[1].Id;
                            await axios.get(process.env.VUE_APP_DATA_SERVER_URL+'/order/ps/'+this.customer.Phone+'/'+this.saleID).then(
                                result => {
                                    if(result.data)
                                    {
                                        this.$store.state.newOrderID = result.data.ID;
                                        var time = new Date(result.data.UpdateTime);
                                        time.setHours(time.getHours() - 8); //Not sure why it got 8 hours extra.
                                        this.$store.state.newOrderTime = time.toUTCString();
                                        this.$store.state.isDelivery = result.data.IsDelivery;
                                        if(result.data.DiscountPercentage > 0.001)
                                            this.$store.state.hasDiscount = true;
                                        this.$store.state.toNext = true;
                                    }
                                    else
                                    {
                                        axios.get(process.env.VUE_APP_DATA_SERVER_URL+'/order/ps/'+this.customer.Phone+'/'+lastSaleID).then(
                                            result => {
                                                if(result.data)//aa
                                                {
                                                    this.$store.state.hasDiscount = true;
                                                }
                                            }
                                        )
                                    }
                                }
                            )
                        }
                    )
                    if(this.$store.state.newOrderID >= 0)
                    {
                       router.push('Dashboard') ;
                    }
                    else{
                       router.push('OldCustomer') ;
                    }
                }
                else
                {
                    await this.setCustomer({Phone:this.phone, city:{Name:''}});

                    router.push('NewCustomer') ;
                }
            }
        }
    },
    async mounted(){
        this.reset();
        await this.$store.dispatch('setCityData');
    }
}
</script>

<style scoped>
    .w-5{max-width:50%}
</style>