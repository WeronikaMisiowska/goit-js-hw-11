import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r,S as i}from"./assets/vendor-DEu1ZBVp.js";const l="45947760-a7d8d36d32b01afaf5acf1299",c=document.querySelector(".search-form"),n=document.querySelector(".gallery"),o=document.querySelector("#loader");let t;async function p(s){try{o.style.display="block";const a=await fetch(`https://pixabay.com/api/?key=${l}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true`);if(o.style.display="none",!a.ok)throw new Error("Problem z pobieraniem danych");return(await a.json()).hits}catch(a){return console.error("Błąd w zapytaniu:",a),o.style.display="none",r.error({title:"Error",message:"Problem with fetching images"}),[]}}function m(s){if(n.innerHTML="",s.length===0){r.info({title:"No Images",message:"Sorry, there are no images matching your search query. Please try again!"});return}n.classList.remove("hidden");const a=s.map(e=>`
    <a href="${e.largeImageURL}" class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}" />
      <div class="image-info">
        <p><span class="image-info-label">Likes:</span> <span class="image-info-value">${e.likes}</span></p>
        <p><span class="image-info-label">Views:</span> <span class="image-info-value">${e.views}</span></p>
        <p><span class="image-info-label">Comments:</span> <span class="image-info-value">${e.comments}</span></p>
        <p><span class="image-info-label">Downloads:</span> <span class="image-info-value">${e.downloads}</span></p>
      </div>
    </a>
  `).join("");n.innerHTML=a,t?t.refresh():t=new i(".gallery-item",{captionsData:"alt",captionDelay:250})}c.addEventListener("submit",async s=>{s.preventDefault();const a=document.querySelector("#query").value.trim();if(a){const e=await p(a);m(e)}});
//# sourceMappingURL=page-2.js.map
