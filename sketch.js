// Map ----------------------------------------------------!
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhwZXJpbWVudGFsbW9iaWxlcGxheSIsImEiOiJja2p2Y2xydTIwN2s0MndvYWpmazB4M2IzIn0.q3CYZLs_taS8F7-pA1eF7g';
var center = [8.8017, 53.0793]; // starting position in Bremen [lng, lat]
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/experimentalmobileplay/ckjvg4ijw0m6117o2iy47zi5u', // style URL
zoom: 12, // starting zoom
center: center,
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
      layers: ['Bremen'], // Roland
      layers: ['Schnoor'], // Schnoor
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

   // Center the map on the coordinates of any clicked symbol from the 'Roland' layer.
    map.on('click', 'Bremen', function (e) {
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  

    // Center the map on the coordinates of any clicked symbol from the 'Roland' layer.
    map.on('click', 'Schnoor', function (e) {
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  

    // Center the map on the coordinates of any clicked symbol from the 'Roland' layer.
    map.on('click', 'Mhle', function (e) {
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  

//sidebar
new mapboxgl.Marker().setLngLat(center).addTo(map);
 
function toggleSidebar(id) {
var elem = document.getElementById(id);
var classes = elem.className.split(' ');
var collapsed = classes.indexOf('collapsed') !== -1;
 
var padding = {};
 
if (collapsed) {
// Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
classes.splice(classes.indexOf('collapsed'), 1);
 
padding[id] = 300; // In px, matches the width of the sidebars set in .sidebar CSS class
map.easeTo({
padding: padding,
duration: 1000 // In ms, CSS transition duration property for the sidebar matches this value
});
} else {
padding[id] = 0;
// Add the 'collapsed' class to the class list of the element
classes.push('collapsed');
 
map.easeTo({
padding: padding,
duration: 1000
});
}
 
// Update the class list on the element
elem.className = classes.join(' ');
}
 
map.on('load', function () {
toggleSidebar('left');
});