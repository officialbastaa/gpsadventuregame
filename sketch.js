// Map ----------------------------------------------------!
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhwZXJpbWVudGFsbW9iaWxlcGxheSIsImEiOiJja2p2Y2xydTIwN2s0MndvYWpmazB4M2IzIn0.q3CYZLs_taS8F7-pA1eF7g';
var center = [8.807682, 53.075962]; // starting position in Bremen [lng, lat]
const map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/experimentalmobileplay/ckjvg4ijw0m6117o2iy47zi5u', // style URL
zoom: 15, // starting zoom
center: center,
});

// Add geolocate control to the map.
var geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
  });   
map.addControl(geolocate);
geolocate.on('geolocate', function(e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude;
      var userPosition = [lon, lat];
      console.log("Userlocation: " + userPosition);
  

      // document.addEventListener('click', function () {
      //   // Get Distance between two points
      //   for (var itemIndex in markers){
      //     var to = markers[itemIndex] // coords of an index in markers
      //     var from = turf.point([lon, lat]);  // coords of own location
      //     var options = { units: 'kilometers' };
      //     var distance = turf.distance(to, from, options)
      //     console.log(distance);
      //   }
      // })

  //  if(distance < 0.2){
  //   map.on('click', function(e) {
  //   var features = map.queryRenderedFeatures(e.point, {
  //     layers: ['test'] 
  //   });
    
  //   if (!features.length) {
  //     return;
  //   }
      
  //   var feature = features[0];
    
  //   var popup = new mapboxgl.Popup({ offset: [0, -15] })
  //   .setLngLat(feature.geometry.coordinates)
  //   .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
  //   .addTo(map);
  //   });
  //  }
});

// Array with all marker coords
var markers = [
    // Schnoor
    [8.8114, 53.07112],
    [8.811566, 53.07184],
    [8.811528, 53.072896],
    [8.809224, 53.071868],
    [8.80995, 53.07366],
    [8.81215, 53.075229],
    [8.80776, 53.07384],
    [8.808876, 53.074809],
    [8.806285, 53.073478],
    [8.809054, 53.076068],
    [8.807105, 53.075804],
    [8.804721, 53.075075],
    [8.80529, 53.075591],
    [8.808109, 53.076943],
    // Roland
    [8.808002, 53.078613],
    [8.807249, 53.077211],
    [8.804621, 53.077076],
    [8.811235, 53.076969],
    [8.802397, 53.075821],
    [8.805748, 53.074927],
    [8.811307, 53.074943],
    [8.807946, 53.074516],
    // Mühle
    [8.805663, 53.082418],
    [8.808337, 53.081283],
    [8.803572, 53.080051],
    [8.81116, 53.07907],
    [8.802382, 53.078034],
    [8.807041, 53.077754],
    [8.80949, 53.07642],
    [8.806704, 53.076099],
    // Test Sören
    // [8.841517, 53.069567],
    // Test
    [8.799155, 53.072652],
    [8.798255, 53.072108],
    [8.797154, 53.071649],
    [13.402722, 52.565494],
    [13.402678, 52.56385],
    [13.402916, 52.562833],
    [10.391204, 53.213447],
    [10.391415, 53.212974],
    [10.391649, 53.212456],
    // Destinations
    [8.80689, 53.08016],
    [8.807326, 53.075905],
    [8.809213, 53.073001],
    [8.797201, 53.072555],
    [8.799336, 53.070125],
    [13.400888, 52.565573],
    [13.396984, 52.5711],
    [10.390921, 53.21386]
  ];
  
  // // Get Distance between two points
//   var to = turf.point([10.391649, 53.212456]);
//   var from = turf.point([userPosition]);
//   var options = { units: 'kilometers' };
//   var distance = turf.distance(to, from, options)
//   console.log(distance);

//    if(distance < 0.2){
//     map.on('click', function(e) {
//     var features = map.queryRenderedFeatures(e.point, {
//       layers: ['test'] 
//     });
    
//     if (!features.length) {
//       return;
//     }
      
//     var feature = features[0];
    
//     var popup = new mapboxgl.Popup({ offset: [0, -15] })
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
//     .addTo(map);
//     });
//    }

// Timer
var sec = 0;

function pad(val) {
    return val > 9 ? val : "0" + val;
}
var timer = setInterval(function _() {
    document.getElementById("seconds").innerHTML = pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
}, 1000);

setTimeout(function () {
    clearInterval(timer);
}, 1110000);

