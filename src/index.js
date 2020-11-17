//  const name = 
import API from './api-service';
import countrieCardTpl from './templates/list.hbs';
import countrieCardTp2 from './templates/cardCountry.hbs';

const cardContainer = document.querySelector('.js-card-container');

API.GetCountries("Uk")
.then(renderCountriesCard)
.catch(onFetchError);


function renderCountriesCard(country) {
    let markup = null;

    if(country.length > 1){
         markup = countrieCardTpl(country);
        
    }else{
         markup = countrieCardTp2(country[0]);
    }
    cardContainer.innerHTML = markup;
  }

function onFetchError(error) {
    alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
  }