const containerCards = document.getElementById("cardsMain");
const btncheckout =document.getElementById('btncheckout');
const formcheck=document.getElementById("formcheck")
const nameInput=document.getElementById('name')
const direccionInput=document.getElementById('direccion')
const telefonoInput=document.getElementById('telefono')
const cancel=document.getElementById('cancel')
const buy=document.getElementById('buy')
const APICARRO = "http://localhost:3000/carrito";
const APICOMPRAS="http://localhost:3000/compras"

const mostrarCheckout=()=>{
formcheck.classList.remove('hidden')
console.log(carroCompras);
const lista =carroCompras.filter((item)=>{item.cantidad})
console.log(lista)

}
// datoscompra=()=>{
//  const query=nameInput.value;
// console.log(query);

// const cantidadDetotal=carroCompras.map(item=>item.valortotal).reduce((prev,curr)=>Number(prev) +Number(curr));


// const cantidadDeProductos=carroCompras.map(item=>item.cantidad).reduce((prev,curr)=>Number(prev) +Number(curr));
// console.log(cantidadDeProductos,cantidadDetotal);
// }


btncheckout.addEventListener('click',mostrarCheckout)

const ocultarchek=()=>{
  formcheck.classList.add('hidden')
}
cancel.addEventListener('click',ocultarchek
)


const nuevaCompra= async()=>{
const nameInput=document.getElementById('name')
const direccionInput=document.getElementById('direccion')
const telefonoInput=document.getElementById('telefono')
const cantidadDetotal=carroCompras.map(item=>item.valortotal).reduce((prev,curr)=>Number(prev) +Number(curr));


  const cantidadDeProductos=carroCompras.map(item=>item.cantidad).reduce((prev,curr)=>Number(prev) +Number(curr));
  console.log(cantidadDeProductos,cantidadDetotal);
  

const  newBuy = {
  name:nameInput.value,
  direccion:direccionInput.value,
  telefono:telefonoInput.value,
  cantidad:cantidadDeProductos,
  valortotal:cantidadDetotal
};

try {await fetch(APICOMPRAS, {
  method: "POST",
  body: JSON.stringify(newBuy),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});
console.log(newBuy)
  alert(`usted llevo ${cantidadDeProductos} de productos y su valor a pagar es ${suma}`)
  
} catch (error) {
  
}

}
buy.addEventListener('click',nuevaCompra)

let carroCompras = [];

const getData = async () => {
  try {
    let response = await fetch(`${APICARRO}`);
    let data = await response.json();
    carroCompras = data;
    showCards();
    console.log(carroCompras);
  } catch (error) {
    console.log(error);
  }
};

const getData2 = async () => {
  try {
    let response = await fetch(`${APICARRO}`);
    let data = await response.json();
    carroCompras = data;
    console.log(carroCompras);
  } catch (error) {
    console.log(error);
  }
};
getData();

const showCards = () => {
  (containerCards.innerHTML = ""),
    carroCompras.forEach((item) => {
      containerCards.innerHTML += `
      <article class="card">
      <figure>
          <img src="${item.image}" alt="dulces" class="card__image">
      </figure>
      <div class="card__description">
          <div class="description__name">
              <p>title:</p>
              <p>price:</p>
              <p>total a pagar:</p>
          </div>
          <div class="description__details">
              <p>${item.title}</p>
              <p>${item.price}</p>
              <p>${item.valortotal}</p>
          </div>
      </div>
      <div class="actions">
      <span id="${item.id}">${item.cantidad} </span>
      <button class="btn btn--menos"data-id="${item.id}">-</button>
      <button class="btn btn--plus"data-id="${item.id}">+</button>
      <button class="btn btn--edit" data-id="${item.id}">Editar cantidad</button>
      <button class="btn btn--delete" data-id="${item.id}">Eliminar</button>
      
      </div>
  </article>
  `;
    });

    const btnDeletes = document.getElementsByClassName("btn--delete");
    Array.from(btnDeletes).forEach((element) => {
      let id = element.getAttribute("data-id");
      element.addEventListener("click", () => {
        handleDelete(id);
      });
    });
  
};

const handleDelete = async (id) => {
    try {
      let response = await fetch(`${APICARRO}/${id}`, {
        method: "DELETE",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    getData();
    console.log(carroCompras)
};

document.addEventListener("click", async ({ target }) => {
  if (target.classList.contains("btn--plus")) {
    const idPlus = target.getAttribute("data-id");
    const spanCantidad = document.getElementById(idPlus);
    spanCantidad.value=  parseInt(spanCantidad.value)+1
    spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) + 1;
    cantidadProducto = spanCantidad.innerHTML;
    console.log(cantidadProducto);
  }
});

// //restar
document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("btn--menos")) {
      const idPlus = target.getAttribute("data-id");
      const spanCantidad = document.getElementById(idPlus);
      // spanCantidad.value=  parseInt(spanCantidad.value)+1
      if(cantidadProducto>=1){
        spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) - 1;
        cantidadProducto = spanCantidad.innerHTML;
        console.log(cantidadProducto);
    }

    }

});
// console.log(cantidadProducto);
document.addEventListener("click", async ({ target }) => {
  if (target.classList.contains("btn--edit")) {
     console.log('si editando');
     const mercado = carroCompras.find(
            (item) => item.id == target.getAttribute("data-id")
          );
          console.log(mercado);
          const totalProducto = cantidadProducto * mercado.price;
      const productCart = {
        ...mercado,
        cantidad: cantidadProducto,
        valortotal: totalProducto,
      };
      console.log(productCart);
      await fetch(`${APICARRO}/${mercado.id}`, {
        method: "PUT",
        body: JSON.stringify(productCart),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
  }  })

// const handleSave = async (e) => {
//     e.preventDefault();
    
//     let newBuy = {
//       name: nameInput.value,
//       direccion: direccionInput.value,
//       telefono: telefonoInput.value,
//       cantidad: cantidad.value,
//       valortotal: valortotalInput.value,
//     };
//     //Save at API
//     try {
//       let response = await fetch(`${API_URL}/dulces`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newProduct),
//       });
//     } catch (error) {
//       console.log(error);
//     }
  
//     getData();
  
//     //Clean Inputs
//     titleInput.value = "";
//     tipoInput.value = "";
//     descriptionInput.value = "";
//     priceInput.value = "";
//     imageInput.value = "";
//     //Hide Form
//   };

// const buscardor=()=>{
//   let savevalortotal;
//   carroCompras.forEach(element=>{
//      savevalortotal +=parseInt(element.cantidad)
      
//   })
//   console.log(savevalortotal)
// }
// buscardor()
  