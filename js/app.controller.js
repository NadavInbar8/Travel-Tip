import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { STORAGE } from './services/storage.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
const storageLocs = STORAGE.load(STORAGE.STORAGE_KEY);

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready');
    })
    .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos');
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log('Adding a marker');
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    // console.log('Locations:', locs);
    const locations = locs;
    console.log(storageLocs);
    let strHTML = '';
    locations.map((location) => {
      strHTML += `<tr>
        <td>${location.name}</td><td>${location.lat}</td><td>${location.lng}</td> <td><button onClick="onPanTo(${location.lat},${location.lng})">Go</button></td> <td><button onClick="onDeleteLocation(${location.id})">Delete</button></td>
        </tr>`;
    });
    for (const key in storageLocs) {
      strHTML += `<tr>
        <td>${storageLocs[key].name}</td><td>${storageLocs[key].lat}</td><td>${storageLocs[key].lng}</td><td><button onClick="onPanTo(${storageLocs[key].lat},${storageLocs[key].lng})">Go</button></td> <td><button onClick="onDeleteLocation(${storageLocs[key].id})">Delete</button></td>
        </tr>`;
    }
    document.querySelector('tbody').innerHTML = strHTML;
    // locations.document.querySelector('.locs').innerText = JSON.stringify(locs);
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords);
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}
function onPanTo(lat, lng) {
  console.log('Panning the Map');
  mapService.panTo(lat, lng);
}

function onDeleteLocation(id) {
  // storageLocs.splice();
}
