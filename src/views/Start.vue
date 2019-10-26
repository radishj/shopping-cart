<template>
<v-form ref="form">
   <v-container fluid>
        <v-row justify="space-around">
        <v-col cols="10">
            <v-img src="http://mediavictoria.com/image/system/Junzhituangou1.jpg" width="100%"></v-img>
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
        ...mapMutations(['setCustomer','setCustomerPhone']),
        async goNext(){
            this.setCustomerPhone(this.phone);
            if(this.$refs.form.validate()){
                await this.$store.dispatch('getCustomerData', this.phone);
                if(this.customer)
                {
                    router.push('OldCustomer') ;
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
        if(this.customer)
        {
            this.phone = this.customer.phone;
            //city=this.customer.
        }
        await this.$store.dispatch('setCityData');
    }
}
</script>

<style scoped>
    .w-5{max-width:50%}
</style>