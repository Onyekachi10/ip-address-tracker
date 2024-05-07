
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);

marker.bindPopup("<b>Hello!</b><br>Welcome to IP tracker.").openPopup();


function onMapClick(e) {
console.log("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);

let popup = L.popup();

function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("This is " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

