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
    <v-card
      class="d-flex flex-wrap"
      color="grey lighten-2"
      flat
      tile
    >
      <v-card
        v-for="n in 20"
        :key="n"
        class="pa-2"
        outlined
        tile
      >
       <v-card
            class="mx-auto"
            max-width="300"
        >
            <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            ></v-img>

            <v-card-title>
            <div>Top western road trips</div>
            <span class="grey--text subtitle-1">1,000 miles of wonder 1,000 miles of wonder</span>
            </v-card-title>

            <v-card-actions>
                <v-btn text>Share</v-btn>

                <v-btn
                    text
                    color="purple"
                >
                    Explore
                </v-btn>

                <div class="flex-grow-1"></div>

                <v-btn
                    icon
                    @click="show = !show"
                >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
            <div v-show="show">
                <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
                </v-card-text>
            </div>
            </v-expand-transition>
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default{
    data: () =>({
        show: false,
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