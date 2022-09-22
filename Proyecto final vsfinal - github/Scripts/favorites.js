let favoritos = JSON.parse(localStorage.getItem("favoritospage")) || [];
console.log(favoritos);
const containerItems = document.getElementsByClassName("items")[0];

const renderCards = () => {
  containerItems.innerHTML = "";
  favoritos.forEach((item) => {
    containerItems.innerHTML += `
          <article class="card">
              <figure>
                  <img src="${item.image}" alt="dulces" class="card__image">
              </figure>
              <div class="card__description">
                  <div class="description__name">
                      <p>title:</p>
                      <p>tipo:</p>
                      <p>description:</p>
                      <br><br>
                      <p>price:</p>
                  </div>
                  <div class="description__details">
                      <p>${item.title}</p>
                      <p>${item.tipo}</p>
                      
                      <p>${item.description}</p>
                      <br>
                      <p>${item.price}</p>
                  </div>
              </div>
              <div class="actions">
              <span id="${item.id}">${item.cantidad} </span>
              <button class="btn btn--menos"data-id="${item.id}">-</button>
              <button class="btn btn--plus"data-id="${item.id}"> + </button>
              <button class="btn btn--addCart" data-id="${item.id}">añadir al carrito</button>
              <button class="btnHeart" name="${item.id}">💟</button>
              <div class"hidden" id="div-botones">
                  <button class="btn btn--edit" data-id="${item.id}">Editar</button>
                  <button class="btn btn--delete" data-id="${item.id}">Eliminar</button>
  
               </div>
                  
                  
              </div>
          </article>
          `;
  });
};

renderCards();

// document.addEventListener('DOMContentLoaded',renderData)

document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btnHeart")) {
    mercado = favoritos.find((item) => item.id == target.getAttribute("name"));
    const elementoExist = favoritos.some((item) => item.id === mercado.id);
    if (elementoExist) {
      console.log(elementoExist);
      console.log(mercado);
      let index = favoritos.findIndex(
        (item) => item.id == target.getAttribute("name")
      );
      favoritos.splice(index, 1);
      //   let index = favoritos.findIndex(elementoExist);
      //   favoritos.splice(index, 1);
      //listaMercado.pop(elementoExist.id) ;//&& listaMercado.splice(mercado.id,-1);
      localStorage.setItem("favoritospage", JSON.stringify(favoritos));
      renderCards()
    } else {
      console.log("no hay mas de ese elemento");
    }
  }
});
