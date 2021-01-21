// making a map and tiles
const mymap = L.map("issmap").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "issimg.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const issApiUrl = "https://api.wheretheiss.at/v1/satellites/25544";

let firstTime = true;
async function getISS() {
  const response = await fetch(issApiUrl);
  const data = await response.json();
  const { visibility, latitude, longitude } = data;
  // console.log(data);
  //   console.log(latitude);
  //   console.log(longitude);
  //   console.log(visibility);
  //   L.marker([latitude, longitude]).addTo(mymap);
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 5);
    firstTime = false;
  }
  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("vis").textContent = visibility;
}

getISS();
setInterval(getISS, 1000);
