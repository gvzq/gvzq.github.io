
// load bus stops from local JSON files (source: https://transport.tamu.edu/BusRoutesFeed/api/route/XX/pattern/)
["01", "02", "03", "04", "05", "06", "08", "09", "N_W04"].forEach(function(element) {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": 'https://transport.tamu.edu/BusRoutesFeed/api/route/' + element + '/pattern/',
        "method": "GET",
        "referer": 'http://transport.tamu.edu/busroutes/Routes.aspx?r=' + element,
        "headers": {
            "cache-control": "no-cache"
        }
    }).done(function(json) {
      // console.log(json);
      json.forEach(function(stop) {
          if (stop.Stop) {
              // console.log(stop.Stop);
              bus_stops.push({
                  "code": element,
                  "name": stop.Name,
                  "stop": "true",
                  "lat": rangeConvert(stop.Latitude, 3104399.864500001, 3115336.182, 30.5433295017282, 30.6484496070038),
                  "lng": rangeConvert(stop.Longtitude, 1069337.9355999976, 1092433.6532000005, -96.4793830583237, -96.2382559121363)

              });
          } else {
              bus_stops.push({
                  "code": element,
                  "name": stop.Name,
                  "lat": rangeConvert(stop.Latitude, 3104399.864500001, 3115336.182, 30.5433295017282, 30.6484496070038),
                  "lng": rangeConvert(stop.Longtitude, 1069337.9355999976, 1092433.6532000005, -96.4793830583237, -96.2382559121363)
              });
          }

      })
    });

    // $.getJSON("./busses/bus" + element + ".json", function(json) {
    //     // console.log(json.ArrayOfPatternPoint.PatternPoint); // this will show the info it in firebug console
        // json.ArrayOfPatternPoint.PatternPoint.forEach(function(stop) {
        //     if (stop.Stop) {
        //         // console.log(stop.Stop);
        //         bus_stops.push({
        //             "code": element,
        //             "name": stop.Name,
        //             "stop": "true",
        //             "lat": rangeConvert(stop.Latitude, 3104399.864500001, 3115336.182, 30.5433295017282, 30.6484496070038),
        //             "lng": rangeConvert(stop.Longtitude, 1069337.9355999976, 1092433.6532000005, -96.4793830583237, -96.2382559121363)
        //
        //         });
        //     } else {
        //         bus_stops.push({
        //             "code": element,
        //             "name": stop.Name,
        //             "lat": rangeConvert(stop.Latitude, 3104399.864500001, 3115336.182, 30.5433295017282, 30.6484496070038),
        //             "lng": rangeConvert(stop.Longtitude, 1069337.9355999976, 1092433.6532000005, -96.4793830583237, -96.2382559121363)
        //         });
        //     }
        //
        // })
    // });

});

// loads bus location and adds marker to map
function loadBus() {
    console.log('init feed '+ user_info.code);
    feed();
    busInterval = setInterval(function() {
        console.log('check feed: ' + user_info.code);
        feed();
    }, 15000);

} //http://gis.tamu.edu/arcgis/rest/services/TS/TSbasemap092116/MapServer/info/iteminfo


function feed(){
  $.ajax({
      "async": true,
      "crossDomain": true,
      "url": 'https://transport.tamu.edu/BusRoutesFeed/api/route/' + user_info.code + '/buses/mentor',
      "method": "GET",
      "referer": 'http://transport.tamu.edu/busroutes/Routes.aspx?r=' + user_info.code,
      "headers": {
          "cache-control": "no-cache"
      }
  }).done(function(response) {

      if (response.length > 0) {
          const bus = response[0];
          const work = bus.CurrentWork;
          // console.log(work.Route.Name); //+ ' Bus #' + work.Route.RouteNumber);
      }
      deleteMarkers();
      for (i = 0; i < response.length; i++) {

          //console.log('parsing bus num:' + (i + 1));
          let bus = response[i];
          let bus_gps = bus.GPS;

          let work = bus.CurrentWork;
          let name = work.Route.Name;

          let cap = bus.APC.PassengerCapacity;
          let rem = bus.APC.TotalPassenger;

          let stops;
          if (bus.NextStops[0]) {
              stops = bus.NextStops[0];
          }
          let next = stops.Name;

          let est = stops.EstimatedDepartTime;
          let sch = stops.ScheduledDepartTime;
          const regex_e = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)(-\d+:\d+)/g;
          const regex_s = /^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)(-\d+:\d+)/g;

          let est_time = regex_e.exec(est);
          let sch_time = regex_s.exec(sch);

          let est_time_parse = new Date(est_time[1], est_time[2], est_time[3], est_time[4], est_time[5], est_time[6]);
          let sch_time_parse = new Date(sch_time[1], sch_time[2], sch_time[3], sch_time[4], sch_time[5], sch_time[6]);

          // FUCKING BASEMAP FROM ArcGIS at console using 'MapController.baseMap' (http://gis.tamu.edu/arcgis/rest/services/TS/TSbasemap092116/MapServer)
          let newLat = rangeConvert(bus_gps.Lat, 3104399.864500001, 3115336.182, 30.5433295017282, 30.6484496070038);
          let newLng = rangeConvert(bus_gps.Long, 1069337.9355999976, 1092433.6532000005, -96.4793830583237, -96.2382559121363);

          // var info = '<h1 id="heading">' + name + '</h1>' +
          //     '<div id="bodyContent">' +
          //     '<p>' +
          //     'Next Stop: <b>' + next + '</b><br>' +
          //     'Estimated Depart Time: ' + est_time_parse.toLocaleTimeString() + '<br>' +
          //     'Schedule Departure Time: ' + sch_time_parse.toLocaleTimeString() +
          //     '</p>' +
          //     '</div>';

          let info = 'Next Stop: ' + next;

          let infowindow_b = new google.maps.InfoWindow({
              content: info
          });

          let marker_b = new google.maps.Marker({
              position: {
                  lat: newLat,
                  lng: newLng
              },
              map: map,
              icon: iconList.bus
          });

          marker_b.addListener('click', function() {
              infowindow_b.open(map, marker_b);
          });

          markers.push(marker_b);

      }
  });
}
