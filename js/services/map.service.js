import { API_KEY } from '../personal.js';
import { STORAGE } from './storage.service.js';
import { UTILS } from './utils.js';

export const mapService = {
  initMap,
  addMarker,
  panTo,
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  const myLatLng = { lat: lat, lng: lng };
  console.log('InitMap');
  return _connectGoogleApi().then(() => {
    console.log('google available');
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: myLatLng,
      zoom: 15,
    });

    let infoWindow = new google.maps.InfoWindow({
      content: 'click me to get lat/lng',
      position: myLatLng,
    });
    infoWindow.open(gMap);

    gMap.addListener('click', (mapsMouseEvent) => {
        // close the current window
        infoWindow.close();
        // create new window
        infoWindow = new google.maps.InfoWindow({
        position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
        `the Lat is ${mapsMouseEvent.latLng
            .toJSON()
            .lat.toFixed(2)} and the Lng ${mapsMouseEvent.latLng
                .toJSON()
          .lng.toFixed(2)}`
          // JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
          );
          var name = prompt('enter the location name');
          var location = STORAGE.load(STORAGE.STORAGE_KEY) || {};
          if (location[name]) {
              alert(
                  'there already is a location by that name please use different name'
                  );
                } else {
                    let pos = mapsMouseEvent.latLng;
          addMarker(pos)
        let loc = {
          name: '',
          lat: 0,
          lng: 0,
          pos: pos,
          id: UTILS.getRandomInt(10000, 99000),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };``
        loc.name = name;
        loc.lat = mapsMouseEvent.latLng.toJSON().lat;
        loc.lng = mapsMouseEvent.latLng.toJSON().lng;
        console.log(loc);
        location[name] = loc;
    
        STORAGE.save(STORAGE.STORAGE_KEY, location);
      }

      infoWindow.open(gMap);
    });
    console.log('Map!', gMap);
    const PLACES = STORAGE.load(STORAGE.STORAGE_KEY);
    for (let place in PLACES) {
        addMarker(PLACES[place].pos);
    }
});
}

function addMarker(loc) {
    console.log(loc)
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  var elGoogleApi = document.createElement('script');
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  console.log('hello');
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject('Google script failed to load');
  });
}