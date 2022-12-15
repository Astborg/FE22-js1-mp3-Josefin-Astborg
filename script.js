const countries = document.querySelector('.countries')
const lang = document.getElementById('search').value
const btn = document.getElementById('btn')

btn.addEventListener('click', getCountries)

async function getCountries(event){
  event.preventDefault()
    countries.innerText = ''
    const search = document.querySelector('.search').value;
    const response = await fetch(`https://restcountries.com/v3.1/lang/${search}`,{
        method: "GET",
    });
    
    const data = await response.json();

    if (!response.ok) {
        countries.innerText += "Language doesnt excist. Search again!";
      } else {
        const population = data.map((country) => country.population);
        const maxPopulation = Math.max(...population);
    
        data.forEach((api) => {
          const isMax = api.population === maxPopulation;
          showCountry(api, isMax);
        });
      }
    }
 
function showCountry(data, isMax){
    const country = document.createElement('div')
    country.classList.add('country')
    countries.classList.add('countriesClass')
    country.innerHTML =
    `<div class="country-img">
        <img src="${data?.flags?.png}" alt="">
    </div>
    <div class="country-details">
        <h5 class="countryName">${data?.name?.common}</h5>
        <p><strong>Population:</strong>${data?.population}</p>
        <p><strong>SubRegion:</strong>${data?.subregion}</p>
        <p><strong>Capital:</strong>${data?.capital}</p>
    </div>`
    
    if (isMax) {
        country.style.border = "5px solid green";
      }
    countries.appendChild(country)
    

    
}


