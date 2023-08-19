let containerAll = document.querySelector(".countries-container");
let viewCountry = document.querySelector(".view-country");
let loading = document.querySelector(".loading");
let byRegion = document.querySelector("#region")
let search = document.querySelector(".search-box");
let displayByRegion = document.querySelector(".view-region");
let errorMsg = document.querySelector(".error-message");

const apiURL = "https://restcountries.com/v3.1/";

// fetch all countries
async function fetchCountries() {
    let response = await fetch(apiURL + "all");
    let data = await response.json();

    let display = "";

    data.forEach(country => {

        display += `<div class="country-card">
        <img src=${country.flags.svg} alt="${country.name.common}">
        <h4 class="">${country.name.common}</h4>
        <p class="region">Region: ${country.region}</p>
        <p class="capital">Capital: ${country.capital}</p>
        <p class="population">Population: ${country.population}</p>
    </div>`
    })
    containerAll.innerHTML = display;
}

fetchCountries();

// Filter by region
async function filterByRegion(region) {
    let response = await fetch(apiURL + `region/${region}`);
    let data = await response.json(); 

    let display = "";

    data.forEach(country => {

        display += `<div class="country-card">
        <img src=${country.flags.svg} alt="${country.name.common}">
        <h4 class="">${country.name.common}</h4>
        <p class="region">Region: ${country.region}</p>
        <p class="capital">Capital: ${country.capital}</p>
        <p class="population">Population: ${country.population}</p>
    </div>`
    })

    containerAll.innerHTML = display;
}

byRegion.addEventListener("click", () => {
    let query = byRegion.value;

    filterByRegion(query)
})

// search for a country
async function searchCountry(query) {  
    if(searchBtn.value == 0) {
        errorMsg.innerHTML = "Please enter country name"
     } 

    let response = await fetch(apiURL + `name/${query}`);
    let data = await response.json();
    if(data.length < 1)   errorMsg.innerHTML = "No data"
    console.log(data)     
    errorMsg.innerHTML = "" 
    searchBtn.value = "";    

    let display = "";
     
        display += `<div class="country-card">
            <img src=${data[0].flags.svg} alt="${data[0].name.common}">
            <h4 class="">${data[0].name.common}</h4>
            <p class="region">Region: ${data[0].region}</p>
            <p class="capital">Capital: ${data[0].capital}</p>
            <p class="population">Population: ${data[0].population}</p>  
            <a href="index.html"><button class="back-btn">Back</button></a>          
        </div>`
    
    containerAll.innerHTML = display;
    



    // console.log(data[0].subregion)
    // console.log(data[0].capital)
    // console.log(data[0].population)
}
let searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", () => {
    
    errorMsg.innerHTML = ""
    let value = search.value;
    //console.log(value)
    searchCountry(value);
   
    
    
})
