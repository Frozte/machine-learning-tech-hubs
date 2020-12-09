// ////////////////////////MAP CONTAINER///////////////////////////////////////////////

// function default_map(coordinates) {

//     var map = L.map("map", {
//         center: coordinates,
//         zoom: 11
//     });
    
//     // Adding tile layer
//     L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 20,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
//     }).addTo(map);
//     return map
//   }

// var map = default_map([40.7127281,-74.0060152])

// ////////////////////////USER INPUT HANDLER + MAP PANNING//////////////////////////////////////////////

// function handleClick(){
//     zipcode = (document.getElementById("USERINPUT").value) //THIS IS THE USER ZIPCODE ON CLICK OF THE SUBMIT BOX
//     //console.log(zipcode)
//         zipurl = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:"+zipcode+"|country:US&key=AIzaSyCXHiDgN9t3DXorh6zgafpCdv-_Jop4HLs" //TO HIDE 
//         d3.json(zipurl, function(data){
//             //console.log(data)
//             LAT = (data.results[0].geometry.location.lat)
//             LNG = (data.results[0].geometry.location.lng)

//         ziptocoords = [LAT,LNG]
        
//         map.panTo(ziptocoords)

//     })
//     return false;
// }
