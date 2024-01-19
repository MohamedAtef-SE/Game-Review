'use strict';


import { buildGamesList } from './ui.js';
import { GameCard, buildModal } from './details.js';


export async function fetchAPI(url) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4820eb97b0msh293ad7cf444baebp1ea396jsnbe506daf6c09',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    if (response.status == 200) {
        const result = await response.json();
        const instancesList = result.map((gameObject) => {
            return new GameCard(gameObject.title, gameObject.genre, gameObject.id, gameObject.platform, gameObject.short_description, gameObject.thumbnail);
        })
        buildGamesList(instancesList);
        buildModal();
    }
}