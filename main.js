window.addEventListener("load", function() {

  "use strict"



  const map = L.map('map').setView([51.505, -0.09], 13);
  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  
  // ADDING THE CUSTOM ICON
  const customIcon = L.icon({ 
    iconUrl : "./images/icon-location.svg",
    iconSize : [40,40],
    iconAnchor : [17,34],
    popupAnchor: [0, -32]
  })
   
  function placeMarker(latlng) {
    let lat = latlng.lat;
    let long = latlng.lng;
    let marker 
    
      // Remove existing marker (if any)
      if (marker) {
        map.removeLayer(marker);
    }
  
    // Add new marker at the specified location
    map.setView(latlng, 20)
    marker = L.marker(latlng, { icon: customIcon }).addTo(map);
  }
  
  
  
  
  const searchBar = document.querySelector("input")
  const arrow = document.querySelector(".arrow")
  const ipAddress = document.querySelector(".value")
  const locate = document.querySelector(".locate")
  const time = document.querySelector(".time")
  const isp = document.querySelector('.isp')
  
   
  let results = {}
  function GetData (ip, values) {
     
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_CvEfYiWVoj1AhOdmaiMzbXttHigen&ipAddress=${ip}`)
  
  .then( response =>{ return response.json()})
  .then( data => {
         console.log(data)
  
        if (data.location) {
          results ={
            ip : data.ip,
            country : data.location.country,
          region : data.location.region,
          city : data.location.city,
            geoNameId: data.location.geonameId,
            timeZone : data.location.timezone,
            lat : data.location.lat,
            lng: data.location.lng,
            isp: data.isp
        };
  
        ipAddress.innerText = ip
      locate.innerHTML = ` ${results.country}, ${results.city}`;
      time.innerHTML = `UTC ${results.timeZone}`;
      isp.innerHTML = results.isp;
  
      values(results.lat, results.lng);
        }
  
      else {
        console.error("not a valid location data in API response")
      }
  
  
  })
  .catch(error => {
    console.error('Error fetching geolocation data:', error);
  });
  
  }
   
  arrow.addEventListener("click", function() {
    let ip = searchBar.value
     
  
    GetData(ip, (lat,lng) => {
    
      placeMarker({ lat: lat, lng: lng })
    })
  })
  
  
  
}) 
