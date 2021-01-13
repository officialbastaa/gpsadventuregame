//Map
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhwZXJpbWVudGFsbW9iaWxlcGxheSIsImEiOiJja2p2Y2xydTIwN2s0MndvYWpmazB4M2IzIn0.q3CYZLs_taS8F7-pA1eF7g';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/experimentalmobileplay/ckjvg4ijw0m6117o2iy47zi5u', // style URL
center: [8.8017, 53.0793], // starting position in Bremen [lng, lat]
zoom: 9 // starting zoom
});

// Add zoom and rotation controls to the map
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


// function updatePosition() {
//     navigator.geolocation.watchPosition(
//         data => {
//             console.log(data);
//             if(lng != data.coords.longitude || lat != data.coords.latitude) {
//                 lng = data.coords.longitude;
//                 lat = data.coords.latitude;
//                 map.removeLayer('points');
//                 map.removeSource('points');
//                 loadPoints();
//                 coordinates.push([lng, lat]);
//                 map.flyTo({speed: 3.0, center: [lng, lat], zoom: 16});
//                 window.localStorage.setItem("coordinates", JSON.stringify(coordinates));
//                 map.removeLAyer('route');
//                 map.removeSource('route');
//                 loadGeoJSON();
//             }
//         },
//         error => console.log(error),
//         {
//             enableHighAccurancy: true
//         }
//     )
// }