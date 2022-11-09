"use strict";

// #region Event Variables
let htmlAddButton,
  htmlWave,
  htmlPercentage,
  historicalSpeciesName,
  historicalSubSpeciesName,
  historicalSpeciesCount,
  historicalRisk,
  historicalBarValue;

let testJsonData =
  "{" +
  '"Count": [' +
  '{"tree_pollen": 0 },' +
  '{"grass_pollen": 147},' +
  '{"weed_pollen": 361}],' +
  '"Risk": [' +
  '{"grass_pollen": "High"},' +
  '{"tree_pollen": "Low"},' +
  '{"weed_pollen": "Very High"}],' +
  '"Species": [' +
  '{"grass": [{"Poaceae": 100}]},' +
  '{"tree": [{"Alder": 90}, {"Birch": 112}, {"Cypress": 50}, {"Elm": 200}, {"Hazel": 33}]},' +
  '{"weed": [{"Chenopod": 100}, {"Mugwort": 8}, {"Nettle": 23}, {"Ragweed": 44}]}],' +
  '"updatedAt": "2022-07-25T05:09:30.000Z"' +
  "}";

let testJsonDataHistorical =
  "{" +
  '"Count": [' +
  '{"tree_pollen": 0 },' +
  '{"grass_pollen": 136},' +
  '{"weed_pollen": 461}],' +
  '"Risk": [' +
  '{"grass_pollen": "High"},' +
  '{"tree_pollen": "Low"},' +
  '{"weed_pollen": "Very High"}],' +
  '"Species": [' +
  '{"grass": [{"Poaceae": 110}]},' +
  '{"tree": [{"Alder": 100}, {"Birch": 102}, {"Cypress": 75}, {"Elm": 222}, {"Hazel": 22}]},' +
  '{"weed": [{"Chenopod": 110}, {"Mugwort": 18}, {"Nettle": 43}, {"Ragweed": 43}]}],' +
  '"updatedAt": "2022-07-25T05:09:30.000Z"' +
  "}";
// #endregion Event Variables

