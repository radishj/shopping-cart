/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        categories: [],
        allProducts: [],
        products: [],
        unitTypes: [],
        page:'productPick',
        shoppingCartBadge:0
    },
    getters:{
        cats: state => {
            return state.categories;
        },
        getCatName: state => id => {
            return state.categories[id].Name;
        },
        getUnitTypeName: state => id => {
            return state.unitTypes[id].Name;
        },
        curPage: state => {
            return state.page;
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
                e.show = false;
                e.qty = 1;
              });
            
            state.products = products;
        },
        setPage(state, page){
            state.page = page;
        },
        ScbNoAddOne(state){
            state.shoppingCartBadge++;
        }
    },
    actions: {
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
                    context.commit('setUnitTypeData', result.data);
                },
                error => {
                    alert('utype:'+error)
                }
            )
        },
        getProductsInCat: (context, catID) => {console.log('data2');
            context.commit('getProductsInCat', catID);
        }
    }
})

