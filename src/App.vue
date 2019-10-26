<template>
<div id="app">
  <v-app>
    <Navigation/>
    <v-content>
      <router-view/>
    </v-content>

    <Footer />

  </v-app>
</div>
</template>

<script>
import Navigation from './components/shared/navigation'
import Footer from './components/shared/footer'

export default {
  name: 'App',
  components: { Navigation, Footer },
  data: () => ({
  }),
}
</script>
