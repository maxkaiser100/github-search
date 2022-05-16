const userName = document.querySelector('.userName');
const login = document.querySelector('.login');
const profile = document.querySelector('.profile');
const repoNumber = document.querySelector('.repoNumber');
const followersNumber = document.querySelector('.followersNumber');
const followingNumber = document.querySelector('.followingNumber');
const city = document.querySelector('.cityText');
const url = document.querySelector('.urlText');
const twitter = document.querySelector('.twitterText');
const company = document.querySelector('.companyText');
const dateArea = document.querySelector('.rightProfile');
const searchForm = document.querySelector('form');
const iconImage = document.querySelector('.iconImage');
const input = document.getElementById('.form-input');
const toggle = document.querySelector('.toggle');
const light = document.querySelector('.light');
const dark = document.querySelector('.dark');
const container = document.querySelector('.container');
let darkmode = localStorage.getItem('darkmode');


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
 
    getapi(api_url, searchPerson);
})

function show(data){
    const date1 = new Date(data.created_at);
    dateArea.innerHTML = `Joined ${date1.toDateString()}`;

    userName.innerHTML = data.name;
    login.innerHTML = `@${data.login}`;
    
    if(data.bio === null) {
        profile.innerHTML = 'This profile has no bio'
        profile.classList.remove('whiteText');
    } else {
        profile.innerHTML = data.bio;
        profile.classList.add('whiteText');
    }

    iconImage.innerHTML =  `<img src="${data.avatar_url}">`;
    repoNumber.innerHTML = data.public_repos;
    followersNumber.innerHTML = data.followers;
    followingNumber.innerHTML = data.following;
    
    if(data.location === null) {
        city.innerHTML = 'Not available'
        city.classList.remove('whiteText');
    } else {
        city.innerHTML = data.location;
        city.classList.add('whiteText');
        
    }

    
    if(data.blog === null || data.blog === '') {
        url.innerHTML = 'Not available'
        url.classList.remove('whiteText');
    } else {
        url.innerHTML = `<a href="${data.blog}">${data.blog}</a>`;
        url.classList.add('whiteText');
        
    }

    if(data.twitter_username === null) {
        twitter.innerHTML = 'Not available'
    } else {
        twitter.innerHTML = data.twitter_username;
    }

    if(data.company === null) {
        company.innerHTML = 'Not available'
        company.classList.remove('whiteText');
    } else {
        company.innerHTML = data.company;
        company.classList.add('whiteText');
    }

}

const enableDarkMode = () => {
    document.body.classList.add('darkMode');
    localStorage.setItem('darkmode', 'enabled');
    dark.style.display = 'none';
    light.style.display = 'block';
}

const disableDarkMode = () => {
    document.body.classList.remove('darkMode');
    localStorage.setItem('darkmode', 'null');
    light.style.display = 'none';
    dark.style.display = 'block';
}

if(darkmode === 'enabled') {
    enableDarkMode();
}

toggle.addEventListener('click', e=> {
    darkmode = localStorage.getItem('darkmode');
    if(darkmode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
