// list of array to style map
var styles = [{
        "elementType": "geometry",
        "stylers": [{
            "color": "#212121"
        }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#757575"
        }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#212121"
        }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{
            "color": "#757575"
        }]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#9e9e9e"
        }]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#bdbdbd"
        }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#757575"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{
            "color": "#181818"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#616161"
        }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [{
            "color": "#1b1b1b"
        }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{
            "color": "#2c2c2c"
        }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#8a8a8a"
        }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
            "color": "#373737"
        }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
            "color": "#3c3c3c"
        }]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [{
            "color": "#4e4e4e"
        }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#616161"
        }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#757575"
        }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
            "color": "#000000"
        }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#3d3d3d"
        }]
    }
];

// declaring global map and markers variable
var map;

// Create a blank array for markers.
var markers = [];

// model 
var locations = [{
        title: 'The Park Ultra Lounge',
        location: {
            lat: 38.5769132,
            lng: -121.4887935
        }
    },
    {
        title: 'The Mix',
        location: {
            lat: 38.5761951,
            lng: -121.4874034
        }
    },
    {
        title: 'Social Night Club',
        location: {
            lat: 38.5788195,
            lng: -121.4959622
        }
    },
    {
        title: 'District 30',
        location: {
            lat: 38.5787285,
            lng: -121.4953774
        }
    },
    {
        title: 'The Pier Lounge',
        location: {
            lat: 38.5825062,
            lng: -121.5028397
        }
    }
];

var Location = function(data) {
    var self = this;
    self.title = data.title;
    self.location = data.location;
    self.showLocation = ko.observable();
};

//View Model
var ViewModel = function() {
    var self = this;

    // creates a copy of array of locations
    self.places = ko.observableArray(locations);
    self.search = ko.observable('');
    this.visibleExample = ko.observable(false);

    self.locationList = ko.observableArray([]);
    locations.forEach(function(locationsItem) {
        //console.log(locationsItem);
        self.locationList.push(new Location(locationsItem));
    });
    //Searches locations for the names that match the search box and add them to the list of array
    self.filter = ko.computed(function() {
        var value = self.search();
        var loc = self.locationList();
        for (var i = 0; i < loc.length; i++) {
            if (loc[i].title.toLowerCase().indexOf(value) >= 0) {
                loc[i].showLocation(true);
                if (loc[i].marker) {
                    loc[i].marker.setVisible(true);
                }

            } else {
                loc[i].showLocation(false);
                if (loc[i].marker) {
                    loc[i].marker.setVisible(false);
                }
            }
        }
    });

    // triggers the marker when a user clicks a location in the list
    self.showInfo = function(locations) {
        google.maps.event.trigger(locations.marker, 'click');

    };

};

// hamburger menu list
function clickMe() {
    this.visibleExample(!this.visibleExample());

}

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });

        infowindow.open(map, marker);

        $.ajax({
            url: 'https://api.foursquare.com/v2/venues/search',
            dataType: 'jsonp',
            data: {
                ll: '38.5816, -121.4944',
                query: marker.title,
                client_id: 'XAJ3SDOMVGLVKSACBTU3O4XN31HVOYEQIY4QGABJPXCURHRO',
                client_secret: '0NPX4QW5S24TRLLQNAPGLW5GGA5MYNCOG351AMYBCIBVLSAS',
                v: '20170502'
            }

        }).success(function(data) {
            // If data has a venues object set the first one to the var venue                
            var venue = data.response.hasOwnProperty("venues") ? data.response.venues[0] : '';
            // if data has a url property, set it to var website
            var website = venue.hasOwnProperty("url") ? venue.url : '';
            // if data has a contact property, set it to var contact
            var contact = venue.hasOwnProperty("contact") ? venue.contact : '';
            // if data has a location property, set it to var loocation
            var location = venue.hasOwnProperty('location') ? venue.location : '';
            // if contact has property formattedPhone, set it to var phone
            var phone = contact.formattedPhone || '';
            if (contact.hasOwnProperty('formattedPhone')) {}
            // if contact has property twitter, set it to var tweet
            var tweet = contact.twitter || '';
            if (contact.hasOwnProperty('twitter')) {}
            // if contact has property facebookUsername, set it to var fb
            var fb = contact.facebookUsername || '';
            if (contact.hasOwnProperty('facebookUsername')) {}
            // if location has a property of address, set it to var address
            var address = location.address || '';
            if (location.hasOwnProperty('address')) {}

            infowindow.setContent('<div>' + '<center><h3>' + '<a href="' + website + '" target="_blank">' + marker.title + '</a>' + '</h3></center>' + '<p>' + 'Address: ' + address + '<br>' + 'Phone: ' + phone +
                '<br><center>Social Media: ' + '<br>' + 'www.twitter.com/' + tweet + '<br>' + 'www.facebook.com/' + fb + '</center></p>' + '</div>');

        }).fail(function(e) {
            // if data not, find set the content to show error message
            infowindow.setContent('<h5>Cannot find Foursquare data.</h5>');

        });

    }
}

var initMap = function() {
    // Create a new map 
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.5816,
            lng: -121.4944
        },
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    var defaultIcon = makeMarkerIcon('9400D3');

    var largeInfowindow = new google.maps.InfoWindow();
    // creates an array of markers on initialize.
    viewModel.locationList().forEach(function(i) {
        // Get the position from the location array.
        var position = i.location;
        var title = i.title;
        console.log(i.address);
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        i.marker = marker;

        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            // Add functionaility to animate markers
            var self = this;
            self.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                self.setAnimation(null);
            }, 800);
            populateInfoWindow(this, largeInfowindow);
        });

});

    };

mapError = function() {
     alert("Cannot load map!");
};

function makeMarkerIcon(markerColor) {

    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel);
