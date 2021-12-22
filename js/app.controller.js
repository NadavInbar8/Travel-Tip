import { locService } from './services/loc.service.js';
import { mapService } from './services/map.service.js';
import { STORAGE } from './services/storage.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeleteLocation = onDeleteLocation;

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
    const storageLocs = STORAGE.load(STORAGE.STORAGE_KEY);
    const locations = locs;
    locations.forEach((loc) => {
      storageLocs[loc.name] = loc;
    });
    STORAGE.save(STORAGE.STORAGE_KEY, storageLocs);
    console.log('storage items: ', storageLocs);
    renderTable(storageLocs);

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
      console.log(pos.coords.latitude, pos.coords.latitude)
      onPanTo(pos.coords.latitude, pos.coords.latitude);
    })
    .catch((err) => {
      console.log('err!!!', err);
    });
}
function onPanTo(lat, lng) {
  console.log('Panning the Map');
  mapService.panTo(lat, lng);
}

function onDeleteLocation(name) {
  const storageLocs2 = STORAGE.load(STORAGE.STORAGE_KEY);
  delete storageLocs2[name];
  STORAGE.save(STORAGE.STORAGE_KEY, storageLocs2);
  renderTable(storageLocs2);
  mapService.initMap();
  //console.log(storageLocs[key].name);
  // delete storageLocs.key;
}

function renderTable(dbLoc) {
  let strHTML = '';

  for (const key in dbLoc) {
    strHTML += `<tr>
        <td>${dbLoc[key].name}</td><td>${dbLoc[key].lat}</td><td>${dbLoc[key].lng}</td><td><button onClick="onPanTo(${dbLoc[key].lat},${dbLoc[key].lng})">Go</button></td> <td><button onClick="onDeleteLocation('${dbLoc[key].name}')">Delete</button></td>
        </tr>`;
  }
  document.querySelector('tbody').innerHTML = strHTML;
}

export const appController = {
  renderTable,
};
