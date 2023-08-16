let searchBtn = document.querySelector("button");
let searchBox = document.querySelector(".search-box");
let filter = document.querySelector("#region");
let viewRegion = document.querySelector(".view-region");

let warning = document.querySelector(".search-info");

let countriesContainer = document.querySelector(".countries-container");
let countryContainer = document.querySelector(".view-country");

const apiURL = `https://restcountries.com/v3.1/all`;

async function getCountries(countries) {
    countries.forEach(country => {

        let countryCard = document.createElement('div');
        countryCard.classList.add('info-details');
        countryCard.innerHTML =
            `  
                    <img src="${country.flags.png}" alt="Country flag" class="flag-container" style="width: 220px; height: 120px;">
                        <div class="country-name">${country.name.common}</div>
                   
                        <div class="more-info">
                            <div class="info">
                                <label for="">Population: </label>
                                <div class="population">${country.population}</div>
                            </div>
                            <div class="info">
                                <label for="">Region: </label>
                                <div class="region">${country.region}</div>
                            </div>
                            <div class="info">
                                <label for="">Capital: </label>
                                <div class="capital">${country.capital}</div>
                            </div>
                        </div>  
                
            `
        countriesContainer.appendChild(countryCard);


        // Create view single country       

        countryCard.addEventListener("click", () => {

            countriesContainer.style.display = "none";
            document.querySelector(".search-option").style.display = "none"
            let viewCountry = document.createElement('div');
            viewCountry.classList.add('info-details');
            viewCountry.innerHTML =
                `  
            <img src="${country.flags.png}" alt="Country flag" class="flag-container" style="width: 440px; height: 240px;">
                <div class="country-name">${country.name.common}</div>
           
                <div class="more-info">
                    <div class="info">
                        <label for="">Population: </label>
                        <div class="population">${country.population}</div>
                    </div>
                    <div class="info">
                        <label for="">Region: </label>
                        <div class="region">${country.region}</div>
                    </div>
                    <div class="info">
                        <label for="">Subregion: </label>
                        <div class="region">${country.subregion}</div>
                    </div>
                    <div class="info">
                        <label for="">Capital: </label>
                        <div class="capital">${country.capital}</div>
                    </div>
                    <div class="info">
                        <label for="">Languages: </label>
                        <div class="capital">${Object.values(country.languages).toString().split(",").join(", ")}</div>
                    </div>
                    <div class="info">
                        <label for="">Currencies: </label>
                        <div class="capital">${country.currencies[Object.keys(country.currencies)].name +
                ", " + Object.keys(country.currencies)[0]}</div>
                    </div>
                    
                </div>
                <a href="index.html">  
                <button class="back">Back</button> 
                </a>    
    `
            countryContainer.appendChild(viewCountry);
        })
    });
}
// Search for a country
async function getData(country) {
    const apiURL = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    if (searchBox.value == "") {
        warning.innerHTML = "Please enter country name";

    }
    else {
        try {
            countriesContainer.style.display = "none";
            warning.innerHTML = "<img src = './img/loading.gif'/>";

            let response = await fetch(apiURL);
            let country = await response.json();
            warning.innerHTML = "";
            document.querySelector(".search-option").style.display = "none"
            let viewCountry = document.createElement('div');
            viewCountry.classList.add('info-details');
            viewCountry.innerHTML =
                `  
            <img src="${country[0].flags.png}" alt="Country flag" class="flag-container" style="width: 440px; height: 240px;">
                <div class="country-name">${country[0].name.common}</div>
           
                <div class="more-info">
                    <div class="info">
                        <label for="">Population: </label>
                        <div class="population">${country[0].population}</div>
                    </div>
                    <div class="info">
                        <label for="">Region: </label>
                        <div class="region">${country[0].region}</div>
                    </div>
                    <div class="info">
                        <label for="">Subregion: </label>
                        <div class="region">${country[0].subregion}</div>
                    </div>
                    <div class="info">
                        <label for="">Capital: </label>
                        <div class="capital">${country[0].capital}</div>
                    </div>
                    <div class="info">
                        <label for="">Languages: </label>
                        <div class="capital">${Object.values(country[0].languages).toString().split(",").join(", ")}</div>
                    </div>
                    <div class="info">
                        <label for="">Currencies: </label>
                        <div class="capital">${country[0].currencies[Object.keys(country[0].currencies)].name +
                ", " + Object.keys(country[0].currencies)[0]}</div>
                    </div>
                    
                </div>   
                <a href="index.html">  
                <button class="back">Back</button> 
                </a>     
    `
            countryContainer.appendChild(viewCountry);
            
        } catch (error) {
            warning.innerHTML = "Data not found"
            countriesContainer.style.display = "flex";

        }
    }
}

// Filter by region

// async function getFiltered(region) {
//     let results = await fetch(`https://restcountries.com/v3.1/region/${region}`);
//     let data = await results.json();    
//     console.log(data);

//     let countryCard = document.createElement('div');
//     countriesContainer.style.display ="none";
//     countryContainer.style.display ="none";
//         countryCard.classList.add('info-details');
//         countryCard.innerHTML =
//             `  
//                     <img src="${data.flag}" alt="Country flag" class="flag-container" style="width: 220px; height: 120px;">
//                         <div class="country-name">${data.name}</div>
                   
//                         <div class="more-info">
//                             <div class="info">
//                                 <label for="">Population: </label>
//                                 <div class="population">${data.population}</div>
//                             </div>
//                             <div class="info">
//                                 <label for="">Region: </label>
//                                 <div class="region">${data.region}</div>
//                             </div>
//                             <div class="info">
//                                 <label for="">Capital: </label>
//                                 <div class="capital">${data.capital}</div>
//                             </div>
//                         </div>  
                
//             `
//         viewRegion.appendChild(countryCard);
// }
// filter.addEventListener("click", () => {
//     getFiltered(filter.value)
// })

searchBtn.addEventListener("click", () => {
    let countryName = document.querySelector("input").value;
    getData(countryName)
    console.log(countryName);
});

window.onload = fetch(apiURL)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })
    .then(res => {
        getCountries(res);
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
