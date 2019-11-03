/* eslint-disable no-console */
require('dotenv').config();
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
function getDiscountTotal()
{
    return (parseFloat(store.state.total)*0.03).toFixed(2);
}
function getSProductsTotal()
{
    var total=0;
    store.state.selectedProducts.forEach(e => {
        total += e.UnitPrice * e.Unit * e.qty;
    })
    return parseFloat(total).toFixed(2);
}
function getSProductsTaxTotal()
{
    var taxTotal=0;
    const PST = 0.07;
    const GST = 0.05;
    store.state.selectedProducts.forEach(e => {//alert('aa:'+e.tax+';' +e.TAX&2/2+';'+e.TAX&1);
        var tax = (e.TAX&2)/2*PST + (e.TAX&1)*GST;//alert(tax);
        taxTotal += e.UnitPrice * tax * e.Unit * e.qty;
    })
    return parseFloat(taxTotal).toFixed(2);
}

export const store = new Vuex.Store({
    state:{
        deliveryChargeInfo: '',
        total:0,
        tax:0,
        hasDiscount:false,
        discount:0,
        page:'productPick',
        categories: [],
        selectedProducts: [],
        allProducts: [],
        products: [],
        unitTypes: [],
        cities: [],
        sales: [], //recent 2 sales, recent the first
        shoppingCartBadge:0,
        customer:{},
        newOrderID: -1,  //the order ID
        newOrderTime: '',
        SERVER_URL: process.env.VUE_APP_DATA_SERVER_URL,  //'http://localhost:3000' //
        toNext:false
    },
    getters:{
        page: state => {
            return state.page;
        },
        customer: state => {
            return state.customer;
        },
        cats: state => {
            return state.categories;
        },
        cities: state => {
            return state.cities;
        },
        getCatName: state => id => {
            return state.categories.find(cat => {return cat.ID==id;}).Name;
        },
        getUnitTypeName: state => id => {
            return state.unitTypes[id].Name;
        },
        scbNo: state => {
            return state.shoppingCartBadge;
        },
        selectedProducts: state => {
            return state.selectedProducts;
        },
        theProducts: state => {
            //alert(state.products.length);

            return state.products;
        },
        /*productQty: state => i => {
            //alert(state.products.length);

            return state.products[i].qty;
        },*/
    },
    mutations:{
        setCity(state, data){
            state.cities = data;
        },
        setCalc(state){
            state.total = getSProductsTotal();
            state.tax = getSProductsTaxTotal();
            state.discount = getDiscountTotal();
            var theTotal = (parseFloat(state.total) + parseFloat(state.tax) - (state.hasDiscount|0)*parseFloat(state.discount)).toFixed(2);
            if(state.customer.city.Name == 'Victoria')
            {
                if(theTotal<60)
                {
                    state.deliveryChargeInfo = '总价不足$60, 需收 $5 送货费'
                }
                else
                {
                    state.deliveryChargeInfo = '';
                }
            }
            else
            {
                if(theTotal<90)
                {
                    state.deliveryChargeInfo = '总价不足$90, 收$5送货费'
                }
                else
                {
                    state.deliveryChargeInfo = '';
                }
            }
        },
        setPage(state, page){
            if(page == "basket")
            {
                store.commit('setCalc');
            }
            state.page = page;
        },
        setCustomer(state, data){
            state.customer = data;
        },
        setCustomerPhone(state, phone){
            state.customer.Phone = phone;
        },
        setUnitTypeData(state, data){
            state.unitTypes = data;
        },
        setProductTypeData(state, data){
            state.categories = data;
        },
        setProductQty(state, data){
            state.products[data.i].qty = data.q;
        },
        setProductData: (state, data) => {
            data.forEach(p => {
                var newP = {
                    ...p
                }
                state.allProducts.push(newP);
            })
            //console.log('Total length:'+state.allProducts.length);
        },
        getProductsInCat: (state, catID) => 
        {
            state.products.length = 0;
            var products = state.allProducts.filter(product => (product.PType == catID));
            products.forEach(e => {
                var newP = {
                    ...e,
                    qty: 1,
                    showInfo : false,
                }
                state.products.push(newP);
              });
        },
        addSelectedP: (state, p) =>
        {
            state.selectedProducts.push(p);
        },
        ScbNoAddOne(state){
            state.shoppingCartBadge++;
        },
        SetCustomer(state, data){
            state.customer = data;
        }
    },
    actions: {
        async setCityData(context){
            await axios.get(this.state.SERVER_URL+'/city').then(
                result => {
                    //alert(result.data) 
                    context.commit('setCity', result.data);
                },
                error => {
                    console.log('setCity:'+error)
                }
            )
        },
        async insertCustomer(context, customer){
            var city = this.state.cities.find(city => {
                return customer.cityName == city.Name;
            })
            return new Promise((resolve, reject) => {
                axios.post(this.state.SERVER_URL+'/customer/new',{phone:customer.phone,address:customer.address,cityID:city.ID}).then(
                result => {
                    //alert(result.data);
                    resolve(result);
                    /*if(result.data.toString().startsWith('Error'))
                        context.commit('setCustomer', false);
                    }
                    else
                    {
                        console.log('set address success');
                    }*/
                },
                error => {
                     reject(error);
                })
            })
        },
        async setCustomerAddress(context, customer){
            return new Promise((resolve, reject) => {
                axios.post(this.state.SERVER_URL+'/customer/',{phone:customer.phone,address:customer.address}).then(
                result => {
                    //alert(result.data);
                    resolve(result);
                    /*if(result.data.toString().startsWith('Error'))
                    {
                        context.commit('setCustomer', false);
                    }
                    else
                    {
                        console.log('set address success');
                    }*/
                },
                error => {
                    context.commit('setCustomer', false);
                    reject(error);
                })
            })
        },
        async getCustomerData(context, phone){
            await axios.get(this.state.SERVER_URL+'/customer/'+phone).then(
                result => {
                    //alert(result.data) 
                    if(result.data.toString().startsWith('Error'))
                    {
                        context.commit('setCustomer', false);
                    }
                    else
                    {
                        context.commit('setCustomer', result.data);
                    }
                },
                error => {
                    context.commit('setCustomer', false);
                    alert('customer:'+error);
                }
            )
        },
        async getProductData(context, catID){
            await axios.get(this.state.SERVER_URL+'/product/').then(
                result => {
                    //alert(result.data) 
                    context.commit('setProductData', result.data);
                },
                error => {
                    alert('product:'+error)
                }
            )
            context.commit('getProductsInCat', catID);
        },
        async getProductTypeData(context){//alert(state.categories.length);
            //debugger;
            await axios.get(this.state.SERVER_URL+'/producttype/').then(
                result => {
                    //alert(result.data) 
                    context.commit('setProductTypeData', result.data);
                },
                error => {
                    alert('ptype:'+error.data)
                }
            )
        },
        async getUnitTypeData(context){//alert(state.unitTypes.length);
            await axios.get(this.state.SERVER_URL+'/unittype').then(
                result => {
                    //alert(result.data) 
                    context.commit('SetCustomer', result.data);
                },
                error => {
                    alert('utype:'+error)
                }
            )
        },
        getProductsInCat: (context, catID) => {
            context.commit('getProductsInCat', catID);
        },
        async GetCustomerByPhone(context, phone){
            await axios.get(this.state.SERVER_URL+'/customer/'+phone).then(
                result => {
                    //alert(result.data) 
                    context.commit('setProductData', result.data);
                },
                error => {
                    alert('get customer error:'+error)
                }
            )
        },
    }
})

