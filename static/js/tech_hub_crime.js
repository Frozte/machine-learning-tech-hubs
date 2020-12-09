<<<<<<< Updated upstream

////////////////////////MAP CONTAINER///////////////////////////////////////////////

function crime_map(coordinates) {

  var map = L.map("map", {
      center: coordinates,
      zoom: 11
  });

  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 20,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoiY2FzdHJvc3RlcGhhbm8iLCJhIjoiY2tmcTAwNW93MGZjNTJzcHN4aG04cmZkYSJ9.cq1ZMc5yOD0ny7ygoB7Gjw"
  }).addTo(map);
  return map
}

////////////////////////CRIME MARKER CLUSTER///////////////////////////////////////////

var lyrnyc 
var lyraustin 
var lyrsanfrancisco
var lyrchicago;

coordinates = {
  "nyc": [40.730610, -73.935242],
  "austin": [30.2672, -97.7431],
  "san francisco": [37.7749, -122.4194],
  "chicago": [41.8781, -87.6298]
};

url = {
  "nyc": ["https://data.cityofnewyork.us/resource/qgea-i56i.json"],
  "austin": ["https://data.austintexas.gov/resource/fdj4-gpfu.json"],
  "san francisco": ["https://data.sfgov.org/resource/cuks-n6tp.json"],
  "chicago": ["https://data.cityofchicago.org/resource/dfnk-7re6.json"]
};

var overlays = L.layerGroup();

// nyc crime function
function nyc_markers(url, map) {
  d3.json(url, function (response) {
      // Create a new marker cluster group
      lyrnyc = L.markerClusterGroup().addTo(overlays);
      for (var i = 0; i < response.length; i++) {
          var location = response[i];
          if (location.lat_lon) {
              lyrnyc.addLayer(L.marker([location.latitude, location.longitude])
                  .bindPopup("Date: " + response[i].rpt_dt + "<br>Crime Type: " + response[i].ofns_desc + "<br>Category: "
                             + response[i].law_cat_cd));
          }
      }
      return lyrnyc;
  })
}

// // chicago crime function
//after first (response) use filter.date

function chi_markers(url, map) {
  d3.json(url, function (response) {
      // Create a new marker cluster group
      lyrchicago = L.markerClusterGroup().addTo(overlays);
      for (var i = 0; i < response.length; i++) {
          var location = response[i];
          if (location.location) {
              lyrchicago.addLayer(L.marker([location.latitude, location.longitude])
                  .bindPopup("Date: " + response[i].date_of_occurrence + "<br>Crime Type: " + response[i]._primary_decsription + "<br>Category: " + response[i]._secondary_decsription));
          }
      }
      return lyrchicago;
  })
}

// san fran crime function

function sanfran_markers(url, map) {
  d3.json(url, function (response) {
      // Create a new marker cluster group
      lyrsanfrancisco = L.markerClusterGroup().addTo(overlays);
      for (var i = 0; i < response.length; i++) {
          var location = response[i].location;
          if (location) {
              lyrsanfrancisco.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                  .bindPopup("Date: " + response[i].date + "<br>Crime Type: " + response[i].descript + "<br>Category: " + response[i].category));
          }
      }
      return lyrsanfrancisco;
  })
}

//  austin crime function

function austin_markers(url, map) {
  d3.json(url, function (response) {
      lyraustin = L.markerClusterGroup().addTo(overlays);
      for (var i = 0; i < response.length; i++) {
          var location = response[i].location;
          if (location) {
              lyraustin.addLayer(L.marker([location.latitude, location.longitude])
                  .bindPopup("Date: " + response[i].rep_date + "<br>Crime Type: " + response[i].crime_type + "<br>Category: " + response[i].category_description));
          }
      }
      return lyraustin;
  })
}

///////////////////////////////THE CRIME JUICE/////////////////////////////////

//function map calls
var map = crime_map(coordinates["nyc"])
chi_markers(url["chicago"], map)
nyc_markers(url["nyc"], map)
sanfran_markers(url["san francisco"], map)
austin_markers(url["austin"], map)

