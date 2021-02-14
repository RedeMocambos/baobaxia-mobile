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
          placeholder="Mocambola"
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
          enabled="!clicked"
          dark
          block
          color="black"
          x-large
          @click="login"
        >
          <span v-if="!clicked">Entrar</span>
          <!-- TODO: trocar isso pelo loader que usamos no grid -->
          <v-icon v-if="clicked">fas fa-circle-notch fa-spin</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      user: '',
      password: '',
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
      repository: 'mocambos',
      clicked: false,
    }
  },
  created() {
    // TODO: get mucuas list
    // now only use mucua luizamahin

    // fetch("https://luizamahin.mocambos.net/api/mocambos/mucuas", {
    //   "headers": {
    //     "accept": "application/json, text/javascript, */*; q=0.01",
    //     "authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhYmVsb3RhaW5hQGx1aXphbWFoaW4ubW9jYW1ib3MubmV0Iiwib3JpZ19pYXQiOjE2MTMxNzIwMjgsInVzZXJfaWQiOjIwOCwiZW1haWwiOiJjYWJlbG90YWluYUBsdWl6YW1haGluLm1vY2FtYm9zLm5ldCIsImV4cCI6MTYxMzM4ODAyOH0.fqzivXPoTLUHghmtd17u6nzTXJNVy-5c3Tg-izM_FJo",
    //     "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "x-requested-with": "XMLHttpRequest"
    //   },
    //   "referrer": "https://luizamahin.mocambos.net/",
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": null,
    //   "method": "GET",
    //   "mode": "cors",
    //   "credentials": "include"
    // });
  },
  methods: {
    login() {
      this.clicked = true;
      if(typeof(cordova) == "object") {
        // You're on a mobile device
        cordova.plugin.http.post(`${this.mucua.urlBase}/api/${this.repository}/baobaxia/mocambola/login`, {
          "username": this.user,
          "mucua": this.mucua.value,
          "repository": this.repository,
          "password": this.password
        }, {
          // headers
        }, (response) => {
          const data = JSON.parse(response.data);
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          // TODO: add username, mucua, repository ...
          // go to user page? go home? ...
          this.$router.push('/grid'); // profile, mucua, ...
        }, (error) => {
          console.log(error);
        });
      } else {
        // We can call using xhr or another thing (for PWA for example)
      }
    }
  }
}
</script>