const LoadCard = function (
  speciesName,
  subSpeciesName,
  speciesCount,
  risk,
  barValue,
  subSpeciesCountHistorical,
  riskHistorical,
  barValueHistorical
) {
  let icon;
  switch (speciesName) {
    case "grass":
      icon = `<svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M8 36v-1.1h9.35q-.85-3.5-3.4-6.075T8 25.4q.8-.2 1.575-.3.775-.1 1.625-.1 5.35 0 9.075 2.825Q24 30.65 24 36Zm17.1 0q0-.7-.075-1.375T24.8 33.2q1.5-3.4 4.55-5.8T36.8 25q.85 0 1.625.1t1.575.3q-3.4.85-5.95 3.45-2.55 2.6-3.4 6.05H40V36Zm-.45-3.95q-.7-3.4-.1-6.325.6-2.925 2.225-5.15Q28.4 18.35 30.875 17q2.475-1.35 5.475-1.55-3.3 2.1-5.025 4.95-1.725 2.85-2.075 5.65-1.45.8-2.925 2.625Q24.85 30.5 24.65 32.05Zm-1.35-2.5q-.75-1.05-2-2.175-1.25-1.125-2.45-1.675.2-.5.275-1.3.075-.8.075-1.5 0-3.05-.975-5.75T15.5 12.2q3 1.2 5.45 4.05 2.45 2.85 3.2 7.15-.5 1.35-.7 3.05-.2 1.7-.15 3.1Z"/></svg>`;
      break;

    case "tree":
      icon = `<svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M15.15 44v-7.45H0l9.45-13.7H4.7L18 4l6 8.5L30 4l13.3 18.85h-4.7l9.4 13.7H32.9V44h-5.75v-7.45H20.9V44ZM34 33.55h8.25l-9.45-13.7h4.45L30 9.55l-4 5.75 5.3 7.55h-4.7Zm-28.2 0h24.45l-9.45-13.7h4.45L18 9.55l-7.25 10.3h4.5Zm0 0h9.45-4.5 14.5-4.45 9.45Zm28.2 0h-7.4 4.7H26h11.25-4.45 9.45Zm-6.85 3h5.75-5.75Zm8.9 0Z"/></svg>`;
      break;

    case "weed":
      icon =
        '<svg class="c-icon" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 44q-3.6-.4-7.175-2.075-3.575-1.675-6.425-4.65-2.85-2.975-4.625-7.35T4 19.75v-1.9h1.9q2.65 0 5.65 1.025 3 1.025 5.3 2.625.4-4.5 2.4-9.275T24 4.05q2.75 3.4 4.75 8.175t2.4 9.275q2.3-1.5 5.3-2.575 3-1.075 5.65-1.075H44v1.9q0 5.8-1.775 10.175-1.775 4.375-4.625 7.35-2.85 2.975-6.425 4.65Q27.6 43.6 24 44Zm.4-3.05q-.55-9.3-5.375-14.1Q14.2 22.05 7.05 20.9q.65 9.65 5.625 14.4T24.4 40.95Zm-.45-12.25q.7-1.3 1.925-2.8 1.225-1.5 2.375-2.5.25-3.4-1-6.9Q26 13 24 9.25 22 13 20.75 16.5t-1 6.9q1.15 1 2.325 2.5 1.175 1.5 1.875 2.8Zm3.45 11.4q2.35-.85 4.675-2.25 2.325-1.4 4.2-3.65t3.15-5.525Q40.7 25.4 40.95 20.9q-5.3.85-9.35 3.775T25.65 31.9q.6 1.9 1.05 3.825.45 1.925.7 4.375Zm-3.45-11.4Zm3.45 11.4Zm-3 .85Zm1.25-9.05ZM24 44Z"/></svg>';
      break;
  }
  let htmlRow = document.querySelector(`.js-row-${speciesName}`);
  let htmlCard = `<div class="c-card c-card-unflipped">
  <div class="c-card__body">

    <div class="c-card-back">
      <div class="c-info-element c-year">
      ${1969 + Math.floor(Date.now() / (3600 * 24 * 365 * 1000), -1)}</div>
      <div class="c-card-tophalf">
      ${icon}
      <div class="c-top-info">
      <div class="c-info-element">data is recent </div>
            <div class="c-validity-indicator"></div>
          </div>
      <div class="c-form-field js-pollen_naam c-card-info c-validity">
          <div class="c-form-field js-pollen_naam c-card-info">
            <div class="c-info-element">soort: ${subSpeciesName}</div>
          </div>
        </div>
      </div>

      <div class="c-form-field js-pollen-count c-card-info">
        <div class="c-info-element">Count: ${subSpeciesCountHistorical} par/m<sup>3</sup></div>
      </div>
      <div class="c-form-field js-pollen-count c-card-info">
        <div class="c-info-element">Risico:  ${riskHistorical}</div>
      </div>
      <div>
        <input class="c-risk" type="range" disabled value="${barValueHistorical}">
      </div>
    </div>

    <div class="c-card-front">
    <div class="c-info-element c-year">
      ${1970 + Math.floor(Date.now() / (3600 * 24 * 365 * 1000), 0)}</div>
      <div class="c-card-tophalf">

        ${icon}

        <div class="c-top-info">
          <div class="c-form-field js-pollen_naam c-card-info c-validity">
            <div class="c-info-element">data is recent </div>
            <div class="c-validity-indicator"></div>
          </div>
          <div class="c-form-field js-pollen_naam c-card-info">
            <div class="c-info-element">soort: ${subSpeciesName}</div>
          </div>
        </div>
      </div>

      <div class="c-form-field js-pollen-count c-card-info">
        <div class="c-info-element">Count: ${speciesCount} par/m<sup>3</sup></div>
      </div>
      <div class="c-form-field js-pollen-count c-card-info">
        <div class="c-info-element">Risico: ${risk}</div>
      </div>
      <div>
        <input class="c-risk" type="range" disabled value="${barValue}">
      </div>
    </div>
  </div>

</div>`;
  htmlRow.innerHTML += htmlCard;
};

