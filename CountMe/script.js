"use strict";
"use prettier";
//SELECTING DOM ELEMENTS:
const logo = document.querySelector(".logo");
const containerApp = document.querySelector(".app");
const containerCounter = document.querySelector(".counter--container");
const containerNumbers = document.querySelector(".numbers--container");
const numberEl = document.querySelectorAll(".number");
const inputName = document.querySelector(".name__input");

//SELECTING BUTTONS:
const btnNewCounter = document.querySelector(".btn--newcounter");
const btnAdd = document.querySelector(".btn--add");
const btnSub = document.querySelector(".btn--subtract");
const btnClr = document.querySelector(".btn--clear");

//APPLICATION FUNCTIONALITY:
class App {
  //DEFINE COUNTER ARRAY and count step (for later functionality):
  #counters = [];
  #step = 1;

  constructor() {
    logo.addEventListener("click", this._initialize.bind(this));
    this._displayCounters(this.#counters);
    btnNewCounter.addEventListener("click", this._newCounter.bind(this));
    containerApp.addEventListener("click", this._plusBtn.bind(this));
    containerApp.addEventListener("click", this._minusBtn.bind(this));
    containerApp.addEventListener("click", this._clearBtn.bind(this));
  }

  //ALL METHODS:
  // INITIALIZE
  _initialize = function () {
    containerApp.style.opacity = 0;
    btnNewCounter.classList.remove("hidden");
    this.#counters = [];
    this.#step = 1;
  };

  //MAKE A NEW COUNTER
  _newCounter = function (e) {
    e.preventDefault();
    containerApp.style.opacity = 100;
    this.#counters.push(0);
    // btnNewCounter.classList.add("hidden");
    // console.log(this.#counters);
    this._displayCounters(this.#counters);
  };

  //BUTTON FUNCTIONS:
  _plusBtn = function (e) {
    e.preventDefault();
    const counterId = e.target.closest(".btn--add").dataset.id;
    if ((counterId = null)) return;
    this._addSum(counterId, this.#step);
  };

  _minusBtn = function (e) {
    e.preventDefault();
    const counterId = e.target.closest(".btn--subtract").dataset.id;
    if ((counterId = null)) return;
    this._addSum(counterId, -this.#step);
  };

  _clearBtn = function (e) {
    e.preventDefault();
    const counterId = e.target.closest(".btn--clear").dataset.id;
    if ((counterId = null)) return;
    this._resetCounter(counterId);
  };

  _addSum = function (i, sum) {
    if (i == 0) {
      this.#counters[0] += sum;
    } else {
      this.#counters[0] += sum;
      this.#counters[i] += sum;
    }
    this._displayCounters(this.#counters);
  };

  _resetCounter = function (i) {
    if (i == 0) {
      this.#counters.fill(0, 0);
    } else if (i > 0) {
      this.#counters[0] -= this.#counters[i];
      this.#counters[i] = 0;
    }
    this._displayCounters(this.#counters);
    // return this.#counters;
  };

  _removeCounter = function (i) {
    if (this.#counters[i]) {
      this.#counters[0] -= this.#counters[i];
      this.#counters.splice(i, i);
    }
    this._displayCounters(this.#counters);
    // return counters;
  };

  _displayCounters = function (countersArr) {
    containerApp.innerHTML = ""; //clear previous input!
    const countersSpr = countersArr;
    countersSpr.forEach(function (counter, i, name = "") {
      let numbers = String(counter).padStart(7, "0").split("");
      const type = i === 0 ? "main" : "sub";
      const id = i;
      const counterName = name;
      const html = `
        <ul class="counter counter--container" data-id="${id}">
          <div class="counter numbers--container ${type}">
            <span class="number counter__million">${numbers[0]}</span>
            <span class="number counter__hundredthousand">${numbers[1]}</span>
            <span class="number counter__tenthousand">${numbers[2]}</span>
            <span class="number counter__thousand">${numbers[3]}</span>
            <span class="number counter__hundred">${numbers[4]}</span>
            <span class="number counter__decimal">${numbers[5]}</span>
            <span class="number counter__single">${numbers[6]}</span>
          </div>
          <div class="counter counter--options">
            <form class="counter--name">
              <label class="name__label">Name:</label>
              <input
                class="name__input counter__input--name" data-id="${id}"
                placeholder="name"
              />
              <p class="name hidden">${counterName}</p>
            </form>
            <div class="button--countainer">
              <button class="btn btn--add" data-id="${id}">➕</button>
              <button class="btn btn--subtract" data-id="${id}">➖</button>
              <button class="btn btn--clear" data-id="${id}">⭕</button>
            </div>
          </div>
        </ul>
        `;
      containerApp.insertAdjacentHTML("beforeend", html);
    });
  };
}

const app = new App();

// _addSum(e) {
//   const counterEl = e.target.closest(".counter");
//   if (!counterEl) return;

//   const counter = this.#counters.find(
//     (count) => count.indexOf() === counterEl.dataset.id
//   );
//   const sum = this.#step;
//   const counter = this.#counters[i];
//   counter.indexof() === 0
//     ? (this.#counters[0] += sum)
//     : (this.#counters[i] += sum) && (this.counters[0] += sum);
// }
