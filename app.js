class Producto{ 
    static cantidadDeProductos = 0;
    constructor(nombre, precio, marca , modelo, descripcion, img, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.marca = marca;
        this.modelo = modelo;
        this.descripcion = descripcion;
        this.img = img;
        this.id = ++Producto.cantidadDeProductos
        this.cantidad = cantidad;
    }
}
const productosDisponibles = [];

productosDisponibles.push(new Producto("Heladera", 120000, "Atma", "Top mount", "No frozen", "/images/heladeraatma.png", 0))
productosDisponibles.push(new Producto("Lavarropas", 90000, "Samsung", "Inverter", "Automatico", "/images/lavarropassamsung.png", 0))
productosDisponibles.push(new Producto("Cocina", 80000, "Philco", "Basic CDT", "Electrica", "/images/cocinaphilco.png", 0))
productosDisponibles.push(new Producto("Aire acondicionado", 150000, "TCL", "Elite ColdHot", "split frio/calor", "/images/aireacondicionadotcl.png", 0))
productosDisponibles.push(new Producto("Zapatillas", 45000, "Nike", "Air force 1", "blancas", "/images/zapasnike.png", 0))
productosDisponibles.push(new Producto("Notebook", 210000, "Lenovo", "Programbook", "AMD Ryzen 5 16GB RAM, 512GB SSD", "/images/notebooklenovo.png", 0))
productosDisponibles.push(new Producto("Jogging", 10000, "Puma", "Rebel", "Negro c/amarillo", "/images/pantalonpuma.png", 0))
productosDisponibles.push(new Producto("Buzo", 15000, "Adidas", "Essentials", "Negro", "/images/buzoimg.png", 0))
productosDisponibles.push(new Producto("Mouse", 6200, "Redragon", "Impact", "Blanco con luces", "/images/mouseredragon.png", 0))
productosDisponibles.push(new Producto("Smart TV", 105000, "Samsung", "Series 7", "Led 4k", "/images/tele.png", 0))
productosDisponibles.push(new Producto("Maquina de cortar pelo", 35000, "Wahl", "Magic Clip", "Inalambrica", "/images/maquina.png", 0))
productosDisponibles.push(new Producto("Termo", 10000, "Stanley", "Clásico 1.4 LTS", "verde con Tapon cebador", "/images/termo.png", 0))
productosDisponibles.push(new Producto("Hidrolavadora", 20000, "Black + Decker", "BW13", "Naranja y negro", "/images/hidro.png", 0))
productosDisponibles.push(new Producto("Memoria RAM", 9000, "Fury Beast", "DDR4", "Gamer 8GB 1 Kingstone", "/images/ram.png", 0))
productosDisponibles.push(new Producto("Bicicleta", 65000, "Mountain Bike", "Battle 210", "c/ cambios color rojo/negro", "/images/bici.png", 0))


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Funciones del carrito
function agregarProductos(productoId){ 
    const repetido = carrito.some((prod) => prod.id === productoId)
    if(repetido){
        const prod = carrito.map(prod =>{
            if(prod.id === productoId){
                prod.cantidad++
                agregarProductosEnElDom();
            }
        })
    } else {
        const producto = productosDisponibles.find((prod) => prod.id === productoId)
        carrito.push(producto)
        producto.cantidad++;
        agregarProductosEnElDom();
    }
}
function eliminarProductos(productoId){
    const producto = carrito.find((prod) => prod.id === productoId)
    const indiceDelProducto = carrito.indexOf(producto)
    carrito.splice(indiceDelProducto, 1)
    producto.cantidad = 0;
}

//agrega los productos al local storage
function agregarAlLocarStorage(){   
    const aJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', aJSON)
}


let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const aJSON = JSON.stringify(favoritos);
localStorage.setItem('favoritos', aJSON)

//Funcion para favoritos
function agregarAFavoritos(productoId){
    const repetido = favoritos.some((prod) => prod.id === productoId)
    if(!repetido){
        const producto = productosDisponibles.find((prod) => prod.id === productoId)
        const nuevoProducto = {
            ...producto,
            fecha:""
        }
        nuevoProducto.fecha = `${dayjs().format('DD/MMM/YYYY')}`
        favoritos.push(nuevoProducto)
        producto.cantidad = 0;
        agregarFavAlLocalStorage();
    }
}

