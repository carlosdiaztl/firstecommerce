//Get elements General
const btnNew = document.getElementById("btnNew");
const containerForm = document.getElementById("containerForm");
const form = document.getElementById("form");
const containerItems = document.getElementById("items");
const ingresarAdmin = document.getElementById("ingresaradmin");
const inputUser = document.getElementById("loginAdmin");
const inputClave = document.getElementById("claveAdmin");
const btnLupa = document.getElementById("btnLupa");
const searchBarInput = document.getElementById("searchBar2");
const btnloggin=document.getElementById('buttlogin');
const searchArea=document.getElementById('searchArea')
const esconderadmin=()=>{
  searchArea.classList.remove('hidden')
}
btnloggin.addEventListener('click',esconderadmin)

//Get elements FORM
const titleInput = document.getElementsByName("title")[0];
const tipoInput = document.getElementsByName("tipo")[0];
const descriptionInput = document.getElementsByName("description")[0];
const priceInput = document.getElementsByName("price")[0];
const imageInput = document.getElementsByName("image")[0];


//Get elements Favorites
const inputSearch = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");
let favoritos = JSON.parse(localStorage.getItem("favoritospage")) || [];

let isEdit = false;
let idEdit;

const API_URL = "http://localhost:3000";
const APICARRO = "http://localhost:3000/carrito";
const APIFAV = "http://localhost:3000/favoritos";

//General
let storageCategory = [];
let carro = [];
let data = [];

const getData = async () => {
  try {
    let response = await fetch(`${API_URL}/dulces`);
    let data = await response.json();
    storageCategory = data;
    renderCards();
  } catch (error) {
    console.log(error);
  }
};

getData();

