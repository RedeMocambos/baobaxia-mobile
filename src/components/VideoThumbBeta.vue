<template>
  <!-- TODO: fazer isso aqui virar um componente e usar no grid -->
  <v-container>
    <!-- https://luizamahin.mocambos.net/media/mocambos/luizamahin/video/20/06/10/literatura-nicolas-pre-modernismo-8b2e8.m4v -->
    <video id="my-video" autoplay muted controls="true" width="350" height="202" crossorigin="anonymous" @ready="estouPronto()">
      <!-- <source src="http://jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm" type="video/webm"> -->
      <!-- <source src="http://jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v" type="video/mp4"> -->
      <source 
        src="https://luizamahin.mocambos.net/media/mocambos/luizamahin/video/20/06/10/literatura-nicolas-pre-modernismo-8b2e8.m4v"
        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
      >
    </video>

    <canvas id="my-canvas" width="350" height="202"></canvas>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.doLoad();
  },
  methods: {
    timerCallback: function() {
      this.computeFrame();
      var self = this;
      this.video.pause();
      setTimeout(function () {
        self.timerCallback();
      }, 16); // roughly 60 frames per second
    },

    doLoad: function() {
      this.video = document.getElementById("my-video");
      this.video.currentTime = 120;
      this.c1 = document.getElementById("my-canvas");
      this.ctx1 = this.c1.getContext("2d");
      var img2 = new Image();
      img2.src = 'https://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png';
      var self = this;

      this.video.addEventListener("timeupdate", function() {
        self.width = self.video.width;
        self.height = self.video.height;
        self.computeFrame();
        // posso usar isso se quero um preview com imagens do video
        // self.timerCallback();
        
        // no futuro podemos colocar um logo da rede mocambos nos videos
        // self.ctx1.drawImage(img2,10,10);

        // icone de play
        // http://jsfiddle.net/32ECU/

        // Draw a circle
        self.ctx1.beginPath();
        self.ctx1.arc(w/2, h/2, Math.min(60, w/2-4, h/2-4), 0, 2 * Math.PI, false);
        self.ctx1.fillStyle = 'rgba(0,180,0,0.5)';
        self.ctx1.fill();
        self.ctx1.lineWidth = 1;
        self.ctx1.strokeStyle = 'red';
        self.ctx1.stroke();
        self.ctx1.closePath();
        // Draw a triangle in it
        self.ctx1.strokeStyle = 'white';
        self.ctx1.beginPath();
        self.ctx1.moveTo(w/3, h/3);
        self.ctx1.lineTo(w/3, h-h/3);
        self.ctx1.lineTo(w-w/4, h/2);
        self.ctx1.lineTo(w/3, h/3);
        self.ctx1.fillStyle = 'white';
        self.ctx1.fill();
        
      }, false);
    },

    computeFrame: function() {
      this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
      var frame = this.ctx1.getImageData(0,0, this.width, this.height);

      // Isso troca a cor para preto e branco - fica legal
      // var l = frame.data.length / 4;

      // for (var i = 0; i < l; i++) {
      //   var grey = (frame.data[i * 4 + 0] + frame.data[i * 4 + 1] + frame.data[i * 4 + 2]) / 3;

      //   frame.data[i * 4 + 0] = grey;
      //   frame.data[i * 4 + 1] = grey;
      //   frame.data[i * 4 + 2] = grey;
      // }
      this.ctx1.putImageData(frame, 0, 0);

      return;
    },
  }
}
</script>
<style scoped>
#my-video {
  display: none;
}
</style>