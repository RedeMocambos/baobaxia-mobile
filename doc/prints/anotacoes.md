
## podemos converter os videos
<https://github.com/adminy/cordova-plugin-ffmpeg>

tocar video no background
<https://www.npmjs.com/package/cordova-background-video>

extrair imagem com ffmpeg
ffmpeg -itsoffset -1 -i /path/to/hello.avi -vcodec mjpeg -vframes 1 -an -f rawvideo -s 200x150 /path/to/hello.jpg

## chat com socket io

<https://www.luiztools.com.br/post/criando-um-chat-com-nodejs-e-socketio/?gclid=CjwKCAiAjp6BBhAIEiwAkO9Wuo3Q_FVnIkKS2-SXE2w6B03SC8S_5NsP1C_Hlz28GAp1DDEtxiHQiBoCAnQQAvD_BwE>
<https://www.devmedia.com.br/como-criar-um-chat-com-node-js/33719>
<https://pt.wikipedia.org/wiki/Criptografia_de_ponta-a-ponta#:~:text=A%20criptografia%20de%20ponta%20a,o%20destinat%C3%A1rio%20pode%20descriptograf%C3%A1%2Dlo.>
<https://socket.io/socket-io-with-apache-cordova/>

Lista antiga de plugins de video
<http://phonegap-plugins.com/keywords/video>

player
<https://github.com/moust/cordova-plugin-videoplayer>

player full screan
<https://github.com/nchutchind/cordova-plugin-streaming-media>
<https://github.com/krisrandall/streaming-media-plugin-demo>

capturar media
<https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-media-capture/>

get thumb from local video
<https://github.com/lulee007/cordova-plugin-video-thumbnail>

canvas video audio

<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video>
<https://developer.mozilla.org/en-US/docs/Web/Media/Formats>
<https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs>
<https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Audio_codecs>
<https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas>
<https://github.com/mdn/dom-examples/tree/master/canvas/chroma-keying>
<https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation>
<https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/sample8/webgl-demo.js>

## código do mapa

```shel

L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXFhYTA2bTMyeW44ZG0ybXBkMHkifQ.gUGbDOPUN1v1fTs5SeOR4A';
var map = L.mapbox.map('map');

L.mapbox.tileLayer('mapbox.streets').addTo(map);

$.getJSON('map.geojson', function(geojson) {
    var geojsonLayer = L.mapbox.featureLayer(geojson).addTo(map);
    var bounds = geojsonLayer.getBounds();
    if (bounds.isValid()) {
        map.fitBounds(geojsonLayer.getBounds());
    } else {
        map.setView([0, 0], 2);
    }
    geojsonLayer.eachLayer(function(l) {
        showProperties(l);
    });
});

function showProperties(l) {
    var properties = l.toGeoJSON().properties;
    var table = document.createElement('table');
    table.setAttribute('class', 'marker-properties display')
    for (var key in properties) {
        var tr = createTableRows(key, properties[key]);
        table.appendChild(tr);
    }
    if (table) l.bindPopup(table);
}

function createTableRows(key, value) {
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
```