const getDatos = async (url) => {
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
//< span id="${item.id}">${item.cantidad} </span>
//<button class="btn btn--menos"data-id="${item.id}">-</button>
//<button class="btn btn--plus"data-id="${item.id}"> + </button>
const renderCards = () => {
  containerItems.innerHTML = "";
  storageCategory.forEach((item) => {
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

  //get elements DOM

  const btnPlus = document.getElementsByClassName("btn--plus");
  const btnMenos = document.getElementsByClassName("btn--menos");
  const btnAddCart = document.getElementsByClassName("btn--addCart");

  //Listeners

  Array.from(btnAddCart).forEach((element) => {
    let id = element.getAttribute("data-id");
    element.addEventListener("click", () => {
      console.log(id);
    });
  });
};

const renderCards2 = () => {
  containerItems.innerHTML = "";
  storageCategory.forEach(item => {
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
                <button class="btn btn--edit" data-id="${item.id}">Editar</button>
                <button class="btn btn--delete" data-id="${item.id}">Eliminar</button>
             </div>
                
                
            </div>
        </article>
        `;
  });

  //get elements DOM

  const btnDeletes = document.getElementsByClassName("btn--delete");
  const btnEdits = document.getElementsByClassName("btn--edit");
  const btnPlus = document.getElementsByClassName("btn--plus");
  const btnMenos = document.getElementsByClassName("btn--menos");
  const btnAddCart = document.getElementsByClassName("btn--addCart");
  // ingreso del admin
  // classList.add('hidden');
  // classList.add('hidden');
  //Listeners
  Array.from(btnDeletes).forEach((element) => {
    let id = element.getAttribute("data-id");
    element.addEventListener("click", () => {
      handleDelete(id);
    });
  });

  Array.from(btnEdits).forEach((element) => {
    let id = element.getAttribute("data-id");
    element.addEventListener("click", () => {
      handleEdit(id);
    });
  });
};

// FAVORITOS

const handleSearch = () => {
  let query = inputSearch.value;
  filterArray(query);
  renderCards();
};

// btnSearch.addEventListener("click", handleSearch);

const filterArray = (word) => {
  storageCategory = data.filter((dulces) =>
    dulces.tipo.toLowerCase().includes(word.toLowerCase())
  );
  console.log(storageCategory);
};

// TERMINA FAVORITOS

handleIngreso = () => {
  let query = inputUser.value;
  let query2 = inputClave.value;
  console.log(query, query2);
  if (query === "carlos" && query2 === "1234") {
    renderCards2();
    btnNew.classList.remove('hidden')

    // classList.add('hidden');
  } else {
    alert("clave incorrecta");
  }
};
ingresarAdmin.addEventListener("click", handleIngreso);

//Functions events
const showForm = () => {
  containerForm.classList.remove("hidden");
};

const handleSave = async (e) => {
  e.preventDefault();
  let newProduct = {
    title: titleInput.value,
    tipo: tipoInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    image: imageInput.value,
  };
  //Save at API
  try {
    let response = await fetch(`${API_URL}/dulces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  } catch (error) {
    console.log(error);
  }

  getData();

  //Clean Inputs
  titleInput.value = "";
  tipoInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
  //Hide Form
  containerForm.classList.add("hidden");
};

const handleUpdate = async (e) => {
  e.preventDefault();
  let newProduct = {
    title: titleInput.value,
    tipo: tipoInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    image: imageInput.value,
  };
  //Update at API
  let response = await fetch(`${API_URL}/dulces/${idEdit}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  isEdit = false;
  idEdit = null;
  getData();

  //Clean Inputs
  titleInput.value = "";
  tipoInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
  //Hide Form
  containerForm.classList.add("hidden");
};

const handleDelete = async (id) => {
  try {
    let response = await fetch(`${API_URL}/dulces/${id}`, {
      method: "DELETE",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  getData();
};

const handleEdit = (id) => {
  isEdit = true;
  idEdit = id;
  showForm();
  const product = storageCategory.find((element) => element.id == id);
  titleInput.value = product.title;
  tipoInput.value = product.tipo;
  descriptionInput.value = product.description;
  priceInput.value = product.price;
  imageInput.value = product.image;
};

//Listeners Events
btnNew.addEventListener("click", showForm);
form.addEventListener("submit", (e) => {
  if (isEdit) {
    handleUpdate(e);
  } else {
    handleSave(e);
  }
});

// document.addEventListener("click", async ({ target }) => {
//   if (target.classList.contains("btn--plus")) {
//     const idPlus = target.getAttribute("data-id");
//     const spanCantidad = document.getElementById(idPlus);
//     // spanCantidad.value=  parseInt(spanCantidad.value)+1
//     spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) + 1;
//     cantidadProducto = spanCantidad.innerHTML;
//   }
// });

// document.addEventListener("click", async ({ target }) => {
//   if (target.classList.contains("btn--menos")) {
//     const idPlus = target.getAttribute("data-id");
//     const spanCantidad = document.getElementById(idPlus);
//     // spanCantidad.value = parseInt(spanCantidad.value) + 1;
//     if (cantidadProducto >= 1) {
//       spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) - 1;
//       cantidadProducto = spanCantidad.innerHTML;
//     }
//   }
// });
cantidadProducto=1
document.addEventListener("click", async ({ target }) => {
  if (target.classList.contains("btn--addCart")) {
    console.log('agregando al carro...');
    const mercado = storageCategory.find(
      (item) => item.id == target.getAttribute("data-id")
    );
    const carrito = await getDatos(APICARRO);
    console.log(carrito);
    const elementoExist = carrito.some((item) => item.id === mercado.id);
    if (elementoExist) {
      console.log("ya el elemento esta en carro");
    } else {
      console.log('se ingreso al carro');
      // sacamos ese price que esta definido en el valor del objeto en el json y lo multiplicamos
      //por la cantidad y esta la reemplazamos en el valor total a pagar por dicho producto
      const totalProducto = cantidadProducto * mercado.price;
      const productCart = {
        ...mercado,
        cantidad: cantidadProducto,
        valortotal: totalProducto,
      };
      console.log(productCart);
      await fetch(APICARRO, {
        method: "POST",
        body: JSON.stringify(productCart),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }
  }
});

//Escuchar eventos del Click btnHeart

document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btnHeart")) {
    const savefav = storageCategory.find(
      (item) => item.id == target.getAttribute("name")
    );
    const elementExist = favoritos.some((item) => item.id === savefav.id);
    console.log(elementExist);
    if (elementExist == false) {
      favoritos.push(savefav);
      localStorage.setItem("favoritospage", JSON.stringify(favoritos));
    }
  }
});

// categorias filter

let dataFiltered = [];

const filter = (word) => {
  dataFiltered = storageCategory.filter((food) =>
    food.tipo.toLowerCase().includes(word.toLowerCase())
  );
  renderCards3(dataFiltered);
  console.log(dataFiltered);
};

const handleFilter = () => {
  let query3 = searchBarInput.value;
  filter(query3);
};

btnLupa.addEventListener("click", handleFilter);

const renderCards3 = (list) => {
  containerItems.innerHTML = "";
  list.forEach((item) => {
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
    <button class="btn btn--addCart" data-id="${item.id}">añadir al carrito</button>
    <span class="btnHeart" name="${item.id}">💟</span>
    <div class"hidden" id="div-botones">
        <button class="btn btn--edit" data-id="${item.id}">Editar</button>
        <button class="btn btn--delete" data-id="${item.id}">Eliminar</button>
</article>
        `;
  });
};
