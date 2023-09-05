let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let container = document.getElementById("container");
let elMenu = document.getElementById("elMenu");
let vaciar = document.getElementById("vaciar");
let verCarrito = document.getElementById("verCarrito");

// Función para cuando hay algo en el carrito
function carritoSi(){
    carrito.forEach((product) => {
        let contentCarrito = document.createElement("div");
        contentCarrito.className = "content-carrito";
        contentCarrito.innerHTML = `
        <img class="img-productos" width="100px" height="100px" src="${product.img}" alt="">
        <h2>nombre: ${product.nombre}</h2>
        <p>precio: ${product.precio}</p>
        `;
        container.append(contentCarrito);
    })
}

// Función para cuando NO hay algo en el carrito
function carritoNo(){
    let div = document.createElement("div");
    div.className = "sin-productos";
    div.innerHTML = "No hay productos en el carrito";
    container.append(div);
};

// Función para que se vea el carrito
function carritoBody(){
    container.innerHTML = "";
    container.style.display = "flex";
    const headerCarrito = document.createElement("div");
    headerCarrito.className = "titulo-carrito";
    headerCarrito.innerHTML = `
        <h1 style="color: beige">Carrito</h1>
    `
    container.append(headerCarrito);

    carrito.length ? carritoSi() : carritoNo();

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
    
    const totalCarrito = document.createElement("div");
    totalCarrito.className = "total";
    totalCarrito.innerHTML = `Total a pagar:$${total}`;
    container.append(totalCarrito);

    const exitCarrito = document.createElement("button");
    exitCarrito.className = "boton-exit";
    exitCarrito.innerText = "x";

    container.append(exitCarrito);

    exitCarrito.addEventListener("click", () => {
        container.innerHTML = "";
    });
}

// Código para poder ver el menú de comidas
const getProducts = async () => {
    const response = await fetch("./data.json");
    const data = await response.json();

        data.forEach((item) => {
            let div = document.createElement("div");
            div.className = "productos";
            div.innerHTML = `
            <img class="img-productos" width="100px" height="100px" src="${item.img}" alt="">
            <h3 class="id-productos">id: ${item.id}</h3>
            <p>Nombre: ${item.nombre}</p>
            <b>$${item.precio}</b>
            `;
            elMenu.append(div);
        
            let comprar = document.createElement("button");
            comprar.innerText = "comprar";
        
            div.append(comprar);
        
            comprar.addEventListener("click", () => {
                Toastify({
                    text: "se agrego al carrito",
                    duration: 2000,
                    style: {
                        color: "black",
                        background: "linear-gradient(to right, #efff00, #ff0000)",
                      },
                }).showToast();
    
                carrito.push({
                    img: item.img,
                    id: item.id,
                    nombre: item.nombre,
                    precio: item.precio
                });
                
                localStorage.setItem("carrito", JSON.stringify(carrito));
        
                carrito = JSON.parse(localStorage.getItem("carrito"));
    
                carritoBody();
            });
        });
};

getProducts();

verCarrito.addEventListener("click", () => {
    carritoBody();
});

// Aplico un SweetAlert al momento de borrar el carrito
vaciar.addEventListener("click", () => {
    Swal.fire({
        title: 'estas seguro de que quieres borrar el carrito?',
        text: "¡esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar carrito!'
    }).then((result) => {
        result.isConfirmed && localStorage.clear();
        result.isConfirmed && location.reload();
    })
});