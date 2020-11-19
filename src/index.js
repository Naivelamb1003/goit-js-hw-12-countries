//  const name =
import API from './api-service';
import countrieCardTpl from './templates/list.hbs';
import countrieCardTp2 from './templates/cardCountry.hbs';
import { debounce } from 'debounce';
import { error, alert, Stack } from '@pnotify/core';
import './main.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const cardContainer = document.querySelector('.js-card-container');
const formText = document.querySelector('.form-control');

const debounceRenderCountries = debounce(function () {
  API.GetCountries(formText.value)
    .then(renderCountriesCard)
    .catch(onFetchError);
}, 500);

formText.addEventListener('input', debounceRenderCountries);

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
});

function renderCountriesCard(country) {
  let markup = null;
  if (country.status == 404) {
    onNotFoundError();
  } else {
    if (country.length === 1) {
      markup = countrieCardTp2(country[0]);
    } else {
      if (country.length < 10) {
        markup = countrieCardTpl(country);
      } else {
        onAmountError();
      }
    }
  }

  cardContainer.innerHTML = markup;
}

function onAmountError() {
  error({
    text: 'Too many matches found.Please enter a more specific query!',
    type: 'info',
    stack: myStack,
  });
}

function onNotFoundError() {
  alert({
    text: 'Country not found',
    stack: myStack,
  });
}

function onFetchError() {
  error({
    text: 'Cant get countries. Error appeared. Check your connection.',
    stack: myStack,
  });
}
