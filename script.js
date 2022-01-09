const API_URL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bab940b7ff456ff8fa41c0980e592b2f&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=bab940b7ff456ff8fa41c0980e592b2f&query="';

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

// get initial movies
getMovies(API_URL);

// async function api req
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

// destructures the data, creating the html and passing in data for each movie
function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement('div');

    movieEl.classList.add('movie');

    movieEl.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"/>
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`;

    main.appendChild(movieEl);
  });
}

// function to colour code the rating
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

// search input function
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    search.value = '';
  } else {
    window.location.reload();
  }
});
