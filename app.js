const userName = document.querySelector('.user-name');
const login = document.querySelector('.login');
const profile = document.querySelector('.profile');
const repoNumber = document.querySelector('.repo-number');
const followersNumber = document.querySelector('.followers-number');
const followingNumber = document.querySelector('.following-number');
const city = document.querySelector('.city-text');
const url = document.querySelector('.url-text');
const twitter = document.querySelector('.twitter-text');
const company = document.querySelector('.company-text');
const dateArea = document.querySelector('.right-profile');
const searchForm = document.querySelector('form');
const iconImage = document.querySelector('.icon-image');
const input = document.getElementById('.form-input');

// api url
const api_url =
  "https://api.github.com/users/";

// Defining async function
async function getapi(url, searchPerson) {

    // Storing response
    const response = await fetch(url + searchPerson);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if(data.message === 'Not Found') {
        console.log('no good');
        searchForm.reset();
        document.getElementById('form-input').placeholder = "Not found";
    } else {
        show(data);
    }
}

// Calling that async function


searchForm.addEventListener('submit', e=> {
    e.preventDefault();
    const searchPerson = searchForm.userSearch.value.trim();

    // const searchPerson = ;
    // console.log(searchPerson);
    // searchForm.reset();
    getapi(api_url, searchPerson);
})

function show(data){
    const date1 = new Date(data.created_at);
    dateArea.innerHTML = `Joined ${date1.toDateString()}`;

    userName.innerHTML = data.name;
    login.innerHTML = `@${data.login}`;

    if(data.bio === null) {
        profile.innerHTML = 'This profile has no bio'
        profile.classList.remove('white-text');
    } else {
        profile.innerHTML = data.bio;
        profile.classList.add('white-text');
    }

    iconImage.innerHTML =  `<img src="${data.avatar_url}">`;
    repoNumber.innerHTML = data.public_repos;
    followersNumber.innerHTML = data.followers;
    followingNumber.innerHTML = data.following;

    if(data.location === null) {
        city.innerHTML = 'Not available'
        city.classList.remove('white-text');
    } else {
        city.innerHTML = data.location;
        city.classList.add('white-text');

    }


    if(data.blog === null || data.blog === '') {
        url.innerHTML = 'Not available'
        url.classList.remove('white-text');
    } else {
        url.innerHTML = `<a href="${data.blog}">${data.blog}</a>`;
        url.classList.add('white-text');

    }

    if(data.twitter_username === null) {
        twitter.innerHTML = 'Not available'
    } else {
        twitter.innerHTML = data.twitter_username;
    }

    if(data.company === null) {
        company.innerHTML = 'Not available'
        company.classList.remove('white-text');
    } else {
        company.innerHTML = data.company;
        company.classList.add('white-text');
    }
}