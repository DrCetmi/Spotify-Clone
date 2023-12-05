const songs = ["steh auf","tage wie diese","still","dicke titten","ich will nicht nach berlin"];

async function loadSongs(songs) {
  const playlistTracksElement = document.getElementById('playlist-tracks');
  const table = document.createElement('table');
  table.classList.add('track-table');
  // Table headers
  const tableHeader = document.createElement('thead');
  tableHeader.innerHTML = `
  <tr>
    <th>#</th>
    <th>Title</th>
    <th>Album</th>
    <th></th>
    <th><i class="fa-solid fa-clock"></i></th>
  </tr>
  `;
  table.appendChild(tableHeader);

  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  for (let index = 0; index < songs.length; index++) {
    const song = songs[index];
    let res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${song}`, {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': '8ad14d0a04msh72a6b8f2bc2432ep18f95bjsnd37c5986112b',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    });
    let data = await res.json();

    const track = data.data[0];
    const trackTitle = track.title;
    const trackArtist = track.artist.name;
    const trackAlbum = track.album.title;
    const trackImg = track.album.cover;
    const trackDuration = convertDuration(track.duration);

    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
    <td class="indexNummer">${index + 1}</td>
    <td>
      <div class="list">
        <img src="${trackImg}" alt="${trackTitle}" />
        <div>
          <p>${trackTitle}</p>
          <p>${trackArtist}</p>
        </div>
      </div>
    </td>
    <td>${trackAlbum}</td>
    <td class="favIcon"><i class="fa-regular fa-heart"></i></td>
    <td>${trackDuration}</td>
    `;
    const favIcon = tableRow.querySelector(".favIcon");

    tableRow.addEventListener("mouseover", () => {
      tableRow.style.cursor = "pointer";
      const indexNummer = tableRow.querySelector(".indexNummer");
      indexNummer.innerHTML = `<i class="fa-solid fa-play"></i>`;
    });

    tableRow.addEventListener("mouseout", () => {
      tableRow.style.backgroundColor = "";
      const indexNummer = tableRow.querySelector(".indexNummer");
      indexNummer.innerHTML = `<td class="indexNummer">${index + 1}</td>`;
    });

    favIcon.addEventListener("click", () => {
      addToFavorites(index);
      favIcon.style.color = "green"
    });

    tableBody.appendChild(tableRow);
  }

  playlistTracksElement.appendChild(table);
}

function convertDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

async function addToFavorites(index) {
  const selectedSong = songs[index];
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const track = await getSongDetails(selectedSong);
  favorites.push(track);
  localStorage.setItem('favorites', JSON.stringify(favorites));
//   alert(`${track.title} by ${track.artist} added to favorites!`);
}

async function getSongDetails(song) {
  let res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${song}`, {
    "method": "GET",
    "headers": {
      'X-RapidAPI-Key': '8ad14d0a04msh72a6b8f2bc2432ep18f95bjsnd37c5986112b',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  });
  let data = await res.json();
  const track = data.data[0];
  const trackTitle = track.title;
  const trackArtist = track.artist.name;
  const trackDuration = convertDuration(track.duration);
  const trackImg = track.album.cover;
  return {
    title: trackTitle,
    artist: trackArtist,
    duration: trackDuration,
    image: trackImg
  };
}
loadSongs(songs);

