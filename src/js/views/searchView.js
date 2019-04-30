import { elements } from './base';

// get the search input from base by user inputing, and save it to getInput variable
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearRes = () => {
    elements.searchResList.innerHTML = '';
};

// renderRecipe function to render result template in html for each result with new variable
const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results_data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    // select the results__list part from base.js at front end and insert the markup template above with each one result in before end order  
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// recipes = state.search.result from index.js
export const renderResults = recipes => {
    console.log("debug here!!",recipes);
    recipes.forEach(renderRecipe); // for each one recipe of result going to renderRecipe function
}
