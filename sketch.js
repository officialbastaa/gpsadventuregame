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
    
// Marker -------------------------------------------------!

//Roland Ziel
/*var marker = new mapboxgl.Marker({​​
    color: "#5AC8FA",
    }​​)
.setLngLat([53.07587, 8.8073])
.addTo(map);
Roland Tipps
var marker = new mapboxgl.Marker({​​
    color: "#5AC8FA",
    }​​)
.setLngLat([53.07532, 8.80301])
.addTo(map);
var marker = new mapboxgl.Marker({​​
    color: "#5AC8FA",
    }​​)
.setLngLat([53.07538, 8.80436])
.addTo(map);
var marker = new mapboxgl.Marker({​​
    color: "#5AC8FA",
    }​​)
.setLngLat([53.07472, 8.80499])
.addTo(map);
var marker = new mapboxgl.Marker({​​
    color: "#5AC8FA",
    }​​)
.setLngLat([53.0735, 8.81277])
.addTo(map);

//Mühle Ziel
var marker = new mapboxgl.Marker()
.setLngLat([53.08016, 8.80689])
.addTo(map);
//Mühle Tipps
var marker = new mapboxgl.Marker()
.setLngLat([53.07907, 8.81116])
.addTo(map);
var marker = new mapboxgl.Marker()
.setLngLat([53.07851, 8.80457])
.addTo(map);
var marker = new mapboxgl.Marker()
.setLngLat([53.07642, 8.80949])
.addTo(map);

//Schnoor Ziel

var marker = new mapboxgl.Marker()
.setLngLat([53.07297, 8.80925])
.addTo(map);
//Schnoor Tipps
var marker = new mapboxgl.Marker()
.setLngLat([53.07384, 8.80776])
.addTo(map);
var marker = new mapboxgl.Marker()
.setLngLat([53.07366, 8.80995])
.addTo(map);
var marker = new mapboxgl.Marker()
.setLngLat([53.07112, 8.8114])
.addTo(map);*/