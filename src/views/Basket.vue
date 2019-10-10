<template>
    <v-container>
        <h2 class="display-2 mb-4">Basket</h2>

        <v-list>
            <template v-for="(product, index) in products">
                <v-list-item :key="product.id" avatar>
                    <v-list-item-avatar>
                        <img :src="product.img">
                    </v-list-item-avatar>

                    <v-list-item>
                        {{product.name1}}
                    </v-list-item>

                    <v-list-item>
                        {{product.price}}$
                    </v-list-item>

                    <v-list-item-action>
                        <v-text-field label="Quantity" reverse v-model="product.qty"></v-text-field>
                    </v-list-item-action>

                    <v-list-item>
                        {{product.price * product.qty}}$
                    </v-list-item>

                    <v-list-item-action>
                        <v-btn icon ripple>
                            <v-icon color="red lighten-1">delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
                <v-divider v-if="index + 1 < products.length" :key="index"></v-divider>
            </template>
        </v-list>

        <v-container>
            <v-btn color="success" larger style="float: right;">Go to payment</v-btn>
        </v-container>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        products: [
            {
                id: 0,
                price: 8.89,
                img: require('@/assets/products/35.jpg'),
                name1: "普通羊肉片",
                qty: 2,
                unit: "磅",
                info: "180克",
                detail: "适合爆炒或切小后火锅"
            },
            {
                id: 1,
                price: 0.89,
                img: require('@/assets/products/DABAICAI.jpg'),
                name1: "大白菜(邵菜)",
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

</style>