//agrega los fav al LS
function agregarFavAlLocalStorage(){
    const aJSON = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', aJSON)
}



//Selectores del DOM
let catalogo = document.querySelector(".inicio__catalogo");
let template = document.querySelector("template")
let cardProductos = template.content.querySelector(".producto-card");
const carritoContenedor = document.querySelector("#carrito")
const carritoProductos = carritoContenedor.querySelector(".carrito__div")
const precioTotal = carritoContenedor.querySelector(".precio-total")
const botonVaciarCarrito = carritoContenedor.querySelector(".boton-vaciar")
const buscador = document.querySelector("#buscador")


//funcion para poner los productos disponibles en el catalogo
const pintarEnElDomProductos = () =>{
    productosDisponibles.forEach((producto) =>{
    let cardProductosClon = cardProductos.cloneNode(true);
    catalogo.appendChild(cardProductosClon);
    let imagenProductoDiv = cardProductosClon.querySelector(".producto-card__div");
    let imagenProductoImg = imagenProductoDiv.querySelector(".producto-card__img")
    imagenProductoImg.children[0].src = `${producto.img}`
    let precioProducto = cardProductosClon.querySelector(".producto-card__compra");
    precioProducto.children[0].innerText = `$${(producto.precio)}`;
    precioProducto.children[1].innerText = `${producto.nombre} ${producto.marca.toUpperCase()}\n ${producto.modelo} ${producto.descripcion}`;
    precioProducto.children[2].id = `button-add${producto.id}`
    precioProducto.children[3].id = `button-fav${producto.id}`

    //Evento para agregar los productos al carrito mediante el boton creado anteriormente.
    const botonAgregarAlCarrito = precioProducto.querySelector(`#button-add${producto.id}`);
    botonAgregarAlCarrito.onmousedown = () => botonAgregarAlCarrito.style.background = "#f4e4d8b4";
    botonAgregarAlCarrito.onmouseup = () =>  botonAgregarAlCarrito.style.background = "transparent";
    botonAgregarAlCarrito.addEventListener("click", ()=>{
        agregarProductos(producto.id);
        precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
        //sweet alert libreria
        Swal.fire({
            title: 'Has añadido al carrito',
            text: `${producto.nombre} ${producto.marca.toUpperCase()} ${producto.modelo}`,
            imageUrl: `${producto.img}`,
            imageWidth: 100,
            imageAlt: `${producto.nombre}`,
          })
})
    
const botonAgregarAFavoritos = precioProducto.querySelector(`#button-fav${producto.id}`) 
//Si el producto ya está agregado a favoritos, el corazon aparece pintado
    const favoritosEnLS = JSON.parse(localStorage.getItem('favoritos'))
    if(favoritosEnLS){
        const repetido = favoritosEnLS.some((prod) => prod.id === producto.id)
        if (repetido){
            botonAgregarAFavoritos.style.fontSize = "28px";
            botonAgregarAFavoritos.style.color = "red";
            botonAgregarAFavoritos.style.fontWeight = "bold"
        }
    }

    //Agrega el producto a favoritos cuando se presiona el boton y lo pinta
    botonAgregarAFavoritos.addEventListener("click", ()=>{
        agregarAFavoritos(producto.id)
        botonAgregarAFavoritos.style.fontSize = "28px";
        botonAgregarAFavoritos.style.color = "red";
        botonAgregarAFavoritos.style.fontWeight = "bold"
        Toastify({
            text: "Se ha añadido a Favoritos ❤",
            duration: 2000,
            style: {
                background: '#FFB3B7'
            }
            }).showToast();
    })
})
}

pintarEnElDomProductos();


//Evento para abrir el carrito
const botonAbrirCarrito = document.querySelector(".boton-carrito")
botonAbrirCarrito.addEventListener("click", ()=>{
     carritoContenedor.classList.toggle("mostrar")
     carritoProductos.classList.toggle("mostrar-div")
})

