const BASE_URL = 'https://restcountries.eu';

function GetCountries(name) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };
  return fetch(`${BASE_URL}/rest/v2/name/${name}`).then(response =>
    response.json(),
  );
}

export default { GetCountries };
