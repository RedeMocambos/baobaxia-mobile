<template>
  <v-app>
    <v-app-bar
      app
      color="black"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>

      <v-toolbar-title>Baobáxia | Rede Mocambos</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="white">mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- algumas coisas que podemos modificar no menu -->

    <!-- podemos colocar uma imagem de fundo: src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->
    <!-- podemos definir se o ocupa a tela todo: width="100%" -->

    <v-navigation-drawer
      app
      absolute
      v-model="drawer"
      temporary
    >
      <v-list v-if="username">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{username}}
            </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Mocambola</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Camera</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Audio</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Texto</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Rádio Mocambos</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main class="mt-10">
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
    drawer: false,
    group: null,
    username: null,
  }),

  created() {
    return { username: localStorage.getItem('username') };
  },

  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>
