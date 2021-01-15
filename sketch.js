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

map.on('click', function(e) {
    let f = map.queryRenderedFeatures(e.point, { layers: ['Roland','Schnoor','Muehle'] });
    if (f.length) {
      console.log(f[0]);  //topmost feature
    }
    var feature = features[0];

    map.flyTo({
        center: e.features[0].geometry.coordinates
        });
  
    var popup = new mapboxgl.Popup({ offset: [0, -15] })
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
      .addTo(map);
});
    
//    // Center the map on the coordinates of any clicked symbol from the 'Roland' layer.
//     map.on('click', 'Roland', function (e) {
//         // Center
//         map.flyTo({
//         center: e.features[0].geometry.coordinates
//         });
//     });  
//     // Center the map on the coordinates of any clicked symbol from the 'Schnoor' layer.
//     map.on('click', 'Schnoor', function (e) {
//         // Center
//         map.flyTo({
//         center: e.features[0].geometry.coordinates
//         });
//     });  
//     // Center the map on the coordinates of any clicked symbol from the 'Mühle' layer.
//     map.on('click', 'Muehle', function (e) {
//         // Center
//         map.flyTo({
//         center: e.features[0].geometry.coordinates
//         });
//     });  

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
// Sidebar
    toggleSidebar('left');
// Menu
    map.addSource('Roland', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
    });
    map.addSource('Schnoor', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
    });
    map.addSource('Muehle', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
    });
});

// enumerate ids of the layers
var toggleableLayerIds = ['Roland', 'Muehle', 'Schnoor'];

var link = document.createElement('a');
link.href = '#';
link.className = 'active';
link.textContent = "toggle layers";
link.onclick = function (e) {
    for(var index in toggleableLayerIds) {
      var clickedLayer = toggleableLayerIds[index];
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
    }

};
    var layers = document.getElementById('menu');
    layers.appendChild(link);

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