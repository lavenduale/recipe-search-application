//import str from "./models/Search";

// import mutiple things called named export
//import {add, multiply, ID} from './views/searchView';

//console.log(`uSING IMPORTOED functions! ${add(ID, 2)} and ${multiply(3, 5)}. ${str}`);

// start here

//ea433b99af26e749d4498985eed4951e
//https://www.food2fork.com/api/search

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
//
const state = {};


/* --------------- Search Controller -------------------- */
const controlSearch = async () => {
    // 1) Get query from view
    //const query = 'pizza'; //TODO
    const query = searchView.getInput(); // get the user input from searchView file
    console.log(query);

    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearRes();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            //console.log(state.search.result);
            searchView.renderResults(state.search.result);

        } catch (err) {
            alert('It is wrong here.');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // when user click the text of button, or icon of button, or button itself can be relized as return button
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); // dataset.goto is from createButton function of searchView
        searchView.clearRes();
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
});


/* --------------------- Recipe Controller --------------------- */
//const r = new Recipe(47746); // pass a id to Recipe save into r
//r.getRecipe();
//console.log(r);

// get the id from url on the webpage, and the number is called hash
const controlRecipe = async () => {
    // get the id from url
    const id = window.location.hash.replace('#', '');
    console.log(id); // print hash number

    if (id){

        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            // Get recipe data
            await state.recipe.getRecipe(); // return a promise of recipe

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));