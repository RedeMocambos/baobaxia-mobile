<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      Baobáxia | Rede Mocambos
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="mt-10">
      <!-- <Login/> -->
      <router-view class="view"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login';
import Grid from './components/Grid';

export default {
  name: 'App',

  components: {
    Login,
    Grid,
  },

  data: () => ({
    //
  }),
};
</script>
