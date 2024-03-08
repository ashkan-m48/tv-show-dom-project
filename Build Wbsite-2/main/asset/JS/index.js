const API_URL = `https:api.tvmaze.com/shows`;
const searchAPI = `https:api.tvmaze.com/search/shows?q=`;

const fetchData = async (url) => {
  const res = await axios.get(url);
  let datas = res.data;
  let showData = datas.map((element) => element.show);
  // console.log(showData);
  if (url === API_URL) {
    showMovie(datas);
  } else {
    showMovie(showData);
  }
};
fetchData(API_URL);

const main = document.querySelector(".main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

const showMovie = async (movies) => {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { name, image, genres, rating } = movie;
    const movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
        <img src="${image.medium}"/>
        <div class="movie-info">
          <h3 id="h3Name">${name}</h3>
          <div class="reting"><span>${rating.average}</span></div>
        </div>
        <div class="overview">
          <h3 class="title">${genres}</h3>
        </div>
        `;

    main.appendChild(movieEle);
    movieEle.addEventListener("click", (e) => {
      if (e.target.tagName === "IMG" || e.target.nodeName === "H3") {
        const h3NameEle = e.target.parentElement.querySelector("#h3Name");
        console.log(h3NameEle.innerText);
        const id = movie.id;
        localStorage.setItem("movieID", id);
      }
      window.location.href = "../episodes/episodes.html";
    });
  });
};

form.addEventListener("input", (e) => {
  e.preventDefault();
  const searchValue = search.value;
  if (searchValue && searchValue != "") {
    fetchData(searchAPI + searchValue);
  } else if (searchValue == "") {
    fetchData(API_URL);
  }
});
