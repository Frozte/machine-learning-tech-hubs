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