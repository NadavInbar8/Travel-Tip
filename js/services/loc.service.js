import { UTILS } from './utils.js';
export const locService = {
  getLocs,
};

const locs = [
  { name: 'Greatplace', lat: 32.047104, lng: 34.832384, id: 10001 },
  { name: 'Neveragain', lat: 32.047201, lng: 34.832581, id: 10002 },
];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}