///////////////////////////////DROP DOWN SELECTOR FOR PANNING/////////////////////////////////

// build a dropdown function to call. relating to line 72 selDataset

function BuildDropDown() {
  var selection = d3.select("#selDataset")
  selection.append("option")
      .text(name)
      .attr("value", name)

}

function optionChanged(selection) {
  map.panTo(coordinates[selection])
}

///////////////////////////////CHLOROPLETH LAYER///////////////////////////////////////////////

var geoData = "static/data/geojson/MASTER.geojson";

var geojson;

// Grab data with d3
d3.json(geoData, function (data) {
  // console.log(data)
  // Create a new choropleth layer
  geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "avg2019", ///////////////////////CHANGE 2010-2020

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
          // Border color
          color: "#fff",
          weight: 1,
          fillOpacity: 0.7
      },
      // Binding a pop-up to each layer
      onEachFeature: function (feature, layer) {
          layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
              "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
      }
  }).addTo(map);

  // Set up the legend
  var legend = L.control({position: "bottomright"});
  legend.onAdd = function () {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];

      // Add min & max
      var legendInfo = "<h1>Average House Value</h1>" +
          "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
          "</div>";

      div.innerHTML = legendInfo;

      limits.forEach(function (limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
  };

  // Adding legend to the map
  legend.addTo(map);


  /////////////////////////////////LAYER CONTROL/////////////////////////////////////

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      //attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: "pk.eyJ1IjoiY2FzdHJvc3RlcGhhbm8iLCJhIjoiY2tmcTAwNW93MGZjNTJzcHN4aG04cmZkYSJ9.cq1ZMc5yOD0ny7ygoB7Gjw"
  });

  var standard = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      //attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 20,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: "pk.eyJ1IjoiY2FzdHJvc3RlcGhhbm8iLCJhIjoiY2tmcTAwNW93MGZjNTJzcHN4aG04cmZkYSJ9.cq1ZMc5yOD0ny7ygoB7Gjw"
  });

  // Only one base layer can be shown at a time
  var baseMaps = {
      Day: standard,
      Night: dark,
  };
  // overlays.addTo(map);
  //Overlays that may be toggled on or off
  var overlayMaps = {
      'Real Estate Prices': geojson,
      'Crime Data': overlays
  };
  L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

});
=======
////////////////////////MAP CONTAINER///////////////////////////////////////////////

