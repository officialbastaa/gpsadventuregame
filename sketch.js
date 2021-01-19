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
  map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
      layers: ['Roland'] 
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
    map.on('click', 'Roland', function (e) {
        // Center
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  
    // Center the map on the coordinates of any clicked symbol from the 'Mühle' layer.
    map.on('click', 'Muehle', function (e) {
        // Center
        map.flyTo({
        center: e.features[0].geometry.coordinates
        });
    });  

// // Pop-Up Markers
// map.on('click', function(e) {
//     let f = map.queryRenderedFeatures(e.point, { layers: ['Roland'] });
//     if (f.length) {
//       console.log(f[0]);
//       return;
//     } 
//     f = map.queryRenderedFeatures(e.point, { layers: ['Schnoor'] });
//     if (f.length) {
//       console.log(f[0]);
//       return;
//     }
//     f = map.queryRenderedFeatures(e.point, { layers: ['Muehle'] });
//     if (f.length) {
//       console.log(f[0]);
//     }

// map.on('click', function(e) {
//     let f = map.queryRenderedFeatures(e.point, { layers: ['Roland','Schnoor','Muehle'] });
//     if (f.length) {
//       console.log(f[0]);  //topmost feature
//     }
//     var feature = features[0];

//     // map.flyTo({
//     //     center: e.features[0].geometry.coordinates
//     //     });
  
//     var popup = new mapboxgl.Popup({ offset: [0, -15] })
//       .setLngLat(feature.geometry.coordinates)
//       .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
//       .addTo(map);
// });
    
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
  rotateCamera(0);
// Sidebar
    toggleSidebar('left');
// Menu
// Roland (Source and Layer)
    map.addSource('Roland', {
        type: 'Symbol',
        url: 'experimentalmobileplay.ckjyfh1vi07ug27rp9tbh6an8-806mo'
    });
    map.addLayer({
        'id': 'Roland',
        'type': 'Symbol',
        'source': 'Roland',
        'layout': {
        // make layer visible by default
        'visibility': 'visible'
        },
        'source-layer': 'Roland'
        });
// Schnoor (Source and Layer)
    map.addSource('Schnoor', {
        type: 'Symbol',
        url: 'experimentalmobileplay.ckjx1zf7u0gtu20nu2hqprbtf-2muoy'
    });
    map.addLayer({
        'id': 'Schnoor',
        'type': 'Symbol',
        'source': 'Schnoor',
        'layout': {
        // make layer visible by default
        'visibility': 'visible'
        },
        'source-layer': 'Schnoor'
        });
// Muehle (Source and Layer)
    map.addSource('Muehle', {
        type: 'Symbol',
        url: 'experimentalmobileplay.ckjyf56up0lif28ms5jx2c3ah-0j3bt'
    });
    map.addLayer({
        'id': 'Muehle',
        'type': 'Symbol',
        'source': 'Muehle',
        'layout': {
        // make layer visible by default
        'visibility': 'visible'
        },
        'source-layer': 'Muehle'
        });
});

// // enumerate ids of the layers
var toggleableLayerIds = ['Roland', 'Mühle', 'Schnoor'];

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

        // Game Start Screen
        let start = document.querySelector('#brand');
        let ex = 10;
        function swing(element) {

        function update(time) {
            
            const x = Math.sin(time / 1231) * ex;
            const y = Math.sin(time / 1458) * ex;

            element.style.transform = [
                `rotateX(${x}deg)`,
                `rotateY(${y}deg)`
            ].join(' ');

            requestAnimationFrame(update);
        }
        update(0); 
        }

        swing(start);


        let start_button = start.querySelector('a');
        let og_color = start_button.style.color;
        let inter = 0;

        start.addEventListener('mouseover', (e) => {
        
        ex = 20;  
        inter = setInterval(()=>{  
            start_button.style.color = '#'+Math.floor(Math.random()*16777215).toString(16); 
        }, 1000); 
        
        });


        start.addEventListener('mouseout', (e) => {
        
        ex = 10;
        clearInterval(inter);
        start_button.style.color = og_color; 
        
         });