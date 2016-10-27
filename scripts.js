function initialize() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 49.2832967, lng: -123.1229513},
		zoom: 13
	});
	
	var input = $('#search-input');
	
	var autocomplete = new google.maps.places.Autocomplete(input.get(0), { types: ['address'] });
	autocomplete.bindTo('bounds', map);

	var infowindow = new google.maps.InfoWindow();

	var marker = new google.maps.Marker({
		map: map,
		anchorPoint: new google.maps.Point(0, -29),
		icon: {
			url: 'cursor.svg',
			origin: new google.maps.Point(0, 0),
			scaledSize: new google.maps.Size(48, 48)
		}
	});

	autocomplete.addListener('place_changed', function() {
	    infowindow.close();
	    marker.setVisible(false);
		
	    var place = autocomplete.getPlace();
		
		if(!place || !place.geometry) {
			$('.input-group').addClass('warning');
			return;
		}
		
		$('.input-group').removeClass('warning');
		
		marker.setPosition(place.geometry.location);
	    marker.setVisible(true);
		
		map.panTo(place.geometry.location);
		
	    infowindow.setContent('<div class="map-marker">' + place.name + '</div>');
	});

	$('#search-button').click(function() {
		google.maps.event.trigger(autocomplete, 'place_changed');
	});

	google.maps.event.addListener(marker, 'click', function() {
	  	infowindow.open(map, marker);
	});
}