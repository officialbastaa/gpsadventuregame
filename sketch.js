// Map ----------------------------------------------------!
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhwZXJpbWVudGFsbW9iaWxlcGxheSIsImEiOiJja2p2Y2xydTIwN2s0MndvYWpmazB4M2IzIn0.q3CYZLs_taS8F7-pA1eF7g';
var center = [8.8044, 53.0776]; // starting position in Bremen [lng, lat]
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/experimentalmobileplay/ckjvg4ijw0m6117o2iy47zi5u', // style URL
zoom: 13.5, // starting zoom
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

// // Camera rotation
// function rotateCamera(timestamp) {
//   // clamp the rotation between 0 -360 degrees
//   // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
//   map.rotateTo((timestamp / 200) % 360, { duration: 0 });
//   // Request the next frame of the animation.
//   requestAnimationFrame(rotateCamera);
//   }
  

// Schnoor -----------------------------------------------------------------!
  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['Schnoor'] 
    });
  
    if (!features.length) {
      return;
    }
  
    var feature = features[0];
  
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
      .addTo(map);
  });
// Roland -----------------------------------------------------------------!
  //map.on('click', function(e) {
  //   var features = map.queryRenderedFeatures(e.point, {
  //     layers: ['Roland'] 
  //   });
  
  //   if (!features.length) {
  //     return;
  //   }
  
  //   var feature = features[0];
  
  //   var popup = new mapboxgl.Popup({ offset: [0, -15] })
  //     .setLngLat(feature.geometry.coordinates)
  //     .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
  //     .addTo(map);
  // });
  // Mühle -----------------------------------------------------------------!
  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['Muehle'] 
    });
  
    if (!features.length) {
      return;
    }
  
    var feature = features[0];
  
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
      .addTo(map);
  });

    // Center the map on the coordinates of any clicked symbol from the 'Roland' layer.
    map.on('click', 'Schnoor', function (e) {
        // Center
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  
    // Center the map on the coordinates of any clicked symbol from the 'Schnoor' layer.
    // map.on('click', 'Roland', function (e) {
    //     // Center
    //     map.flyTo({
    //     center: e.features[0].geometry.coordinates
    //     });
    // });  
    // Center the map on the coordinates of any clicked symbol from the 'Mühle' layer.
    map.on('click', 'Muehle', function (e) {
        // Center
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  
    
//sidebar
//new mapboxgl.Marker().setLngLat(center).addTo(map);
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
// Start the animation.
//  rotateCamera(0);
// Sidebar
    toggleSidebar('left');
// Menu
// Roland (Source and Layer)
//     map.addSource('Roland', {
//         type: 'vector',
//         url: 'mapbox://styles/experimentalmobileplay/ckjvg4ijw0m6117o2iy47zi5u'
//     });
//     map.addLayer({
//         'id': 'Roland',
//         'type': 'symbol',
//         'source': 'composite',
//         'layout': {
//           'visibility': 'none'
//         },
//         'source-layer': 'roland'
//         });
// // Schnoor (Source and Layer)
    map.addSource('Schnoor', {
        type: 'vector',
        url: 'experimentalmobileplay.ckjx1zf7u0gtu20nu2hqprbtf-2muoy'
    });
    map.addLayer({
        'id': 'Schnoor',
        'type': 'symbol',
        'source': 'composite',
        'layout': {
          'visibility': 'visible'
        },
        'source-layer': 'schnoor'
        });
// Muehle (Source and Layer)
    map.addSource('Muehle', {
        type: 'vector',
        url: 'experimentalmobileplay.ckjyf56up0lif28ms5jx2c3ah-0j3bt'
    });
    map.addLayer({
        'id': 'Muehle',
        'type': 'symbol',
        'source': 'composite',
        'layout': {
          'visibility': 'none'
        },
        'source-layer': 'muehle'
        });
});

// // enumerate ids of the layers
var toggleableLayerIds = ['Mühle', 'Schnoor'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];    

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;
    
    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
        
      var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

      if (visibility === 'visible') {
          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
          this.className = '';
      } else {
          this.className = 'active';
          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      }
    };
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}