function crime_map(coordinates) {

    var map = L.map("map", {
        center: coordinates,
        zoom: 11
    });
  
    // Adding tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 20,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: "pk.eyJ1IjoiY2FzdHJvc3RlcGhhbm8iLCJhIjoiY2tmcTAwNW93MGZjNTJzcHN4aG04cmZkYSJ9.cq1ZMc5yOD0ny7ygoB7Gjw"
    }).addTo(map);
    return map
  }
  
  ////////////////////////CRIME MARKER CLUSTER///////////////////////////////////////////
  
  var lyrnyc 
  var lyraustin 
  var lyrsanfrancisco
  var lyrchicago;
  
  coordinates = {
    "nyc": [40.730610, -73.935242],
    "austin": [30.2672, -97.7431],
    "san francisco": [37.7749, -122.4194],
    "chicago": [41.8781, -87.6298]
  };
  
  url = {
    "nyc": ["https://data.cityofnewyork.us/resource/qgea-i56i.json"],
    "austin": ["https://data.austintexas.gov/resource/fdj4-gpfu.json"],
    "san francisco": ["https://data.sfgov.org/resource/cuks-n6tp.json"],
    "chicago": ["https://data.cityofchicago.org/resource/dfnk-7re6.json"]
  };
  
  var overlays = L.layerGroup();
  
  // nyc crime function
  function nyc_markers(url, map) {
    d3.json(url, function (response) {
        // Create a new marker cluster group
        lyrnyc = L.markerClusterGroup().addTo(overlays);
        for (var i = 0; i < response.length; i++) {
            var location = response[i];
            if (location.lat_lon) {
                lyrnyc.addLayer(L.marker([location.latitude, location.longitude])
                    .bindPopup("Date: " + response[i].rpt_dt + "<br>Crime Type: " + response[i].ofns_desc + "<br>Category: "
                               + response[i].law_cat_cd));
            }
        }
        return lyrnyc;
    })
  }
  
  // // chicago crime function
  //after first (response) use filter.date
  
  function chi_markers(url, map) {
    d3.json(url, function (response) {
        // Create a new marker cluster group
        lyrchicago = L.markerClusterGroup().addTo(overlays);
        for (var i = 0; i < response.length; i++) {
            var location = response[i];
            if (location.location) {
                lyrchicago.addLayer(L.marker([location.latitude, location.longitude])
                    .bindPopup("Date: " + response[i].date_of_occurrence + "<br>Crime Type: " + response[i]._primary_decsription + "<br>Category: " + response[i]._secondary_decsription));
            }
        }
        return lyrchicago;
    })
  }
  
  // san fran crime function
  
  function sanfran_markers(url, map) {
    d3.json(url, function (response) {
        // Create a new marker cluster group
        lyrsanfrancisco = L.markerClusterGroup().addTo(overlays);
        for (var i = 0; i < response.length; i++) {
            var location = response[i].location;
            if (location) {
                lyrsanfrancisco.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
                    .bindPopup("Date: " + response[i].date + "<br>Crime Type: " + response[i].descript + "<br>Category: " + response[i].category));
            }
        }
        return lyrsanfrancisco;
    })
  }
  
  //  austin crime function
  
  function austin_markers(url, map) {
    d3.json(url, function (response) {
        lyraustin = L.markerClusterGroup().addTo(overlays);
        for (var i = 0; i < response.length; i++) {
            var location = response[i].location;
            if (location) {
                lyraustin.addLayer(L.marker([location.latitude, location.longitude])
                    .bindPopup("Date: " + response[i].rep_date + "<br>Crime Type: " + response[i].crime_type + "<br>Category: " + response[i].category_description));
            }
        }
        return lyraustin;
    })
  }
  
  ///////////////////////////////THE CRIME JUICE/////////////////////////////////
  
  //function map calls
  var map = crime_map(coordinates["nyc"])
  chi_markers(url["chicago"], map)
  nyc_markers(url["nyc"], map)
  sanfran_markers(url["san francisco"], map)
  austin_markers(url["austin"], map)
  
  ///////////////////////////////DROP DOWN SELECTOR FOR PANNING/////////////////////////////////
  
  // build a dropdown function to call. relating to line 72 selDataset
  
  function BuildDropDown() {
    var selection = d3.select("#selDataset")
    selection.append("option")
        .text(name)
        .attr("value", name)
  
  }
  
  function optionChanged(selection) {
    map.panTo(coordinates[selection])
  }
  
  ///////////////////////////////CHLOROPLETH LAYER///////////////////////////////////////////////
  
  var geoData = "../static/data/geojson/MASTER.geojson";
  
  var geojson;
  
  // Grab data with d3
  d3.json(geoData, function (data) {
    // console.log(data)
    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
        // Define what  property in the features to use
        valueProperty: "avg2019", ///////////////////////CHANGE 2010-2020
  
        // Set color scale
        scale: ["#ffffb2", "#b10026"],
  
        // Number of breaks in step range
        steps: 10,
  
        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
            // Border color
            color: "#fff",
            weight: 1,
            fillOpacity: 0.7
        },
        // Binding a pop-up to each layer
        onEachFeature: function (feature, layer) {
            layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
                "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
        }
    }).addTo(map);
  
    // Set up the legend
    var legend = L.control({position: "bottomright"});
    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];
  
        // Add min & max
        var legendInfo = "<h1>Average House Value</h1>" +
            "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
            "</div>";
  
        div.innerHTML = legendInfo;
  
        limits.forEach(function (limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });
  
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };
  
    // Adding legend to the map
    legend.addTo(map);
  
  
    /////////////////////////////////LAYER CONTROL/////////////////////////////////////
  
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        //attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: "pk.eyJ1IjoiY2FzdHJvc3RlcGhhbm8iLCJhIjoiY2tmcTAwNW93MGZjNTJzcHN4aG04cmZkYSJ9.cq1ZMc5yOD0ny7ygoB7Gjw"
    });
  
    var standard = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        //attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 20,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: "pk.eyJ1IjoiY2FzdHJvc3RlcGhhbm8iLCJhIjoiY2tmcTAwNW93MGZjNTJzcHN4aG04cmZkYSJ9.cq1ZMc5yOD0ny7ygoB7Gjw"
    });
  
    // Only one base layer can be shown at a time
    var baseMaps = {
        Day: standard,
        Night: dark,
    };
    // overlays.addTo(map);
    //Overlays that may be toggled on or off
    var overlayMaps = {
        'Real Estate Prices': geojson,
        'Crime Data': overlays
    };
    L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);
  
  });
