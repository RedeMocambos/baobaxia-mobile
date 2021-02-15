<template>
  <v-container>

    <v-row align="center" justify="center" v-if="loading">
      <v-col align="center" justify="center">
        <!-- trazer esta imagem para o projeto na pasta assets -->
        <img 
          src="https://baobaxia.mocambos.net/images/buscando.gif" 
          alt="
            Imagem gif de carregamento, com uma mucua, semente de 
            baoba, girando, aguarde enquanto carregamos os conteudos,
            para carregar mais role ate o final da tela.
          "
        >
      </v-col>
    </v-row>
    <v-row
      v-for="media in medias"
      :key="media.uuid"
    >
      <v-col
        class="d-flex child-flex"
        cols="12"
      >
        <!-- <video playsinline height="180" controls poster="https://static.dicionariodesimbolos.com.br/upload/5c/57/sankofa-significado-desse-simbolo-africano-1_xl.jpeg"> -->
        <video height="180">
            <source :src="`${mucua.urlBase}${media.url}`" type='video/mp4"' crossorigin="anonymous">
            A tag de video do html não é suportada. Por favor baixe o vídeo. <a :href="`${mucua.urlBase}${media.url}`">aqui</a>.
        </video>
        <canvas id="my-canvas" width="480" height="270"></canvas>
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
      medias: [],
      loading: true,
      mediaCounter: 2
    }
  },
  methods: {
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.loadgrid()
          console.log('Vamos carregar mais conteudos...')
        }
      };
    },
    loadgrid() {
      let grid = setInterval(function() {
        // podemos levar essa chamada para algo como um service desacoplando das páginas
        if(typeof(cordova) == "object") {
          const urlBase = 'https://luizamahin.mocambos.net';
          const repository = 'mocambos';
          cordova.plugin.http.get(`${urlBase}/api/${repository}/luizamahin/bbx/search/limit/${this.mediaCounter}/2`, {}, {}, 
            (response) => {
              const medias = JSON.parse(response.data);

              for (var i = 0 ; i < medias.length; i++) {
                this.medias.push(medias[i])
              }
              this.loading = false
              // quando ocorrer a proxima chamada acrescido de mais duas medias
              this.mediaCounter = this.mediaCounter + 2
            }, (error) => {
              console.log(error)
              this.loading = false
            });
          clearInterval(grid)
        }
      }.bind(this), 500)
    }
  },
  mounted() {
    this.scroll();
    // isso aqui nao faz sentido pode estar montado e o cordova nao terminou de carregar...
    try {
      this.loadgrid()
    } catch(mo) {
      try {
        this.loadgrid()
      } catch (error) {
        alert('Tivemos problemas para carregar os conteúdos...')
      }
    }
  }
}
</script>