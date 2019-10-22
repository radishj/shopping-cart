/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        page:'productPick',
        categories: [],
        allProducts: [],
        products: [],
        unitTypes: [],
        cities: [],
        shoppingCartBadge:0,
        customer:{}
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
            return state.categories[id].Name;
        },
        getUnitTypeName: state => id => {
            return state.unitTypes[id].Name;
        },
        scbNo: state => {
            return state.shoppingCartBadge;
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
        setPage(state, page){
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
            state.allProducts = data;
            //console.log('Total length:'+state.allProducts.length);
        },
        getProductsInCat: (state, catID) => 
        {
            var products = state.allProducts.filter(product => (product.ProductTypeID == catID));
            products.forEach(e => {
                e.showInfo = false;
                e.qty = 1;
              });
            
            state.products = products;
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
            await axios.get('http://localhost:3000/city').then(
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
                axios.post('http://localhost:3000/customer/new',{phone:customer.phone,address:customer.address,cityID:city.ID}).then(
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
                axios.post('http://localhost:3000/customer/',{phone:customer.phone,address:customer.address}).then(
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
            await axios.get('http://localhost:3000/customer/'+phone).then(
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
            await axios.get('http://localhost:3000/product/').then(
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
            await axios.get('http://localhost:3000/producttype/').then(
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
            await axios.get('http://localhost:3000/unittype').then(
                result => {
                    //alert(result.data) 
                    context.commit('SetCustomer', result.data);
                },
                error => {
                    alert('utype:'+error)
                }
            )
        },
        getProductsInCat: (context, catID) => {console.log('data2');
            context.commit('getProductsInCat', catID);
        },
        async GetCustomerByPhone(context, phone){
            await axios.get('http://localhost:3000/customer/'+phone).then(
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

