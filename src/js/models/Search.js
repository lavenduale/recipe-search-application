import axios from 'axios'; // it's from npm
import { key } from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(){ // api calls from api key and use async function
        //const key = 'ea433b99af26e749d4498985eed4951e'; we import the key from config.js
        try {
        const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
        this.result = res.data.recipes;
        //console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}