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
      <Login/>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login';

export default {
  name: 'App',

  components: {
    Login,
  },

  data: () => ({
    //
  }),
};
</script>
