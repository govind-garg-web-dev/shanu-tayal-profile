var google;

function initMap() {
  // Basic options for a simple Google Map
  var myLatlng = new google.maps.LatLng(29.439180, 77.306980);

  var mapOptions = {
    zoom: 7,
    center: myLatlng,
    scrollwheel: false,
    styles: [
      // Map styles
    ]
  };

  var mapElement = document.getElementById('map');
  var map = new google.maps.Map(mapElement, mapOptions);

  var addresses = ['Brooklyn'];

  for (var x = 0; x < addresses.length; x++) {
    var address = addresses[x];
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address) + '&sensor=false')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var p = data.results[0].geometry.location;
        var latlng = new google.maps.LatLng(p.lat, p.lng);
        new google.maps.Marker({
          position: latlng,
          map: map,
          icon: 'images/loc.png'
        });
      })
      .catch(function (error) {
        console.log('Error:', error);
      });
  }
}

google.maps.event.addDomListener(window, 'load', initMap);
