    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.581572, lng: -121.4944},
          zoom: 13
        });
        var sacramento = {
        	lat: 38.581572,
        	lng: -121.4944
        };
        var marker = new google.maps.Marker({
        	position: sacramento,
        	map: map,
        	title: 'First Marker!'
        });
        var infowindow = new google.maps.InfoWindow({ 
        	content: 'This is the info marker used for each pin!'
        });

        marker.addListener('click', function(){
        	infowindow.open(map, marker);
        });

      }
    </script>
