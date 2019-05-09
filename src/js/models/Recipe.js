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
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
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
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' '); // remove parenthese in ingredient then set it to ingredient

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' '); // put all the units from ingredients to array
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2)); // we test that for each current element(el2), if the element is inside of the units array(unitsShort), return true and false

            let objIng;
            if (unitIndex > -1) { // find, true
                // There is a unit
                // only include from 0 to index
                // Ex. 4 1/2 cups, arrCount is [4, 1/2] because function array.slice(start, end) doesn't count array[end]
                // Ex. 4 cups, arrCount is [4]
                const arrCount = arrIng.slice(0, unitIndex);
                let count; // define count variable outside of if scope
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+')); // replace - by + and then evaluate
                } 
                else {
                    count = eval(arrIng.slice(0, unitIndex).join('+')); // eval() function will evaluate string as math
                                                                        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> "4+1/2" use eval("4+1/2") --> 4.5
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            } 
            else if (parseInt(arrIng[0], 10)){
                // There is NO unit, but 1st element is a number
                objIng = {
                    count: arrIng([0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')// entire array excep first element because first element here is a number, and rest of the array is the ingredient
                };
            }
            else if (unitIndex === -1){ // couldn't find, false
                // There is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients; // set newIngredients(parsed one) back to ingredients list
    }
}