import { elements } from './base';
import { create } from 'domain';

// get the search input from base by user inputing, and save it to getInput variable
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearRes = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
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
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    // select the results__list part from base.js at front end and insert the markup template above with each one result in before end order  
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
// creating the markup for the prev and next button
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage); // pages for total

    // variable for the button that will be displayed
    let button;
    if (page === 1 && pages > 1){
        // Only button to go to next page
        // show buttons o page 2
        button = createButton(page, 'next');
    }
    else if (page < pages){
        // Both buttons
        // show previous button and next button
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1){
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
}

// recipes = state.search.result from index.js
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    // it is gonna like that first page shows from 0 to 9 (10 pages), and next page shows from 10 to 20
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    //console.log("debug here!!",recipes);
    recipes.slice(start, end).forEach(renderRecipe); // for each one recipe of result going to renderRecipe function

    // render pagination buttons
    // displaying buttons
    renderButtons(page, recipes.length, resPerPage);
}
