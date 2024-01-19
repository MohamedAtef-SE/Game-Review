'use strict';

const allCards = document.querySelector('.row');
const homeElement = document.querySelector('.home');
const modalXElement = document.querySelector('.modalX');
const closeBtn = document.querySelector('.fa-xmark');

export class GameCard {
    title;
    genre;
    id;
    platform;
    short_description;
    thumbnail;
    constructor(title, genre, id, platform, short_description, thumbnail) {
        this.title = title;
        this.genre = genre;
        this.id = id;
        this.platform = platform;
        this.short_description = short_description;
        this.thumbnail = thumbnail;
    }
}


class GameDetails extends GameCard {
    status;
    description;
    game_url;
    minimum_system_requirements;
    constructor(title, genre, id, platform, short_description, thumbnail, status, description, game_url) {
        super(title, genre, id, platform, short_description, thumbnail);
        this.status = status;
        this.description = description;
        this.game_url = game_url;
    }
}


export function buildModal() {
    for (const card of allCards.children) {
        card.addEventListener('click', function () {
            document.querySelector('.loading-page').classList.remove('d-none');
            const gameID = card.children.item(0).textContent;
            const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameID}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '4820eb97b0msh293ad7cf444baebp1ea396jsnbe506daf6c09',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            (
                async function () {
                    const response = await fetch(url, options);
                    if (response.status == 200) {
                        const result = await response.json();
                        const obj_gameDetails = new GameDetails(result.title, result.genre, result.id, result.platform, result.short_description, result.thumbnail, result.status, result.description, result.game_url);
                        displayModal(obj_gameDetails);
                        setTimeout(function () {
                            document.querySelector('.loading-page').classList.add('d-none');
                        }, 1000);

                    }
                }
            )();
            modalXElement.classList.remove('d-none');
            homeElement.classList.add('d-none');
        })
    }
}

function displayModal(obj_gameDetails) {

    const box = `
    <div class="master-modal row">
    <div class="col-md-4 p-4 pb-1">
        <div class="inner">
            <h2 class="m-0 p-0 pb-4">Game Details</h2>
            <div class="game-details">
                <img src="${obj_gameDetails.thumbnail}" class="w-100 m-0 p-0" alt="Image game">
            </div>
        </div>
    </div>
    <div class="col-md-8 p-4">
        <div class="inner">
            <h2 class="m-0 p-0 pb-4">${obj_gameDetails.title}</h2>
            <ul class="list-unstyled">
                <li class="fw-bolder mb-3">Category: <span class="bg-info px-2 py-1 rounded">${obj_gameDetails.genre}</span>
                </li>
                <li class="fw-bolder mb-3">Platform: <span
                        class="bg-info px-2 py-1 rounded">${obj_gameDetails.platform}</span>
                </li>
                <li class="fw-bolder mb-3">Status: <span class="bg-info px-2 py-1 rounded">${obj_gameDetails.status}</span>
                </li>
            </ul>
            <p class="details-text">${obj_gameDetails.description}</p>
            <a  target="_blank" href="${obj_gameDetails.game_url}" class="btn btn-warning">Show Game</a>
        </div>
    </div>
</div>
    `
    document.querySelector('.modalX .container').innerHTML = box;
}



closeBtn.addEventListener('click', function () {
    modalXElement.classList.add('d-none');
    homeElement.classList.remove('d-none');

})
document.addEventListener('keyup', function (e) {
    if (e.key == 'Escape') {
        modalXElement.classList.add('d-none');
        homeElement.classList.remove('d-none');
    }

})