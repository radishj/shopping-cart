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
        page:'dash'
    },
    getters:{
        cats: state => {
            return state.categories;
        },
        curPage: state => {
            return state.page;
        },
        theProducts: state => {
            //alert(state.products.length);

            return state.products;
        },
    },
    mutations:{
        getProductTypeData: state => {//alert(state.categories.length);
            axios.get('http://localhost:3000/fresh/productTypes').then(
                result => {
                    //alert(result.data) 
                    state.categories = result.data;
                },
                error => {
                    alert(error)
                }
            )
        },
        getProductData: (state, data) => {//alert(state.products.length);
            state.allProducts = data;
            //console.log('Total length:'+state.allProducts.length);
        },
        getProductsInCat: (state, catID) => 
        {
            var products = state.allProducts.filter(product => (product.ProductTypeID == catID));
            products.forEach(e => {
                e.show = false;
              });
            state.products = products;
        },
        setPage(state, page){
            state.page = page;
        }
    },
    actions: {
        async getProductData(
            context, catID){console.log('aaa');
            await axios.get('http://localhost:3000/fresh/product').then(
                result => {
                    //alert(result.data) 
                    context.commit('getProductData', result.data);
                },
                error => {
                    alert(error)
                }
            )
            context.commit('getProductsInCat', catID);
        },
        getProductsInCat: (context, catID) => {console.log('data2');
            context.commit('getProductsInCat', catID);
        }
    }
})

