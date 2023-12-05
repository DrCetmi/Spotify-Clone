async function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const existingTable = document.getElementById('favorites-table');
  
    if (existingTable) {
      existingTable.remove();
    }
  
    const favorites = getFavoritesFromStorage();
    const table = document.createElement('table');
    table.id = 'favorites-table';
    table.classList.add('track-table');
  
    const tableHeader = document.createElement('thead');
    tableHeader.innerHTML = `
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Album</th>
      <th><i class="fa-solid fa-clock"></i></th>
      <th></th>
    </tr>
    `;
    table.appendChild(tableHeader);
  
    const tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    favorites.forEach((favorite, index) => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
      <td class="indexNummer">${index + 1}</td>
      <td>
        <div class="list">
          <img src="${favorite.image}" alt="${favorite.title}" />
          <div>
            <p>${favorite.title}</p>
            <p>${favorite.artist}</p>
          </div>
        </div>
      </td>
      <td>${favorite.album}</td>
      <td>${favorite.duration}</td>
      <td class="exIcon" onclick="removeFavorite(${index})"><i class="fa-solid fa-xmark"></i></td>
      `;
  
      tableRow.addEventListener("mouseover", () => {
        tableRow.style.cursor = "pointer";
        const favIcon = tableRow.querySelector(".exIcon");
        const indexNummer = tableRow.querySelector(".indexNummer");
        indexNummer.innerHTML = `<i class="fa-solid fa-play"></i>`;
      });
  
      tableRow.addEventListener("mouseout", () => {
        tableRow.style.backgroundColor = "";
        const indexNummer = tableRow.querySelector(".indexNummer");
        indexNummer.innerHTML = `<td class="indexNummer">${index + 1}</td>`;
      });
  
      tableBody.appendChild(tableRow);
    });
    favoritesList.appendChild(table);
  }
  
  function getFavoritesFromStorage() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  }
  
  function removeFavorite(index) {
    const favorites = getFavoritesFromStorage();
    favorites.splice(index, 1); 
    localStorage.setItem('favorites', JSON.stringify(favorites)); 
    displayFavorites(); 
  }
  displayFavorites();