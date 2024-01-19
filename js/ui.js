'use strict';


export function buildGamesList(gameList) {
    const arrOfGamesList = gameList.map(function (gameCard) {
        return `
        <div class="cards col-lg-3 col-md-4 col-sm-6">
        <div class="d-none id">${gameCard.id}</div>
        <div class="card p-2 bg-body-tertiary main-card">
            <img src="${gameCard.thumbnail}" class="card-img-top card-img m-0" alt="${gameCard.title}">
            <div class="card-body">
                <div class="upper-card d-flex justify-content-between align-items-center py-1">
                    <h5 class="card-title fs-6 fw-bold p-0 m-0">${gameCard.title}</h5>
                    <button disabled class="btn px-1 py-0 m-0 btn-primary">Free</button>
                </div>
                <p class="card-text py-1 p-0 overflow-hidden">${gameCard.short_description}</p>
                <div class="card-bottom d-flex justify-content-between">
                    <button disabled type="button" class="btn btn-warning fw-bold p-1">${gameCard.genre}</button>
                    <button disabled type="button" class="btn btn-warning fw-bold p-1">${gameCard.platform}</button>
                </div>
            </div>
        </div>
    </div>
        `
    })
    displayAllGames(arrOfGamesList);
}

function displayAllGames(arrOfGamesList) {
    const displayArrOfGameList = arrOfGamesList.reduce(function (x, y) {
        return `${x}  ${y}`
    })
    document.querySelector('.home .row').innerHTML = displayArrOfGameList;

}


