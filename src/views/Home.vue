<template>
    <div>
    <v-list-item>
        <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title><h2>蔬菜水果</h2></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    <v-container class="my-5">
        <v-row class="mb-6" no-gutters>
            <v-col cols="6" sm="4" md="3" lg="2">
                <v-card class="ma-1">
                    <v-img
                    :src = "products[0].img"
                    height="200px"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-25px;right:-10px;">
                        <v-btn absolute color="indigo lighten-2 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1">
                        {{products[0].name}}
                    </v-card-title>
                    
                    <v-card-actions class="pa-0 pl-2">
                        <v-card-text class="grey--text subtitle-1 pa-0 pl-1">
                                ${{products[0].price}}/{{products[0].unit}} x {{products[0].qty}}{{products[0].unit}}, {{products[0].info}}
                        </v-card-text>
                        <div class="flex-grow-1"></div>

                        <v-btn
                            icon
                            @click="show1 = !show1"
                        >
                            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show1">
                        <v-card-text>
                            {{products[0].detail}}
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                    
                </v-card>
            </v-col>
            <v-col
                v-for="k in 12"
                :key="k"
                :cols="6"
                :sm="4"
                :md="3"
                :lg="2"
            >
                <v-card class="ma-1">
                    <v-img
                    :src = "products[1].img"
                    height="200px"
                    ></v-img>
                    
                    <v-card-text class="pa-0 ma-0" style="position:relative;top:-25px;right:-10px;">
                        <v-btn absolute color="indigo lighten-2 white--text" class="shite--text" fab medium right top>
                            <v-icon>shopping_cart</v-icon>
                        </v-btn>
                    </v-card-text>
                    <v-card-title  class="pa-0 pl-1">
                        {{products[1].name}}
                    </v-card-title>
                    
                    <v-card-actions class="pa-0 pl-2">
                        <v-card-text class="grey--text subtitle-1 pa-0 pl-1">
                                ${{products[1].price}}/{{products[1].unit}} x {{products[1].qty}}{{products[1].unit}}, {{products[1].info}}
                        </v-card-text>
                        <div class="flex-grow-1"></div>

                        <v-btn
                            icon
                            @click="show1 = !show1"
                        >
                            <v-icon>{{ show1 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show1">
                        <v-card-text>
                            {{products[1].detail}}
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                    
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    </div>
</template>

<script>
export default{
    data: () =>({
        show: false,
        show1: false,
        products:[
            {
                price: 8.89,
                img: require('@/assets/products/35.jpg'),
                name: "普通羊肉片",
                qty: 2,
                unit: "磅",
                info: "180克",
                detail: "适合爆炒或切小后火锅"
            },
            {
                price: 0.89,
                img: require('@/assets/products/DABAICAI.jpg'),
                name: "大白菜(邵菜)",
                qty: 2,
                unit: "磅",
                info: "",
                detail: "华人最爱 - 炒菜,涮锅,煲汤,万能菜"
            }
        ]
    })
}
</script>

<style scoped>
.v-card--reveal{
        align-items:center;
        bottom: 0;
        justify-content: center;
        opacity:0.5;
        position: absolute;
        width: 100%;
}
</style>