// ///////////////////////////////DROP DOWN SELECTOR FOR PANNING////////////////////////

// function BuildDropDown() {
//     var selection = d3.select("#selDataset")
//     selection.append("option")
//         .text(name)
//         .attr("value", name)
//   }
  
//   function optionChanged(selection) {
//     map.panTo(coordinates[selection])
//   }

//   //Top 20 Tech Hubs based on data from CompTIA 
// coordinates = {
//     "Austin, TX": [30.2672,-97.7431],
//     "Dallas, TX":[32.7762719,-96.7968559],
//     "Raleigh, NC":[35.7803977,-78.6390989],
//     "San Jose, CA":[37.3361905,-121.890583],
//     "Charlotte, NC":[35.2272086,-80.8430827],
//     "Seattle, WA":[47.6038321,-122.3300624],
//     "San Francisco, CA":[37.7749,-122.4194],
//     "Atlanta, GA":[33.7489924,-84.3902644],
//     "Huntsville, Al":[34.729847,-86.5859011],
//     "Denver, CO":[39.7392364,-104.9848623],
//     "New York, NY":[40.7127281,-74.0060152],
//     "Boston, MA":[42.3602534,-71.0582912],
//     "Trenton, NJ":[40.2170575,-74.7429463],
//   };

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

// var map = default_map(coordinates["New York, NY"])

// ///////////////////////////////CHLOROPLETH LAYER///////////////////////////////////
// //Layers to Add Average RE Prices, Income per Capita, Median Age Male, Median Age Female, Bachelor's Degree, Public Transportation

// var geoData = "../static/data/geojson/NY.geojson"; //CHANGE THIS TO THE FINAL DATA SOURCE (AWS)
// var geojson;

// /////////////////////////////////REAL ESTATE/////////////////////////////////////
// var RealEstate = new L.LayerGroup()

// // Grabbing our GeoJSON data..
// d3.json(geoData, function (data) {
//     console.log(data)
//     // Create a new choropleth layer
//     geojson = L.choropleth(data, {
  
//         // Define what  property in the features to use
//         valueProperty: "Average RE Prices", ///////////////////////CHANGE 2010-2020
  
//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],
  
//         // Number of breaks in step range
//         steps: 10,
  
//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.7
//         },
//         // Binding a pop-up to each layer
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
//                 "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
//         }  
//     }).addTo(RealEstate);
    
//   // Set up the legend
//   var legend = L.control({position: "bottomleft"});
//   legend.onAdd = function () {
//       var div = L.DomUtil.create("div", "info legend");
//       var limits = geojson.options.limits;
//       var colors = geojson.options.colors;
//       var labels = [];

//       // Add min & max
//       var legendInfo = "<h5>Average House Value</h5>" +
//           "<div class=\"labels\">" +
//           "<div class=\"min\">" + limits[0] + "</div>" +
//           "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//           "</div>";

//       div.innerHTML = legendInfo;

//       limits.forEach(function (limit, index) {
//           labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//       });

//       div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//       return div;
//     };
    
//     // Adding legend to the map
//     legend.remove(map);

