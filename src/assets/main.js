const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCxrWeP42ElIrGe7LChm1PGA&part=snippet%2Cid&order=date&maxResults=10';

const content = null || document.getElementById('content');

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '910aa86aa2msha3049b8d822c77ap1095aejsn018e6c9fa669',
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
  }
};

async function fetchData(urlapi) {
  const response = await fetch(urlapi, options);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const videos = await fetchData(API);

    // Verifica si el campo "items" existe y contiene datos
    if (videos.items && videos.items.length > 0) {
      let view = `
      ${videos.items.map(video => `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1
            rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" 
            class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>`).slice(0, 4).join('')}
      `;

      content.innerHTML = view;
    } else {
      content.innerHTML = `<p>No se encontraron videos.</p>`;
    }

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    content.innerHTML = `<p>Error al cargar los videos.</p>`;
  }
})();
