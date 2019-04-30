//import str from "./models/Search";

// import mutiple things called named export
//import {add, multiply, ID} from './views/searchView';

//console.log(`uSING IMPORTOED functions! ${add(ID, 2)} and ${multiply(3, 5)}. ${str}`);

// start here

//ea433b99af26e749d4498985eed4951e
//https://www.food2fork.com/api/search

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';


// Global state of the app
// - Search object
// - Current recipe object
// - Shopping list object
// - Liked recipes
//
const state = {};

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

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        //console.log(state.search.result);
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
}); 