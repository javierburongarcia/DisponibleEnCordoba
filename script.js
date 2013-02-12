
// Datos y Mapa IDs
var map;
var data_id = '0Asc521FZEVkpdFNEYl9UTnNkV0FOdXdEME9keVhnanc';
var map_id = 'colaborativa.OSMCordoba';

// Extracting Data from Google Drive, on finished call mapData function
mmg_google_docs_spreadsheet_1(data_id, mapData );


// Create and set Map
$('#map').mapbox('colaborativa.OSMCordoba', function(mapTemp, tilejson) {
    map = mapTemp;
    map.setZoomRange(14, 16);
    map.centerzoom({ lat: 37.885, lon: -4.79 }, 14);
    map.setPanLimits([{ lat: 37.9452, lon: -4.8641 }, { lat: 37.8133, lon: -4.6835 }]);
    map.zoom(14, true);
});
// Load points
function mapData(f) {
    features = f;
    // Adding points to map
    markerLayer = mapbox.markers.layer().features(features);
    /*.factory(function(f) {
      var elem = mapbox.markers.simplestyle_factory(f);
    MM.addEvent(elem, 'click', function(e) {
           var latitude = f.geometry.coordinates[1] + 0.001;
           var longitude = f.geometry.coordinates[0];
           map.ease.location({
           lat: latitude,
           lon: longitude}).zoom(map.zoom()).optimal();
          });
        return elem;
    });*/
    
    // Adding interaction layer
    interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);
    
    // Defining interactive layer
    interaction.formatter(function (feature) {
        var imagen='';
        var masinfo='';
        var direccion='';
        var descripcion='';
        //
        if( feature.properties.enlace != ''){
            imagen = '<div class="imagen"><img src="' + feature.properties.enlace + '" alt="' + feature.properties.titulo + '"></div>';
        }
        if( feature.properties.masinfo != ''){
            masinfo = '<a href="' + feature.properties.masinfo + '">Más info</a>';
        }
        if( feature.properties.descripcion != ''){
            descripcion =  '<p>' + feature.properties.descripcion + '</p>';
        }
        if( feature.properties.direccion  != ''){
            direccion = '<h2>' + feature.properties.direccion + '</h2>';
        }
        //
        var o = '<h3>' + feature.properties.titulo + '</h3>' + direccion +  imagen + descripcion  +  masinfo;
        return o;
    });
    download_data();
}
/*
Function for put href for download data
URL Spreadsheet #DisponibleEnCordoba
https://docs.google.com/spreadsheet/pub?key=0Asc521FZEVkpdFNEYl9UTnNkV0FOdXdEME9keVhnanc&single=true&gid=0&output=csv
https://docs.google.com/spreadsheet/pub?key=0Asc521FZEVkpdFNEYl9UTnNkV0FOdXdEME9keVhnanc&single=true&gid=0&output=csv
https://spreadsheets.google.com/feeds/list/0Asc521FZEVkpdFNEYl9UTnNkV0FOdXdEME9keVhnanc/od6/public/values?alt=json-in-script

*/
function download_data() {
    $('#download_csv').attr('href', 'https://docs.google.com/spreadsheet/pub?key=' + data_id + '&output=csv');
    $('#download_json').attr('href', 'https://spreadsheets.google.com/feeds/list/' + data_id + '/od6/public/values?alt=json-in-script');
}


