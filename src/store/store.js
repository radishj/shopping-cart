import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        categories: [],
        page:'dash'
    },
    getters:{
        cats: state => {
            return state.categories;
        },
        curPage: state => {
            return state.page;
        }
    },
    mutations:{
        getCats: state => {//alert(state.categories.length);
            if(state.categories.length==0)
            {
                axios.get('http://localhost:3000/fresh/productTypes').then(
                    result => {
                        //alert(result.data) 
                        state.categories = result.data;
                    },
                    error => {
                        alert(error)
                    }
                )
            }
        },
        setPage(state, page){
            state.page = page;
        }
    }
})

