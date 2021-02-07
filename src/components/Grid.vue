<template>
  <v-container>
    <v-row
      v-for="media in medias"
      :key="media.uuid"
    >
      <v-col
        class="d-flex child-flex"
        cols="12"
      >
        <video controls :src="`${mucua.urlBase}${media.url}`"></video>
      </v-col>
      <v-col>
        <p><strong>{{media.name}}</strong></p>
        <p style="color: grey">{{media.note}}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      mucua: {
        urlBase: 'https://luizamahin.mocambos.net/'
      },
      medias: null
    }
  },
  mounted() {
    if(typeof(cordova) == "object") {
      // get via route or store or via 
      const urlBase = 'https://luizamahin.mocambos.net';
      const repository = 'mocambos';
      cordova.plugin.http.get(`${urlBase}/api/${repository}/luizamahin/bbx/search/`, {
        // "username": this.user,
        // "mucua": this.mucua.value,
        // "repository": this.repository,
        // "password": this.password
      }, {
        // headers
      }, (response) => {
        const medias = JSON.parse(response.data);
        console.log(medias)
        this.medias = medias
        // go to user page? go home? ...
      }, (error) => {
        console.log(error);
      });
    }
  }
}
</script>