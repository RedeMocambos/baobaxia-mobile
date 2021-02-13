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
        <video controls poster="https://static.dicionariodesimbolos.com.br/upload/5c/57/sankofa-significado-desse-simbolo-africano-1_xl.jpeg">
            <source :src="`${mucua.urlBase}${media.url}`" type="video/mp4">
            A tag de video do html não é suportada. Por favor baixe o vídeo. <a :href="`${mucua.urlBase}${media.url}`">aqui</a>.
        </video>
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

      let grid = setInterval(function() {
        if(cordova.plugin.http) {
          const urlBase = 'https://luizamahin.mocambos.net';
          const repository = 'mocambos';
          cordova.plugin.http.get(`${urlBase}/api/${repository}/luizamahin/bbx/search/`, {}, {}, 
            (response) => {
              const medias = JSON.parse(response.data);
              console.log(medias)
              
              this.medias = medias
              
              // go to user page? go home? ...
            }, (error) => {
              console.log(error)
            });
          clearInterval(grid)
        }
      }.bind(this), 500)
    }
  }
}
</script>