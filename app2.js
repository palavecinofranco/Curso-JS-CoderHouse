
let favoritos = JSON.parse(localStorage.getItem('favoritos'))
let carrito = JSON.parse(localStorage.getItem('carrito'))
const favoritosContainer = document.querySelector(".main__favoritos")
const tabla = favoritosContainer.querySelector(".table")
const carritoContenedor = document.querySelector("#carrito")
const carritoProductos = carritoContenedor.querySelector(".carrito__div")
const precioTotal = carritoContenedor.querySelector(".precio-total")
const botonVaciarCarrito = carritoContenedor.querySelector(".boton-vaciar")
precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)

//agrega los productos almacenados en el localStorage en la tabla.
function agregarProductosAFavEnElDom(){
        favoritos.forEach((producto) =>{
            const elemento = document.createElement("tbody")
            elemento.innerHTML = `
            <tr>
            <th scope="row">❤</th>
            <td class="table-td"><img src="${producto.img}" style="width:30px;"></td>
            <td class="table-td">${producto.nombre} ${producto.marca.toUpperCase()} ${producto.modelo}</td>
            <td class="table-td">${dia} de ${mesArray[mes]} del ${ano}</td>
            <td class="table-td"><button class="boton-borrar" id="botonborrar${producto.id}">X</button></td>
            </tr>`
            tabla.appendChild(elemento)
            //borra de favoritos el producto
            const botonBorrarProductos = document.querySelector(`#botonborrar${producto.id}`);
            botonBorrarProductos.addEventListener("click", (e)=>{
                function eliminarProductoFav(e){
                e.preventDefault();
                const botonApretado = e.target;
                botonApretado.parentElement.parentElement.remove()
                eliminarProductosFav(producto.id)
                actualizarFavLocalStorage();
                favoritos = JSON.parse(localStorage.getItem('favoritos'))
                }
                eliminarProductoFav(e);
            })

        })
    }

    //ELIMINA EL PRODUCTO EN FAV DEL ARRAY.
function eliminarProductosFav(productoId){
    const producto = favoritos.find((prod) => prod.id === productoId)
    const indiceDelProducto = favoritos.indexOf(producto)
    favoritos.splice(indiceDelProducto, 1)
}

function actualizarFavLocalStorage(){
    const aJSON = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', aJSON)
}


window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('favoritos'))
    if (storage){
        favoritos = storage
        agregarProductosAFavEnElDom();
    }
}
//obtener la fecha... lo cuando muestro la tabla
let fecha = new Date()
let ano = fecha.getFullYear();
let dia = fecha.getDate();
let mes = fecha.getMonth();
let mesArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]


//    FUNCIONALIDAD DEL CARRITO AL IGUAL QUE EN EL INDEX.

//abrir el carrito
const botonAbrirCarrito = document.querySelector(".boton-carrito")
botonAbrirCarrito.addEventListener("click", ()=>{
     carritoContenedor.classList.toggle("mostrar")
     carritoProductos.classList.toggle("mostrar-div")
})

const mostrarProductosEnElCarrito = () =>{
    carritoProductos.innerHTML="";
    carrito.forEach((producto) =>{
        const elemento = document.createElement("li");
        elemento.classList.toggle("li-producto")
        elemento.innerHTML=`
        <img src=${producto.img} alt="${producto.nombre}" class="producto-img">
        <h4 class="producto-info">${producto.nombre} ${producto.marca} ${producto.modelo} $${producto.precio}</h4>
        <p id="cantidad" class="cantidad-productos">x ${producto.cantidad}</p>
        <button class="boton-borrar" id="botonborrar${producto.id}">X</button>
        `;
        carritoProductos.appendChild(elemento)

        //borra del carrito el producto
        const botonBorrarProductos = document.querySelector(`#botonborrar${producto.id}`);
        botonBorrarProductos.addEventListener("click", (e)=>{
            function eliminarProductoCarrito(e){
            e.preventDefault();
            const botonApretado = e.target;
            botonApretado.parentElement.remove()
            eliminarProductosCarrito(producto.id)
            actualizarCarritoLocalStorage();
            carrito = JSON.parse(localStorage.getItem('carrito'))
            precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
            }
            eliminarProductoCarrito(e);
        })

        botonVaciarCarrito.addEventListener("click", ()=>{
            carrito = [];
            producto.cantidad = 0;
            actualizarCarritoLocalStorage();
            mostrarProductosEnElCarrito();
            precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio, 0)
        })
    })
}
function eliminarProductosCarrito(productoId){
    const producto = carrito.find((prod) => prod.id === productoId)
    const indiceDelProducto = carrito.indexOf(producto)
    carrito.splice(indiceDelProducto, 1)
}

function actualizarCarritoLocalStorage(){
    const aJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', aJSON)
}

mostrarProductosEnElCarrito();

