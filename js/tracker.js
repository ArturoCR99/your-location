import map from "./map.js";

function init() {
  let id = null;
  let flag = false;

  var marker = new maplibregl.Marker();

  const startBtn = document.getElementById("startBtn");
  const detailsBtn = document.getElementById("detailsBtn");
  const closeBtn = document.getElementById("closeBtn");
  const modal = document.querySelector(".div-modal");
  const modalContent = document.querySelector(".div-modal-content");

  if (!navigator.geolocation in navigator) {
    return alert("Tu navegador no soporta el acceso a la ubicación");
  }

  const onGetLocation = (location) => {
    const xy = location.coords;
    console.log("Latitude: " + xy.latitude, " Longitude: " + xy.longitude);
    modalContent.innerHTML += `<div>Latitud: ${xy.latitude}, Longitud: ${xy.longitude}</div>`;
    marker.setLngLat([xy.longitude, xy.latitude]);
    map.setCenter([xy.longitude, xy.latitude]);
    map.zoomTo(17);
  };

  const onError = (error) => {
    console.log("Hubo un error, espero haberte ayudado " + error);
  };

  const setOptions = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  };

  startBtn.addEventListener("click", () => {
    flag = !flag;
    if (flag) {
      id = navigator.geolocation.watchPosition(
        onGetLocation,
        onError,
        setOptions
      );
      startBtn.innerText = "Stop";
      console.log("Tracking is On");
      marker.addTo(map);
    } else {
      navigator.geolocation.clearWatch(id);
      startBtn.innerText = "Start";
      console.log("Tracking is Off");
      marker.remove();
    }
  });

  detailsBtn.addEventListener("click", () => {
    modal.classList.add("div-modal-show");
  });
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("div-modal-show");
  });
}

window.onload = () => {
  init();
};
