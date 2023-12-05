async function getGenreDetails(genreId) {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/genre/${genreId}`;
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '8ad14d0a04msh72a6b8f2bc2432ep18f95bjsnd37c5986112b',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
  };
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      const genreName = result.name;
      const genrePicture = result.picture_xl;
      const playlistTracksElement = document.getElementById('playlistTracks');
      const trackItem = document.createElement('div');
      trackItem.classList.add('track-item');
      trackItem.innerHTML = `<div class="liste">
          <img src="${genrePicture}" alt="${genreName}" />
          <p>${genreName}</p>
      </div>`;
      playlistTracksElement.appendChild(trackItem);
      trackItem.addEventListener("mouseover", () => {
          const playIcon = document.createElement("i");
          playIcon.className = "fa-solid fa-play faPlay";
          playIcon.style.position = "relative";
          playIcon.style.top = "-120px";
          playIcon.style.left = "50px";
          trackItem.style.position = "relative";
          trackItem.appendChild(playIcon);
      });
      trackItem.addEventListener("mouseout", () => {
          const playIcon = trackItem.querySelector(".fa-play");
          if (playIcon) {
              trackItem.removeChild(playIcon);
              trackItem.style.position = "";
          }
      });
      trackItem.addEventListener("click", () => {
          redirectToGenrePage(genreId);
      });
  } catch (error) {
      console.error(error);
  }
}
function redirectToGenrePage(genreId) {
  const genrePageUrl = `http://127.0.0.1:5501/genre/${genreId}.html`;
  window.location.href = genrePageUrl;
}
async function playlist() {
  const ids = [132, 116, 152, 113, 165, 85, 106, 466, 144, 129, 84, 98, 173, 169, 2, 16, 153, 75, 459, 81];
  for (const id of ids) {
      await getGenreDetails(id);
  }
}
playlist();