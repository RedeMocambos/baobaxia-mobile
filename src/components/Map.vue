<template>
  <div class="map-mocambos">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @ready="doSomethingOnReady()"
      ref="myMap"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <!-- <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker> -->
      <!-- <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker> -->
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { Icon } from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from "vue2-leaflet";
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      zoom: 2,
      center: latLng(-23, -46),
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png',
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      subdomains: 'abcd',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        minZoom: 0,
        maxZoom: 20,
      },
      showMap: true
    };
  },
  methods: {
    doSomethingOnReady() {

      // http://bl.ocks.org/anonymous/raw/e872821c8d250450273c88cce1126a69/map.geojson
      // https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson

      let quilombos = setInterval(function() {
        if(typeof(cordova) == "object") {
          // TODO: pegar o geojson local
          cordova.plugin.http.get(`http://bl.ocks.org/anonymous/raw/e872821c8d250450273c88cce1126a69/map.geojson`, {}, {},
            (response) => {
              this.map = this.$refs.myMap.mapObject;
              var geojson = new L.GeoJSON(JSON.parse(response.data)).addTo(this.map);

              // var geojsonLayer = L.mapbox.featureLayer(geojson).addTo(map);
              var bounds = geojson.getBounds();
              if (bounds.isValid()) {
                  this.map.fitBounds(geojsonLayer.getBounds());
              } else {
                  this.map.setView([0, 0], 2);
              }
              geojson.eachLayer(function(l) {
                  this.showProperties(l);
              });
            }, (error) => {
              console.log(error);
            });
          clearInterval(quilombos)
        }
      }.bind(this), 500)
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    showProperties(l) {
      var properties = l.toGeoJSON().properties;
      var table = document.createElement('table');
      table.setAttribute('class', 'marker-properties display')
      for (var key in properties) {
          var tr = createTableRows(key, properties[key]);
          table.appendChild(tr);
      }
      if (table) l.bindPopup(table);
    },
    createTableRows(key, value) {
      // TODO: apresentação do popup vamos trocar isso para algo mais bonito pois uma tabela esta zuado
      var tr = document.createElement('tr');
      var th = document.createElement('th');
      var td = document.createElement('td');
      key = document.createTextNode(key);
      value = document.createTextNode(value);
      th.appendChild(key);
      td.appendChild(value);
      tr.appendChild(th);
      tr.appendChild(td);
      return tr
    }
  }
};
</script>
<style scoped>
.map-mocambos {
  position: absolute;
  top: -10vw;
  height: 105%;
  width: 100%;
  z-index: 5;
}
</style>