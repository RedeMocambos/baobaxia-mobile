<template>
  <v-app>
    <!-- trazer esta imagem para a pasta assets -->
    <v-app-bar
      app
      color="black"
      dark
      src="https://baobaxia.mocambos.net/images/login-home-header.png"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="deep-orange darken-2"></v-app-bar-nav-icon>

      <!-- por hora vou remove ( | Rede Mocambos) e deixar apenas baobaxia depois vou trocar pelo logo SVG -->
      <v-toolbar-title>Baobáxia</v-toolbar-title>
      
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="white"  @click.stop="search = !search">mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon to="/login">
        <v-icon color="white">mdi-login</v-icon>
      </v-btn>
    </v-app-bar>


    <!-- vamos colocar uma lista das mucuas para que o mocambola possa mudar a mucua atual -->

    <v-navigation-drawer
      app
      bottom
      v-model="search"
      temporary
    >
      <v-row align="center" justify="center">
        <!-- BUG: não sei porque mas não esta abrindo mais apenas fica escura a tela -->
        <v-col>
          <h1>Filtro de medias</h1>
          <p>Em construção</p>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <!-- algumas coisas que podemos modificar no menu -->
    <!-- podemos colocar uma imagem de fundo: src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" -->
    <!-- podemos definir se o ocupa a tela todo: width="100%" -->

    <v-navigation-drawer
      app
      bottom
      v-model="mucuasList"
      temporary
    >
      <v-row>
        <v-col>
          <v-list>
            <v-list-item-group
              v-model="mucuasGroup"
              active-class="blue lighten-4"
            >
              <span v-for="mucua in mucuas" :key="mucua.name">
                <v-list-item @click="changeMucua(mucua)">
                  <v-list-item-title>{{ mucua.description }}</v-list-item-title>
                </v-list-item>
              </span>

                <!-- <v-list-item>
                  <v-list-item-title>Abdias (exemplo)</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Luiza Mahin (exemplo)</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>... (exemplo)</v-list-item-title>
                </v-list-item> -->
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-navigation-drawer>

    <!-- ´menu lateral - abre quando clica no hamburger-->
    <v-navigation-drawer
      app
      v-model="drawer"
      temporary
    >
      <v-list v-if="username">
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://baobaxia.mocambos.net/images/logo.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              <!-- isso pode dar pau melhor colocar dentro de um try catch em uma função -->
              {{username.split('@')[0]}}
            </v-list-item-title>
            <v-list-item-subtitle>{{username}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >

        <v-list-item two-line>
          <v-list-item-content @click.stop="mucuasList = !mucuasList; drawer = !drawer">
            <v-list-item-subtitle>Você esta na mucua:</v-list-item-subtitle>
            <v-list-item-title class="mb-2 headline" >
              Luiza Mahin
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-group
          v-model="group"
          active-class="blue lighten-4"
        >
          <v-list-item to="/">
            <v-list-item-title>Midias da Mucua</v-list-item-title>
          </v-list-item>

          <!-- TODO: temos que pegar o que a camera retorna e enviar para uma página onde o usuário deve colocar tags... texto etc -->
          <!-- antes de enviar para a mucua -->

          <v-list-item to="/map">
            <v-list-item-title>Mapa da Rede</v-list-item-title>
          </v-list-item>

          <v-list-item @click="camera()">
            <v-list-item-title>Camera</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Gravar Audio</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Criar um novo texto</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Rádio Mocambos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>TV Tainã</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Notícias da rede</v-list-item-title>
          </v-list-item>

          <v-list-item to="/video">
            <v-list-item-title>Teste de video</v-list-item-title>
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
    search: false,
    mucuasList: false,
    mucuasGroup: null,
    mucuas: [],
    username: localStorage.getItem('username'),
  }),

  mounted() {
      let mucuas = setInterval(function() {
        if(typeof(cordova) == "object") {
          const urlBase = 'https://luizamahin.mocambos.net';
          cordova.plugin.http.get(`${urlBase}/api/mocambos/mucuas`, {}, {},
            (response) => {
              this.mucuas = JSON.parse(response.data)
              console.log(this.mucuas)
            }, (error) => {
              console.log(error)
            });
          clearInterval(mucuas)
        }
      }.bind(this), 500)
  },

  watch: {
    group () {
      this.drawer = false
    },
    mucuasGroup () {
      this.mucuasList = false
    },
  },

  methods: {
    changeMucua(mucua) {
      console.log(mucua)
    },
    cameraSuccess() {
      console.log('sucesso')
    },
    cameraError() {
      console.log('error')
    },
    camera() {
      // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/#module_camera.CameraOptions
      var cameraOptions = {};
      navigator.camera.getPicture(this.cameraSuccess, this.cameraError, cameraOptions)
    }
  }
};
</script>
