import map from "./map.js";

function init() {
  //Initialize variables
  var id = null;
  var flag = false;
  var zoomFlag = true;
  var counter = 0;
  var marker = new maplibregl.Marker();

  //Initialize DOM elements
  const startBtn = document.getElementById("startBtn");
  const detailsBtn = document.getElementById("detailsBtn");
  const closeBtn = document.getElementById("closeBtn");
  const modal = document.querySelector(".div-modal");
  const modalContent = document.querySelector(".div-modal-content");

  //Watch Position Objects and Methods
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(p) {
    const c = p.coords;

    marker.setLngLat([c.longitude, c.latitude]);
    map.setCenter([c.longitude, c.latitude]);
    marker.addTo(map);
    if (zoomFlag) {
      map.zoomTo(17, { duration: 1000 });
    } else {
      return;
    }
    zoomFlag = false;
    modalContent.innerHTML += `<div>${counter++}: ${c.longitude}, ${
      c.latitude
    }</div>`;
  }

  function error(err) {
    console.error(`ERROR(${err.code}): ${err.message}`);
    alert(err.message);
  }

  function watchPosition() {
    if (!navigator.geolocation) {
      alert("Geolocalization is not supported by you current browser");
    } else {
      id = navigator.geolocation.watchPosition(success, error, options);
    }
  }

  startBtn.addEventListener("click", () => {
    flag = !flag;

    if (flag) {
      watchPosition();
      startBtn.innerText = "Stop";
    } else {
      startBtn.innerText = "Start";
      navigator.geolocation.clearWatch(id);
      zoomFlag = true;
    }
  });

  //Event Open Details Modal
  detailsBtn.addEventListener("click", () => {
    modal.classList.add("div-modal-show");
  });
  //Event Close Details Modal
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("div-modal-show");
  });
}

window.onload = () => {
  init();
};
