"use strict";

let htmlAddButton, htmlWave, htmlPercentage;

const fetchFromAPI = function (url) {
  fetch(url, {
    method: "GET",
    headers: {
      "x-api-key":
        "b80bf5de9fc0c4b3b5d76b38251fb5c88318bfc700b77bbb294ddd4871246e9e",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

document.addEventListener("DOMContentLoaded", function () {
  let lat = "50.8194776";
  let lng = "3.2577263";
  //   let url = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lng}`;
  fetchFromAPI(url);
});