//     map.on('overlayadd', function(eventLayer){
//         if (eventLayer.name === 'Real Estate Prices'){
//             map.addControl(legend);
//         } else if (eventLayer.name === 'Bachelors Degree') {
//             map.removeControl(legend);
//         } else if (eventLayer.name === 'Income Per Capita') {
//             map.removeControl(legend);
//         } else if (eventLayer.name === 'Median Age Male') {
//             map.removeControl(legend);
//         } else if (eventLayer.name === 'Median Age Female') {
//             map.removeControl(legend);
//         } else if (eventLayer.name === 'Public Transportation') {
//             map.removeControl(legend);
//         }
//     });
// });

// /////////////////////////////////BACHELOR'S DEGREE/////////////////////////////////////
// var Bach = new L.LayerGroup()

// // Grabbing our GeoJSON data..
// d3.json(geoData, function (data) {
//     // Create a new choropleth layer
//     geojson2 = L.choropleth(data, {
  
//         // Define what  property in the features to use
//         valueProperty: "Bachelor's degree > 25", ///////////////////////CHANGE 2010-2020
  
//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],
  
//         // Number of breaks in step range
//         steps: 10,
  
//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.7
//         },
//         // Binding a pop-up to each layer
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
//                 "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
//         }  
//     }).addTo(Bach)

//     var legend2 = L.control({position: "bottomleft"});
//     legend2.onAdd = function () {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson2.options.limits;
//         var colors = geojson2.options.colors;
//         var labels = [];
    
//         // Add min & max
//         var legendInfo = "<h5>Bachelors Degree</h5>" +
//             "<div class=\"labels\">" +
//             "<div class=\"min\">" + limits[0] + "</div>" +
//             "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//             "</div>";
    
//         div.innerHTML = legendInfo;
    
//         limits.forEach(function (limit, index) {
//             labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//         });
    
//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//         return div;
//     };
    
//     // Adding legend to the map
//     legend2.remove(map);

//     map.on('overlayadd', function(eventLayer){
//         if (eventLayer.name === 'Real Estate Prices'){
//             map.removeControl(legend2);
//         } else if (eventLayer.name === 'Bachelors Degree') {
//             map.addControl(legend2);
//         } else if (eventLayer.name === 'Income Per Capita') {
//             map.removeControl(legend2);
//         } else if (eventLayer.name === 'Median Age Male') {
//             map.removeControl(legend2);
//         } else if (eventLayer.name === 'Median Age Female') {
//             map.removeControl(legend2);
//         } else if (eventLayer.name === 'Public Transportation') {
//             map.removeControl(legend2);
//         }
//     });
// });

// /////////////////////////////////INCOME PER CAPITA/////////////////////////////////////
// var IncPerCap = new L.LayerGroup()

// // Grabbing our GeoJSON data..
// d3.json(geoData, function (data) {
//     // Create a new choropleth layer
//     geojson3 = L.choropleth(data, {
  
//         // Define what  property in the features to use
//         valueProperty: "Income per capita", ///////////////////////CHANGE 2010-2020
  
//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],
  
//         // Number of breaks in step range
//         steps: 6,
  
//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.7
//         },
//         // Binding a pop-up to each layer
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
//                 "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
//         }  
//     }).addTo(IncPerCap)

//     var legend3 = L.control({position: "bottomleft"});
//     legend3.onAdd = function () {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson3.options.limits;
//         var colors = geojson3.options.colors;
//         var labels = [];
    
//         // Add min & max
//         var legendInfo = "<h5>Income Per Capita</h5>" +
//             "<div class=\"labels\">" +
//             "<div class=\"min\">" + limits[0] + "</div>" +
//             "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//             "</div>";
    
//         div.innerHTML = legendInfo;
    
//         limits.forEach(function (limit, index) {
//             labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//         });
    
//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//         return div;
//     };
    
//     // Adding legend to the map
//     legend3.remove(map);

