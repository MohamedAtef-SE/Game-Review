'use strict';

window.addEventListener('load', function () {
    this.document.querySelector('.loading-page').classList.add('d-none');
})

import { fetchAPI } from './games.js'
const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=shooter`;
fetchAPI(url);



const navBtns = document.querySelectorAll('.navbar-nav .nav-item');


function activeButton(button) {
    //Decative all buttons
    navBtns.forEach((btn) => {
        btn.classList.remove('active');
    })
    //Adding active class on clicked button only.
    button.classList.add('active');
}


navBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${e.target.innerText.toLowerCase()}`;
        fetchAPI(url);
        activeButton(e.target);
    })

    //OR
    // btn.addEventListener('click',activeButton );
});



