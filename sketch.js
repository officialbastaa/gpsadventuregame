// Map ----------------------------------------------------!
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhwZXJpbWVudGFsbW9iaWxlcGxheSIsImEiOiJja2p2Y2xydTIwN2s0MndvYWpmazB4M2IzIn0.q3CYZLs_taS8F7-pA1eF7g';
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/experimentalmobileplay/ckjvg4ijw0m6117o2iy47zi5u', // style URL
center: [8.8017, 53.0793], // starting position in Bremen [lng, lat]
zoom: 12, // starting zoom
});

// Add Fullscreen Button
map.addControl(new mapboxgl.FullscreenControl());

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
);

// Show markers
map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['Bremen'] // Roland
      layers: ['Schnoor'] // Schnoor
      layers: ['Mhle'] // Mühle
    });
  
    if (!features.length) {
      return;
    }
  
    var feature = features[0];
  
    // Tipp Pop-Up
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
      .addTo(map);
  });
  


// 
// map.on('load', function () {
//     // add source and layer for markers
//     map.addSource('museums', {
//     type: 'point',
//     url: 'mapbox://mapbox.2opop9hr'
//     });
//     map.addLayer({
//         'id': 'markers',
//         'type': 'point',
//         'source': 'markers',
//         'layout': {
//         // make layer visible by default
//         'visibility': 'visible'
//         },
//     });