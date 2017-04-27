// sidebar
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

 var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];

      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

// model 
var model = [{title: 'The Park Ultra Lounge', location: {lat: 38.5769132, lng: -121.4887935}},
          {title: 'The Mix', location: {lat: 38.5761951, lng: -121.4874034}},
          {title: 'Social Night Club', location: {lat: 38.5788195, lng: -121.4959622}},
          {title: 'District 30', location: {lat: 38.5787285, lng: -121.4953774}},
          {title: 'The Pier Lounge', location: {lat: 38.5825062, lng: -121.5028397}}
        ];

// global variables
var markers;
// Create a new blank array for all the listing markers.
markers = [];

var map;

var infoWindow;
//String to display in info window
var content = '';


// Object constructor
var Location = function (data) {
    this.title=ko.observable(data.title);
   // this.address=ko.observable(data.address);
   // this.city=ko.observable(data.city);
   // this.state=ko.observable(data.state);
   // this.zip=ko.observable(data.zip);
  //  this.website=ko.observable(website.zip);
    };

// View Model
var viewModel = function () {
    var self = this;
    self.markers = [];

    // create a copy of model in an Array view function locationList()
    this.locationList=ko.observableArray([]);


// venues/explore?ll=lat,-long
    function fourSquare(data) {
    var llat = data.location.lat;
    var llng = data.location.lng;
        var errorMsg;
        var resp;
    var clientId = "XAJ3SDOMVGLVKSACBTU3O4XN31HVOYEQIY4QGABJPXCURHRO";
    var clientSecret = "0NPX4QW5S24TRLLQNAPGLW5GGA5MYNCOG351AMYBCIBVLSAS";
    var url = "https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=" + clientId + "&client_secret=" + clientSecret + "&v=" + llat + llng;
    
              $.ajax({
            url: url,
            datatype: "jsonp",
            success: function(response) {
                resp = response.response.groups[0].items[0].venue;
                //Build infoWindow content string with data from API Request
                infoWindow.setContent('<a href="' + data.url + '">' + resp.name + '</a>' + '<br>' + data.phone + '<br>' + data.address + '<br>' + resp.location.city + ', ' + resp.location.state + ' ' + resp.location.postalCode + '<br>' + data.description + '<br>'  + '<a href="' + data.website + '">' + data.website + '</a>' + '<br>' + '<a href="' + data.twitterLink + '">' + '@' + data.twitter + '</a>');
                
                infoWindow.open(map, data.marker); //open the info window
            }, // Error method to be run if request fails
            error: function(url, errorMsg) {
                setTimeout(function() { // Display error after 2 seconds if Request to API fails
                    if (errorMsg) {
                        infoWindow.setContent("I'm sorry, an error has occurred. Please try again later.");
                        infoWindow.open(map, data.marker);
                    }
                }, 2000);
            }
            
        });
        

    }

    model.forEach(function(locationsItem){
        //console.log(locationsItem);
        self.locationList.push(new Location(locationsItem));
    });
}

//create our api request foursquare

//var myInfoWindow;

   this.setMarker = function(){
         // alert("it works");
       
};

          function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
        }
      }

 var map;

// Create a new blank array for all the listing markers.
var markers = [];

var initMap = function() {
    
    //Create a new map 
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.5816, lng: -121.4944},
          zoom: 13,
          styles: styles,
          mapTypeControl: false
        });

        var defaultIcon = makeMarkerIcon('9400D3');
        // Create a "highlighted location" marker color for when the user
        // mouses over the marker.
        var highlightedIcon = makeMarkerIcon('FFFFFF');

    var largeInfowindow = new google.maps.InfoWindow();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < vm.filteredLocations().length; i++) {
        // Get the position from the location array.
        var position = vm.filteredLocations()[i].location;
        var title = vm.filteredLocations()[i].title;
        console.log(vm.filteredLocations()[i].address);
        // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });
        vm.filteredLocations()[i].marker = marker;


        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
        // Push the marker to our array of markers.
        //markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            //Add functionaility to animate markers
            var self = this;
            self.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                self.setAnimation(null);
            }, 1400);
            populateInfoWindow(this, largeInfowindow);
        });

    }
}


          function makeMarkerIcon(markerColor) {

        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }


ko.applyBindings(new viewModel());