map.on('load', function () {
  // Sidebar
  toggleSidebar('left');  

  // If geolocation is on
  geolocate.on('geolocate', function(e) {
    var lon = e.coords.longitude;
    var lat = e.coords.latitude;
    var userPosition = [lon, lat];
    console.log("Userlocation: " + userPosition);

    // Measuring distances
    var from = turf.point([lon, lat]);  // coords of own location
    var options = { units: 'kilometers' };

    // Center on marker (1)
    map.on('click', 'MISSION 1', function (e) {

      // Center on marker
      map.flyTo({
        center: e.features[0].geometry.coordinates
      });
      // Measuring distance to geolocation
      var to = e.features[0].geometry.coordinates
      var distance = turf.distance(to, from, options)
      console.log(distance);

      // show popup if player within distance
      if(distance < 0.02){
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['MISSION 1'] 
        });
        if (!features.length) { return; }   
        var feature = features[0];
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
      }
    });  

    // Center on marker (2)
    map.on('click', 'MISSION 2', function (e) {
          
      // Center on marker
      map.flyTo({
        center: e.features[0].geometry.coordinates
      });

      // Measuring distance to geolocation
      var to = e.features[0].geometry.coordinates
      var distance = turf.distance(to, from, options)
      console.log(distance);
      
      // show popup if player within distance
      if(distance < 0.02){
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['MISSION 2'] 
        });
        if (!features.length) { return; }   
        var feature = features[0];
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
      }
    });  

    // Center on marker (3)
    map.on('click', 'MISSION 3', function (e) {

      // Center on marker
      map.flyTo({
        center: e.features[0].geometry.coordinates
      });
      
      // Measuring distance to geolocation
      var to = e.features[0].geometry.coordinates
      var distance = turf.distance(to, from, options)
      console.log(distance);
        
      // show popup if player within distance
      if(distance < 0.02){
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['MISSION 3'] 
        });
        if (!features.length) { return; }   
        var feature = features[0];
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
      }
    });  

    // Center on Ziele (4)
    map.on('click', 'destination', function (e) {

      // Center on marker
      map.flyTo({
        center: e.features[0].geometry.coordinates
      });

      // Measuring distance to geolocation
      var to = e.features[0].geometry.coordinates
      var distance = turf.distance(to, from, options)
      console.log(distance);
        
      // show popup if player within distance
      if(distance < 0.02){
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['destination'] 
        });
        if (!features.length) { return; }   
        var feature = features[0];
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
      }
    });  

    // Center on Test (5)
    map.on('click', 'test', function (e) {
    
      // Center on marker
      map.flyTo({
        center: e.features[0].geometry.coordinates
      });

      // Measuring distance to geolocation
      var to = e.features[0].geometry.coordinates
      var distance = turf.distance(to, from, options)
      console.log(distance);

      // show popup if player within distance
      if(distance < 0.02){
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['test'] 
        });
        if (!features.length) { return; }   
        var feature = features[0];
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
        .addTo(map);
      }
    });

    // Timer stop when Ziel erreicht
    map.on('click', 'destination', function(e) {
      clearInterval(timer);
    });
    
  });
});


//Menu --------------------------------!>
// enumerate ids of the layers (schnoor, muehle, roland)
var toggleableLayerIds = ['MISSION 1', 'MISSION 2', 'MISSION 3'];

    // set up the corresponding toggle button for each layer
    for (var i = 0; i < toggleableLayerIds.length; i++) {
      var id = toggleableLayerIds[i];

      var link = document.createElement('a');
      link.href = '#';
      link.className = '';
      link.textContent = id;

      link.onclick = function(e) {
          var clickedLayer = this.textContent;
          e.preventDefault();
          e.stopPropagation(); 
          for (var j = 0; j < toggleableLayerIds.length; j++) {
              if (clickedLayer === toggleableLayerIds[j]) {
                layers.children[j].className = 'active';
                map.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'visible');

                // Timer
                var sec = 0;

                function pad(val) {
                    return val > 9 ? val : "0" + val;
                }
                var timer = setInterval(function _() {
                    document.getElementById("seconds").innerHTML = pad(++sec % 60);
                    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
                }, 1000);
              }
              else {
                layers.children[j].className = '';
                map.setLayoutProperty(toggleableLayerIds[j], 'visibility', 'none');

                setTimeout(function () {
                  clearInterval(timer);
                }, 1110000);

              }
          }
      };
      var layers = document.getElementById('menu');
      layers.appendChild(link);  
  }

//Sidebar
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

// Missions
var missions = document.getElementById("myMissions");

// erzeugt den Btn zum öffnet des Fenster
var missions_btn = document.getElementById("myMissionsBtn");

// erzeugt das <span> element zum schließen des Fensters
var span = document.getElementsByClassName("closeMissions")[0];

// Beim klicken auf den Btn öffnet sich das Fenster
missions_btn.onclick = function() {
  missions.style.display = "block";
}

// Beim klicken auf das X schließt sich das Fenster
span.onclick = function() {
  missions.style.display = "none";
}

// Story
var story = document.getElementById("myStory");

var story_btn = document.getElementById("myStoryBtn");

var span = document.getElementsByClassName("closeStory")[0];

story_btn.onclick = function() {
  story.style.display = "block";
}

span.onclick = function() {
  story.style.display = "none";
}

// Help
var help = document.getElementById("myHelp");

var help_btn = document.getElementById("myHelpBtn");

var span = document.getElementsByClassName("closeHelp")[0];

help_btn.onclick = function() {
  help.style.display = "block";
}

span.onclick = function() {
  help.style.display = "none";
}

//audio
var audio = document.getElementById('audio_1');
audio.volume = 0.2;
audio.addEventListener('ended', function() {
  loop();
}, false);

function loop() {
  audio.currentTime = 0; //rewind audio track to the beginning
  audio.play(); // play it
}

//also manually trigger play when it is able to play ie. when files is loaded sufficiently for playing
audio.addEventListener('canplay', function() {
  audio.play(); // play it
}, false);