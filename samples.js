/* Position vom Browser bestimmen lassen */
navigator.geolocation.getCurrentPosition(function(pos) {
    const coords = proj.fromLonLat([pos.coords.longitude, pos.coords.latitude]);
    map.getView().animate({center: coords, zoom: 10});
  });
  
  /* animiert zu Position zoomen */
  map.getView().animate({center: %coords%, zoom: 10});

  /* Marker hinzufügen */
  The vector layer itself is created with the following code, which we place between the const map and navigator.geolocation blocks in our main.js file:
  
  const position = new VectorSource();
  const vector = new VectorLayer({
    source: position
  });
  map.addLayer(vector);
  
  We now can create a point feature and add it to the vector layer as soon as we know our location. This is done with a single line at the end of the geolocation's' getCurrentPosition callback:
  
  position.addFeature(new Feature(new Point(coords)));
  
  /* Auf Klick hin an einer Position reagieren */
  window.setTimeout(function() {
    var features = [];
    map.forEachFeatureAtPixel(evt.pixel, function(feature) {
      features.push(feature);
      return false;
    });

    if (features.length === 1) {
      info.innerHTML = 'Got one butterfly';
    } else if (features.length > 1) {
      info.innerHTML = 'Got ' + features.length + ' butterflies';
    } else {
      info.innerHTML = 'Couldn\'t catch a single butterfly';
    }
  }, 1);

  /* Mauszeiger über features anders gestalten */
  map.on('pointermove', function(evt) {
    if (evt.dragging) {
      return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
  });
  