//     map.on('overlayadd', function(eventLayer){
//         if (eventLayer.name === 'Real Estate Prices'){
//             map.removeControl(legend3);
//         } else if (eventLayer.name === 'Bachelors Degree') {
//             map.removeControl(legend3);
//         } else if (eventLayer.name === 'Income Per Capita') {
//             map.addControl(legend3);
//         } else if (eventLayer.name === 'Median Age Male') {
//             map.removeControl(legend3);
//         } else if (eventLayer.name === 'Median Age Female') {
//             map.removeControl(legend3);
//         } else if (eventLayer.name === 'Public Transportation') {
//             map.removeControl(legend3);
//         }
//     });     
// });

// /////////////////////////////////MEDIAN AGE MALE/////////////////////////////////////
// var MedAgeMale = new L.LayerGroup()

// // Grabbing our GeoJSON data..
// d3.json(geoData, function (data) {
//     // Create a new choropleth layer
//     geojson4 = L.choropleth(data, {
  
//         // Define what  property in the features to use
//         valueProperty: "Median Age Male", ///////////////////////CHANGE 2010-2020
  
//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],
  
//         // Number of breaks in step range
//         steps: 6,
  
//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.7
//         },
//         // Binding a pop-up to each layer
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
//                 "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
//         }  
//     }).addTo(MedAgeMale)

//     var legend4 = L.control({position: "bottomleft"});
//     legend4.onAdd = function () {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson4.options.limits;
//         var colors = geojson4.options.colors;
//         var labels = [];
    
//         // Add min & max
//         var legendInfo = "<h5>Median Age Male</h5>" +
//             "<div class=\"labels\">" +
//             "<div class=\"min\">" + limits[0] + "</div>" +
//             "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//             "</div>";
    
//         div.innerHTML = legendInfo;
    
//         limits.forEach(function (limit, index) {
//             labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//         });
    
//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//         return div;
//     };
    
//     // Adding legend to the map
//     legend4.remove(map);

//     map.on('overlayadd', function(eventLayer){
//         if (eventLayer.name === 'Real Estate Prices'){
//             map.removeControl(legend4);
//         } else if (eventLayer.name === 'Bachelors Degree') {
//             map.removeControl(legend4);
//         } else if (eventLayer.name === 'Income Per Capita') {
//             map.removeControl(legend4);
//         } else if (eventLayer.name === 'Median Age Male') {
//             map.addControl(legend4);
//         } else if (eventLayer.name === 'Median Age Female') {
//             map.removeControl(legend4);
//         } else if (eventLayer.name === 'Public Transportation') {
//             map.removeControl(legend4);
//         }
//     });      
// });

// /////////////////////////////////MEDIAN AGE FEMALE/////////////////////////////////////
// var MedAgeFemale = new L.LayerGroup()

// // Grabbing our GeoJSON data..
// d3.json(geoData, function (data) {
//     // Create a new choropleth layer
//     geojson5 = L.choropleth(data, {
  
//         // Define what  property in the features to use
//         valueProperty: "Median Age Female", ///////////////////////CHANGE 2010-2020
  
//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],
  
//         // Number of breaks in step range
//         steps: 6,
  
//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.7
//         },
//         // Binding a pop-up to each layer
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
//                 "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
//         }  
//     }).addTo(MedAgeFemale)

//     var legend5 = L.control({position: "bottomleft"});
//     legend5.onAdd = function () {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson5.options.limits;
//         var colors = geojson5.options.colors;
//         var labels = [];
    
//         // Add min & max
//         var legendInfo = "<h5>Median Age Female</h5>" +
//             "<div class=\"labels\">" +
//             "<div class=\"min\">" + limits[0] + "</div>" +
//             "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//             "</div>";
    
//         div.innerHTML = legendInfo;
    
//         limits.forEach(function (limit, index) {
//             labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//         });
    
//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//         return div;
//     };
    
//     // Adding legend to the map
//     legend5.remove(map);

