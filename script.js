'use strict';

//SELECTING DOM ELEMENTS:
const logo = document.querySelector('.logo');
const containerApp = document.querySelector('.app');
const containerCounter = document.querySelector('.counter--container');
const containerNumbers = document.querySelector('.numbers--container');
const form = document.querySelector('.counter--name');
const numberEl = document.querySelectorAll('.number');
const inputName = document.querySelector('.name__input');

//SELECTING BUTTONS:
const btnNewCounter = document.querySelector('.btn--newcounter');
const btnAdd = document.querySelector('.btn--add');
const btnSub = document.querySelector('.btn--subtract');
const btnClr = document.querySelector('.btn--clear');

//APPLICATION FUNCTIONALITY:
class App {
  //DEFINE COUNTER ARRAY and count step (for later functionality):
  #counters = [];
  #step = 1;
  #names = [];

  constructor() {
    logo.addEventListener('click', this._initialize.bind(this));
    this._displayCounters(this.#counters);
    btnNewCounter.addEventListener('click', this._newCounter.bind(this));
    containerApp.addEventListener('click', this._contBtn.bind(this));
  }

  //ALL METHODS:
  // INITIALIZE
  _initialize = function () {
    containerApp.style.opacity = 0;
    btnNewCounter.classList.remove('hidden');
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
    this._nameCounter(this.#counters);
  };

  //ALL BUTTON LISTENING AND DELIGATION to theyr sub functions:
  _contBtn = function (e) {
    e.preventDefault();
    if (e.target.classList.contains('btn--add')) {
      //Add sum to the respective counter:
      let btn = 'add';
      let id = e.target.closest('.btn--add').dataset.id;
      this._addSum(id, this.#step);
    } else if (e.target.classList.contains('btn--subtract')) {
      //Remove sum
      let btn = 'subtract';
      let id = e.target.closest('.btn--subtract').dataset.id;
      this._addSum(id, -this.#step);
    } else if (e.target.classList.contains('btn--clear')) {
      let btn = 'clear';
      let id = e.target.closest('.btn--clear').dataset.id;
      this._resetCounter(id);
    } else return;
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
  };

  _removeCounter = function (i) {
    if (this.#counters[i]) {
      this.#counters[0] -= this.#counters[i];
      this.#counters.splice(i, i);
    }
    this._displayCounters(this.#counters);
  };

  _displayCounters = function (countersArr) {
    containerApp.innerHTML = ''; //clear previous input!
    const countersSpr = countersArr;
    countersSpr.forEach(function (counter, i, name = '') {
      let numbers = String(counter).padStart(7, '0').split('');
      const type = i === 0 ? 'main' : 'sub';
      const id = i;
      const counterName = name;
      const html = `
        <ul class="counter counter--container ${type}" data-id="${id}">
          <div class="counter numbers--container ${type + 'c'}">
            <span class="number counter__million">${numbers[0]}</span>
            <span class="number counter__hundredthousand">${numbers[1]}</span>
            <span class="number counter__tenthousand">${numbers[2]}</span>
            <span class="number counter__thousand">${numbers[3]}</span>
            <span class="number counter__hundred">${numbers[4]}</span>
            <span class="number counter__decimal">${numbers[5]}</span>
            <span class="number counter__single">${numbers[6]}</span>
          </div>
          <div class="counter counter--options ${type + 'c'}">
            <form class="counter--name ${type + 'c'}">
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
      containerApp.insertAdjacentHTML('beforeend', html);
    });
  };
}

const app = new App();
