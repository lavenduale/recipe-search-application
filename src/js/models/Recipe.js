import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor(id){
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`); // return a promise in the async function
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            //console.log(res);
        } catch(error){
            console.log(error);
            alert("Something went wrong.");
        }
    }
    // calculates the time to cook recipes
    calcTime() {
        // assuming that we need 15 mins for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }
    
    // make a new ingredients list, and parse the list by map function with passing el, and el directs to a call back function TODO
    parseIngredients() {
        // create two arrays, long for units, replace long by short
        const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        //const newIngredients = this.ingredients.map(el);
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase(); // el here is each element of the array(ingredients)
            // unit: current element in the array unitsLong;    i: current index of that element
            unitsLong.forEach((unit, i) => { // loop long unit array here, when they are appearing from ingredients in api
                ingredient = ingredient.replace(unit, unitsShort[i]); // replace the current element (unit) from long array by unitsShort[i], set it to ingredient
            }); 

            // 2) Remove parentheses
            ingredient = ingredient.replaces(/ *\([^)]*\) */g, ''); // remove parenthese in ingredient then set it to ingredient

            // 3) Parse ingredients into count, unit and ingredient

            return ingredient;
        });
        this.ingredients = newIngredients; // set newIngredients(parsed one) back to ingredients list
    }
}