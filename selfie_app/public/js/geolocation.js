let dataCoords = {};

let $postBtn = document.getElementById("postCoords");
let $input = document.getElementById("comment");

$input.addEventListener("change", () => {
  dataCoords.comment = $input.value;
});

$postBtn.addEventListener("click", (e) => {
  //Get geolocation object each time the user click on it
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const timestamp = position.timestamp;

    let date = new Date(timestamp);
    let fullDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    let hour = `${
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    }`;
    let minutes = `${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;

    let time = `${hour}:${minutes} - ${fullDate}`;

    dataCoords.lat = lat;
    dataCoords.lon = lon;
    dataCoords.time = time;

    //Send coords to the server
    let post = await postRecords("/api", dataCoords);
    console.log(post);
  });
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("lat").textContent = lat + "º";
    document.getElementById("lon").textContent = lon + "º";
    //To search on maps the order is latitude - longitude
    var mymap = L.map("leafletMap").setView([lat, lon], 13); //Leaflet library

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
      {
        maxZoom: 18,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(mymap);

    L.marker([lat, lon]).addTo(mymap).bindPopup("Location").openPopup();
  });
}

const postRecords = async (url, data) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let response = await fetch(url, options);
  let dataServer = await response.json();
  return dataServer;
};
