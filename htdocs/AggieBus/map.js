function initMap() {

    var tamu = {
        lat: 30.6187175,
        lng: -96.3386624
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        minZoom: 15,
        maxZoom: 15,
        disableDefaultUI: true,
        center: tamu,
        mapTypeId: 'roadmap'
    });


    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    var geocoder = new google.maps.Geocoder;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });
    var directionsService = new google.maps.DirectionsService;
    map.controls[google.maps.ControlPosition.TOP].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    directionsDisplay.setMap(map);

    // Adds a marker at the user in the map using HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            var infowindow = new google.maps.InfoWindow({
                content: 'You are here!'
            });

            user_info.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }


            var marker = new google.maps.Marker({
                position: user_info.location,
                map: map,
                icon: iconList.user
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });

            map.setCenter(user_info.location);

        }, function() {
            // user denies location
            var infoWindow = new google.maps.InfoWindow({
                map: map,
                content: 'Error: Enable geolocation.',
                position: map.getCenter()
            });
        });
    } else {
        // Browser doesn't support Geolocation
        var infoWindow = new google.maps.InfoWindow({
            map: map,
            content: 'Error: Your browser doesn\'t support geolocation.',
            position: map.getCenter()
        });
    }

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            // var icon = {
            //     url: place.icon,
            //     size: new google.maps.Size(71, 71),
            //     origin: new google.maps.Point(0, 0),
            //     anchor: new google.maps.Point(17, 34),
            //     scaledSize: new google.maps.Size(25, 25)
            // };

            user_info.destination = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };

            user_info.out = user_info.destination;
            user_info.in = user_info.location;

            var min_total = minDistance(user_info.location.lng, user_info.location.lat, user_info.destination.lng, user_info.destination.lat);
            // console.log('Min' + min_total);

            for (var index_in in bus_stops) {
                var bus_in = minDistance(user_info.location.lng, user_info.location.lat, bus_stops[index_in].lng, bus_stops[index_in].lat);

                for (var index_out in bus_stops) {
                    var bus_out = minDistance(user_info.destination.lng, user_info.destination.lat, bus_stops[index_out].lng, bus_stops[index_out].lat);

                    if (bus_stops[index_in].code == bus_stops[index_out].code && bus_in + bus_out < min_total) {
                        // console.log('new min' + (bus_in + bus_out));
                        user_info.code = bus_stops[index_in].code;

                        user_info.out = {
                            lat: bus_stops[index_out].lat,
                            lng: bus_stops[index_out].lng
                        };

                        user_info.in = {
                            lat: bus_stops[index_in].lat,
                            lng: bus_stops[index_in].lng
                        };

                        min_total = bus_in + bus_out;
                    }
                }

            }

            directionsService.route({
                origin: user_info.location,
                destination: user_info.in,
                travelMode: google.maps.TravelMode.WALKING
            }, function(response, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(response);
                    //console.log(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });

            loadBus();
        });
        // map.fitBounds(bounds);
    });
}
