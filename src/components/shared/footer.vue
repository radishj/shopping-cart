<template>
    <v-footer dark padless>
      <v-card text tile class="indigo lighten-1 white--text text-center flex">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3 white--text" dark icon>
            <v-icon size="24px">{{icon}}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text>
          君知易购团购车
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text text-center">
          &copy;2016 - <strong>Imprint Culture & Media Inc.</strong>
        </v-card-text>
      </v-card>

    </v-footer>
</template>

<script>
export default {
    data: () => ({
        icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
        ]
    })
}
</script>

<style>

</style>