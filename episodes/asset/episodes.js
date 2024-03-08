console.log(localStorage.getItem("movieID"));

const episodeUrl = `https:api.tvmaze.com/shows/${localStorage.getItem(
  "movieID"
)}/episodes`;
const fetchData = async () => {
  const res = await axios.get(episodeUrl);
  console.log(res);
  let datas = res.data;
  let showData = datas.map((element) => element);
  console.log(showData);
  showMovie(showData);
};
fetchData();

const main = document.querySelector(".main");
const selectEle = document.querySelector("#episode");

//--------------------------------------------------------

const showMovie = async (movies) => {
  movies.forEach((movie) => {
    const { name, image, summary, rating, url, season, number } = movie;
    const optionEle = document.createElement("option");
    optionEle.value = `${season} ${number}`;
    optionEle.innerText = `Season :${season} Episoed:${number} `;
    selectEle.append(optionEle);
    const movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
              <a href=${url}><img src="${image.medium}"/></a>
              <div class="movie-info">
                <h3 id="h3Name">${name}</h3>
                <div class="reting"><span>${rating.average}</span></div>
              </div>
              <div class="overview">
                <a href=${url}><h3 class="title">${summary}</h3></a>
              </div>
              `;
    main.append(movieEle);
  });
  selectEle.addEventListener("change", () => {
    main.innerHTML = "";
    const selectedOption = selectEle.options[selectEle.selectedIndex];
    console.log(
      selectedOption.value.slice(0, 2),
      selectedOption.value.slice(2, 5)
    );
    if (selectedOption.value === "Allepisode") {
      movies.forEach((movie) => {
        const { name, image, summary, rating, url } = movie;
        const movieEle2 = document.createElement("div");
        movieEle2.classList.add("movie");
        movieEle2.innerHTML = `
                    <a href=${url}><img src="${image.medium}"/></a>
                    <div class="movie-info">
                      <h3 id="h3Name">${name}</h3>
                      <div class="reting"><span>${rating.average}</span></div>
                    </div>
                    <div class="overview">
                      <a href=${url}><h3 class="title">${summary}</h3></a>
                    </div>
                    `;
        main.append(movieEle2);
      });
    } else {
      let filteredMovie = movies.filter((movie) => {
        return (
          movie.season == selectedOption.value.slice(0, 2) &&
          movie.number == selectedOption.value.slice(2, 5)
        );
      });
      const { name, image, summary, rating, url } = filteredMovie[0];
      const movieEle2 = document.createElement("div");
      movieEle2.classList.add("movie");
      movieEle2.innerHTML = `
                  <a href=${url}><img src="${image.medium}"/></a>
                  <div class="movie-info">
                    <h3 id="h3Name">${name}</h3>
                    <div class="reting"><span>${rating.average}</span></div>
                  </div>
                  <div class="overview">
                    <a href=${url}><h3 class="title">${summary}</h3></a>
                  </div>
                  `;
      main.append(movieEle2);
    }
  });
};