//     map.on('overlayadd', function(eventLayer){
//         if (eventLayer.name === 'Real Estate Prices'){
//             map.removeControl(legend5);
//         } else if (eventLayer.name === 'Bachelors Degree') {
//             map.removeControl(legend5);
//         } else if (eventLayer.name === 'Income Per Capita') {
//             map.removeControl(legend5);
//         } else if (eventLayer.name === 'Median Age Male') {
//             map.removeControl(legend5);
//         } else if (eventLayer.name === 'Median Age Female') {
//             map.addControl(legend5);
//         } else if (eventLayer.name === 'Public Transportation') {
//             map.removeControl(legend5);
//         }
//     });
// });

// /////////////////////////////////PUBLIC TRANSPORTATION/////////////////////////////////////
// var PubTrans = new L.LayerGroup()

// // Grabbing our GeoJSON data..
// d3.json(geoData, function (data) {
//     // Create a new choropleth layer
//     geojson6 = L.choropleth(data, {
  
//         // Define what  property in the features to use
//         valueProperty: "Public transportation", ///////////////////////CHANGE 2010-2020
  
//         // Set color scale
//         scale: ["#ffffb2", "#b10026"],
  
//         // Number of breaks in step range
//         steps: 6,
  
//         // q for quartile, e for equidistant, k for k-means
//         mode: "q",
//         style: {
//             // Border color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.7
//         },
//         // Binding a pop-up to each layer
//         onEachFeature: function (feature, layer) {
//             layer.bindPopup("RegionName: " + feature.properties.neighborhood + "<br>Average Home Values: " +
//                 "$" + feature.properties.avg2019); /////////////////////////////////////////////////////////CHANGE 2010-2020
//         }  
//     }).addTo(PubTrans)

//     var legend6 = L.control({position: "bottomleft"});
//     legend6.onAdd = function () {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson6.options.limits;
//         var colors = geojson6.options.colors;
//         var labels = [];
    
//         // Add min & max
//         var legendInfo = "<h5>Public Transportation</h5>" +
//             "<div class=\"labels\">" +
//             "<div class=\"min\">" + limits[0] + "</div>" +
//             "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//             "</div>";
    
//         div.innerHTML = legendInfo;
    
//         limits.forEach(function (limit, index) {
//             labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//         });
    
//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//         return div;
//     };
    
//     // Adding legend to the map
//     legend6.remove(map);

//     map.on('overlayadd', function(eventLayer){
//         if (eventLayer.name === 'Real Estate Prices'){
//             map.removeControl(legend6);
//         } else if (eventLayer.name === 'Bachelors Degree') {
//             map.removeControl(legend6);
//         } else if (eventLayer.name === 'Income Per Capita') {
//             map.removeControl(legend6);
//         } else if (eventLayer.name === 'Median Age Male') {
//             map.removeControl(legend6);
//         } else if (eventLayer.name === 'Median Age Female') {
//             map.removeControl(legend6);
//         } else if (eventLayer.name === 'Public Transportation') {
//             map.addControl(legend6);
//         }
//     });
// });

// /////////////////////////////////LAYER CONTROL/////////////////////////////////////

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
// attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
// tileSize: 512,
// maxZoom: 20,
// zoomOffset: -1,
// id: "mapbox/streets-v11",
// accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA" ///////////////DONT FORGET TO GET RID OF THIS
// }).addTo(map);

// var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     //attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
// });

// var standard = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     //attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 20,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: "pk.eyJ1Ijoiam9zaHVham9ubWUiLCJhIjoiY2tmcHlyeTllMDBsdjJzcWw5MnJtYnF2dSJ9.dyS8tMHNg1m8QpV3_eAwOA"
// });

// // Only one base layer can be shown at a time
// var baseMaps = {
//     Day: standard,
//     Night: dark,
// };
// // overlays.addTo(map);
// //Overlays that may be toggled on or off
// var overlayMaps = {
//     'Real Estate Prices': RealEstate,
//     'Bachelors Degree':Bach,
//     'Income Per Capita':IncPerCap,
//     'Median Age Male': MedAgeMale,
//     'Median Age Female':MedAgeFemale,
//     'Public Transportation':PubTrans,
// };

// L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(map);

>>>>>>> Stashed changes

