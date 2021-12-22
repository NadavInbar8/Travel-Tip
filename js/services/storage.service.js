let STORAGE_KEY = 'locationsDB';

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}

export const STORAGE = {
  STORAGE_KEY: STORAGE_KEY,
  save: saveToStorage,
  load: loadFromStorage,
};
