document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('search');
  let resultsContainer = document.querySelector('.results-container');
  let audioPlayer; // Neues Audio-Element
  const itemCards = document.querySelectorAll('.item');

  // Ergebnis-Container erstellen, falls nicht vorhanden
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');
    document.body.appendChild(resultsContainer);
  }

  // Eventlistener für Sucheingabe hinzufügen
  searchInput.addEventListener('input', search);

  searchInput.addEventListener('blur', function(event) {
    if (event.target.value.trim() === '') {
      clearResults(resultsContainer);
      showItemCards();
    }
  });

  async function search() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
      showItemCards(); // Karten wieder einblenden, wenn die Suche leer ist
      clearResults(resultsContainer);
      stopPlayback();
      return;
    }

    hideItemCards(); // Karten ausblenden während der Suche

    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(searchTerm)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bca6cd3f65msh35f92ef123f252dp1ce099jsnc199ab711f52',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();

      if (!Array.isArray(data.data)) {
        throw new Error('Data format is not as expected.');
      }

      displayResults(data, resultsContainer);
    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      handleSearchError(error.message); // Neue Funktion zur Fehlerbehandlung
    }
  }

  function displayResults(data, container) {
    container.innerHTML = '';
    if (Array.isArray(data.data) && data.data.length > 0) {
      data.data.forEach(track => {
        const resultDiv = createResultElement(track);
        container.appendChild(resultDiv);
        resultDiv.addEventListener('click', () => playTrack(track));
      });
    } else {
      showNoResults(container);
    }
  }

  function createResultElement(track) {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    const img = document.createElement('img');
    img.src = track.artist.picture;
    img.alt = 'Artist Image';
    resultDiv.appendChild(img);

    const info = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = track.artist.name;
    info.appendChild(name);

    const title = document.createElement('p');
    title.textContent = track.title;
    info.appendChild(title);

    resultDiv.appendChild(info);

    return resultDiv;
  }

  function playTrack(track) {
    stopPlayback();
    audioPlayer = new Audio();
    const previewURL = track.preview;
    audioPlayer.src = previewURL;
    audioPlayer.play();
  }

  function stopPlayback() {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
  }

  function clearResults(container) {
    container.innerHTML = '';
  }

  function showNoResults(container) {
    const noResults = document.createElement('p');
    noResults.textContent = 'Keine Ergebnisse gefunden.';
    container.appendChild(noResults);
  }

  function hideItemCards() {
    itemCards.forEach(card => {
      card.style.display = 'none';
    });
  }

  function showItemCards() {
    itemCards.forEach(card => {
      card.style.display = 'block';
    });
  }
}); 