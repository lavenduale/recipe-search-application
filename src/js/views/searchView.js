import { elements } from './base';

// get the search input from base by user inputing, and save it to getInput variable
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearRes = () => {
    elements.searchResList.innerHTML = '';
};

/*
'pasta with tomato and spinach'
line1: acc: 0 and acc + cur.length = 5 and newTitle = ['pasta']
line2: acc: 5 and acc + cur.length = 9 and newTitle = ['pasta', 'with']
line3: acc: 9 and acc + cur.length = 15 and newTitle = ['pasta', 'with', 'tomato']
line4: acc: 15 and acc + cur.length = 18 and newTitle = ['pasta', 'with', 'tomato']
line5: acc: 18 and acc + cur.length = 24 and newTitle = ['pasta', 'with', 'tomato']
*/
// private function for size the titles
const limitRecipeTitle = (title, limit=17) => {
    const newTitle = [];

    if(title.length > limit){
        // reduce(x, y) here x is the first parameter as a call back function in reduce
        title.split(' ').reduce((acc, curr) => { //'pasta with tomato and spinach' sample string
            if (acc + curr.length <= limit){
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);  // y is second parameter in reduce function, as a initial value as accumulator to be 0

        // return the result of newTitle array with ... follow by
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

// renderRecipe function to render result template in html for each result with new variable
const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results_data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
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