const LoadCards = function (jsonData) {
  document.querySelector(".js-row-grass").innerHTML = null;
  document.querySelector(".js-row-tree").innerHTML = null;
  document.querySelector(".js-row-weed").innerHTML = null;
  // wait half a second
  // delay(500);
  let barValue, barValueHistorical, subSpeciesCountHistorical, riskHistorical;
  //make json data
  const data = JSON.parse(jsonData);
  const historicalData = JSON.parse(testJsonDataHistorical);
  //define species
  let species = data.Species;
  let speciesHistorical = historicalData.Species;
  //loop through species
  for (let item in species) {
    let speciesName = Object.keys(species[item])[0];
    for (let subSpecies in species[item][speciesName]) {
      let subSpeciesName = Object.keys(
        species[item][speciesName][subSpecies]
      )[0];
      // get count of pollen
      let subSpeciesCount =
        species[item][speciesName][subSpecies][subSpeciesName];
      let subSpeciesCountHistorical =
        speciesHistorical[item][speciesName][subSpecies][subSpeciesName];
      // get risk
      let risk = data["Risk"][speciesName + "_pollen"];
      let riskHistorical = historicalData["Risk"][speciesName + "_pollen"];
      switch (speciesName.toLowerCase()) {
        case "grass":
          // #region calculate grass risk
          //current risk
          if (subSpeciesCount < 29) {
            risk = "Low";
          } else if (subSpeciesCount < 60) {
            risk = "Moderate";
          } else if (subSpeciesCount < 341) {
            risk = "High";
          } else {
            risk = "Very High";
          }
          barValue = (subSpeciesCount / 341) * 100;
          //historical risk
          if (subSpeciesCountHistorical < 29) {
            riskHistorical = "Low";
          } else if (subSpeciesCountHistorical < 60) {
            riskHistorical = "Moderate";
          } else if (subSpeciesCountHistorical < 341) {
            riskHistorical = "High";
          } else {
            riskHistorical = "Very High";
          }
          barValueHistorical = (subSpeciesCountHistorical / 341) * 100;
          // #endregion
          LoadCard(
            "grass",
            subSpeciesName,
            subSpeciesCount,
            risk,
            barValue,
            subSpeciesCountHistorical,
            riskHistorical,
            barValueHistorical
          );
          break;
        case "tree":
          // #region calculate tree risk
          //current risk
          if (subSpeciesCount < 95) {
            risk = "Low";
          } else if (subSpeciesCount < 207) {
            risk = "Moderate";
          } else if (subSpeciesCount < 703) {
            risk = "High";
          } else {
            risk = "Very High";
          }
          barValue = (subSpeciesCount / 703) * 100;
          //historical risk
          if (subSpeciesCountHistorical < 95) {
            riskHistorical = "Low";
          } else if (subSpeciesCountHistorical < 207) {
            riskHistorical = "Moderate";
          } else if (subSpeciesCountHistorical < 703) {
            riskHistorical = "High";
          } else {
            riskHistorical = "Very High";
          }
          // #endregion
          LoadCard(
            "tree",
            subSpeciesName,
            subSpeciesCount,
            risk,
            barValue,
            subSpeciesCountHistorical,
            riskHistorical,
            barValueHistorical
          );
          break;
        case "weed":
          // #region calculate weed risk
          //current risk
          if (subSpeciesCount < 20) {
            risk = "Low";
          } else if (subSpeciesCount < 77) {
            risk = "Moderate";
          } else if (subSpeciesCount < 266) {
            risk = "High";
          } else {
            risk = "Very High";
          }
          barValue = (subSpeciesCount / 266) * 100;
          //historical risk
          if (subSpeciesCountHistorical < 20) {
            riskHistorical = "Low";
          } else if (subSpeciesCountHistorical < 77) {
            riskHistorical = "Moderate";
          } else if (subSpeciesCountHistorical < 266) {
            riskHistorical = "High";
          } else {
            riskHistorical = "Very High";
          }
          // #endregion
          LoadCard(
            "weed",
            subSpeciesName,
            subSpeciesCount,
            risk,
            barValue,
            subSpeciesCountHistorical,
            riskHistorical,
            barValueHistorical
          );
          break;
      }
    }
  }
  changeCardDisplay();
};

const fetchFromAPI = function (url) {
  fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": "API-KEY",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      // console.log(JSON.parse(response.json()));
      return response.json();
    })
    .catch((err) => {
      console.error(err);
    });
};

const changeCardDisplay = function () {
  let cards = document.querySelectorAll(".c-card");
  console.log(cards.length);
  // add event listener click to each card
  for (let card of cards) {
    card.addEventListener("click", function () {
      CardClick(card);
    });
  }
  // LoadCards when card is not flipped
};

const CardClick = function (card) {
  card.classList.toggle("c-card-flipped");
  if (card.classList.contains("c-card-flipped")) {
    card.classList.remove("c-card-unflipped");
  } else {
    card.classList.add("c-card-unflipped");
  }
};

const NavTitleListener = function () {
  let navTitle = document.querySelector(".c-nav-title");
  navTitle.addEventListener("click", function () {
    ReloadPage();
  });
};

const ReloadPage = function () {
  LoadCards(testJsonData);
};

document.addEventListener("DOMContentLoaded", function () {
  let lat = "50.8194776";
  let lng = "3.2577263";
  //let url = `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lng}`;
  // fetchFromAPI(url);
  LoadCards(testJsonData);
  NavTitleListener();
});
