<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <img width="250" class="mb-10" :src="require('../assets/logo.png')" /><br>
        <p class="text-left">
          <strong>Baobaxia</strong><br>
          <span style="color:grey">Vamos fazer um mundo mais do nosso jeito</span>
        </p>
        <v-text-field
          v-model="user"
          placeholder="Usuário"
          outlined
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          placeholder="Senha"
          outlined
          type="password"
        >
        </v-text-field>
        <v-select
          outlined
          :items="mucuas"
          v-model="mucua"
        ></v-select>
        <v-btn 
          dark
          block
          color="black"
          x-large
          @click="login"
        >
          Entrar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      user: 'cabelotaina',
      password: 'mauA.,59',
      mucuas: [
        {
          text: 'Luiza Mahin',
          value: 'luizamahin',
          urlBase: 'https://luizamahin.mocambos.net'
        }
      ],
      mucua: {
        text: 'Luiza Mahin',
        value: 'luizamahin',
        urlBase: 'https://luizamahin.mocambos.net'
      },
      repository: 'mocambos'
    }
  },
  methods: {
    login() {
      if(typeof(cordova) == "object") {
        // You're on a mobile device
        cordova.plugin.http.post(`${this.mucua.urlBase}/api/${this.repository}/baobaxia/mocambola/login`, {
          "username": this.user,
          "mucua": this.mucua.value,
          "repository": this.repository,
          "password": this.password
        }, {
          // headers
        }, function(response) {
          const data = JSON.parse(response.data);
          localStorage.setItem('token', data.toke);
          localStorage.setItem('username', data.username);
          // go to user page? go home? ...
          this.$router.push('/grid'); // profile, mucua, ...
        }, function(error) {
          console.log(error);
        });
      } else {
        // We can call using xhr or another thing (for PWA for example)
      }
    }
  }
}
</script>