//funcion que agregar los productos en el carrito html
const agregarProductosEnElDom = () =>{
    carritoProductos.innerHTML="";
    carrito.forEach((prod) =>{
        const elemento = document.createElement("li");
        elemento.classList.toggle("li-producto")
        elemento.innerHTML=`
        <img src=${prod.img} alt="${prod.nombre}" class="producto-img">
        <h4 class="producto-info">${prod.nombre} ${prod.marca} ${prod.modelo} $${prod.precio}</h4>
        <p id="cantidad" class="cantidad-productos">x ${prod.cantidad}</p>
        <button class="boton-borrar" id="botonborrar${prod.id}">X</button>
        `;
        carritoProductos.appendChild(elemento)

        //Borrar producto con el boton "x"
        const botonBorrarProductos = document.querySelector(`#botonborrar${prod.id}`);
        botonBorrarProductos.addEventListener("click", (e)=>{
            function eliminarProducto(e) {
                e.preventDefault();
                const botonApretado = e.target
                botonApretado.parentElement.remove();
                eliminarProductos(prod.id);
                precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
                agregarAlLocarStorage();
            }
            eliminarProducto(e);      
        })
    //Vacia el carrito con el boton "Vaciar carrito"
        botonVaciarCarrito.addEventListener("click", ()=>{
            carrito = [];
            prod.cantidad = 0;
            agregarProductosEnElDom();
            precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio, 0)
        })
    })
    agregarAlLocarStorage();
}

agregarProductosEnElDom()


window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    const storage2 = JSON.parse(localStorage.getItem('favoritos'))
    if (storage || storage2){
        carrito = storage
        agregarProductosEnElDom();
        precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio, 0)
        favoritos = storage2
    }
}

//filtra por nombre cuando escribimos en el input
const filtrar = () =>{ //Buscador es la variable que contiene el queryselector del input
    if(buscador.value !== 0){
    catalogo.innerHTML = "";
    const buscado = buscador.value.toLowerCase();
    productosDisponibles.forEach((producto) =>{
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(buscado) !== -1){
            let cardProductosClon = cardProductos.cloneNode(true);
            catalogo.appendChild(cardProductosClon);
            let imagenProductoDiv = cardProductosClon.querySelector(".producto-card__div");
            let imagenProductoImg = imagenProductoDiv.querySelector(".producto-card__img")
            imagenProductoImg.children[0].src = `${producto.img}`
            let precioProducto = cardProductosClon.querySelector(".producto-card__compra");
            precioProducto.children[0].innerText = `$${(producto.precio)}`;
            precioProducto.children[1].innerText = `${producto.nombre} ${producto.marca.toUpperCase()}\n ${producto.modelo} ${producto.descripcion}`;
            precioProducto.children[2].id = `button-add${producto.id}`
            precioProducto.children[3].id = `button-fav${producto.id}`
        
            //Evento para agregar los productos al carrito mediante el boton creado anteriormente.
            const botonAgregarAlCarrito = precioProducto.querySelector(`#button-add${producto.id}`);
            botonAgregarAlCarrito.onmousedown = () => botonAgregarAlCarrito.style.background = "#f4e4d8b4";
            botonAgregarAlCarrito.onmouseup = () =>  botonAgregarAlCarrito.style.background = "transparent";
            botonAgregarAlCarrito.addEventListener("click", ()=>{
                agregarProductos(producto.id);
                precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
                Swal.fire({
                    title: 'Se ha añadido al carrito!',
                    text: `${producto.nombre} ${producto.marca.toUpperCase()} ${producto.modelo}`,
                    imageUrl: `${producto.img}`,
                    imageWidth: 100,
                    imageAlt: `${producto.nombre}`,
                  })
        })
    
            const botonAgregarAFavoritos = precioProducto.querySelector(`#button-fav${producto.id}`) 
            //Si el producto ya está agregado a favoritos, el corazon aparece pintado
            const favoritosEnLS = JSON.parse(localStorage.getItem('favoritos'))
            if(favoritosEnLS){
                const repetido = favoritosEnLS.some((prod) => prod.id === producto.id)
                if (repetido){
                    botonAgregarAFavoritos.style.fontSize = "28px";
                    botonAgregarAFavoritos.style.color = "red";
                    botonAgregarAFavoritos.style.fontWeight = "bold"
                }
            }

            //Agrega el producto a favoritos cuando se presiona el boton y lo pinta
            botonAgregarAFavoritos.addEventListener("click", ()=>{
                agregarAFavoritos(producto.id)
                botonAgregarAFavoritos.style.fontSize = "28px";
                botonAgregarAFavoritos.style.color = "red";
                botonAgregarAFavoritos.style.fontWeight = "bold"
            })
                }
            })
        }
}

buscador.addEventListener("keyup", filtrar)

