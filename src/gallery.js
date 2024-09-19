import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';


const API_KEY = '45947760-a7d8d36d32b01afaf5acf1299'; 
const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
let lightbox;


async function fetchImages(query) {
  try {
    loader.style.display = 'block'; 
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`);
    loader.style.display = 'none'; 
    if (!response.ok) {
      throw new Error('Problem z pobieraniem danych');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error('Błąd w zapytaniu:', error);
    loader.style.display = 'none'; 
    iziToast.error({
      title: 'Error',
      message: 'Problem with fetching images',
    });
    return [];
  }
}


function displayImages(images) {
  gallery.innerHTML = ''; 
  if (images.length === 0) {
    iziToast.info({
      title: 'No Images',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  gallery.classList.remove('hidden');

  const markup = images.map(image => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="image-info">
        <p><span class="image-info-label">Likes:</span> <span class="image-info-value">${image.likes}</span></p>
        <p><span class="image-info-label">Views:</span> <span class="image-info-value">${image.views}</span></p>
        <p><span class="image-info-label">Comments:</span> <span class="image-info-value">${image.comments}</span></p>
        <p><span class="image-info-label">Downloads:</span> <span class="image-info-value">${image.downloads}</span></p>
      </div>
    </a>
  `).join('');

  gallery.innerHTML = markup;

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery-item', { captionsData: 'alt', captionDelay: 250 });
  }
}


form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.querySelector('#query').value.trim();

  if (query) {
    const images = await fetchImages(query); 
    displayImages(images); 
  }
});
