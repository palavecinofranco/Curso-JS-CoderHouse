let carrito = JSON.parse(localStorage.getItem('carrito'))
const carritoContenedor = document.querySelector("#carrito")
const carritoProductos = carritoContenedor.querySelector(".carrito__div")
const precioTotal = carritoContenedor.querySelector(".precio-total")
const botonVaciarCarrito = carritoContenedor.querySelector(".boton-vaciar")
const productosContainer = document.querySelector(".main__carrito")
const precioTotalCompraContainer = productosContainer.querySelector(".contenedor-table")
const precioTotalCompra = precioTotalCompraContainer.querySelector(".precio-total-compra")
const tabla = productosContainer.querySelector(".table")
precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
precioTotalCompra.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)

//MOSTRAR LOS PRODUCTOS EN LA TABLA PARA REALIZAR LA COMPRA
function mostrarProductosDelCarrito(){
    carrito.forEach((producto) =>{
        const elemento = document.createElement("tbody")
        elemento.innerHTML = `
        <tr>
        <th scope="row">❤</th>
        <td class="table-td"><img src="${producto.img}" style="width:30px;"></td>
        <td class="table-td">${producto.nombre} ${producto.marca.toUpperCase()} ${producto.modelo}</td>
        <td>$${producto.precio}</td>
        <td class="sum">x ${producto.cantidad}<button class="btn-cantidad mas" id="botonmas${producto.id}">+</button><button class="btn-cantidad menos" id="botonmenos${producto.id}">-</button</td>
        <td class="table-td"><button class="boton-borrar" id="botonborrar${producto.id}">X</button></td>
        </tr>`
        tabla.appendChild(elemento)

        //borra el producto de la tabla
        const botonBorrarProductos = document.querySelector(`#botonborrar${producto.id}`);
        botonBorrarProductos.addEventListener("click", (e)=>{
            function eliminarProductoCarrito(e){
            e.preventDefault();
            const botonApretado = e.target;
            botonApretado.parentElement.parentElement.remove()
            eliminarProductosCarrito(producto.id)
            actualizarCarritoLocalStorage();
            carrito = JSON.parse(localStorage.getItem('carrito'))
            }
            eliminarProductoCarrito(e);
            precioTotalCompra.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
        })

        const botonSumarCantidad = document.querySelector(`#botonmas${producto.id}`)
        if(producto.cantidad >=0){
        botonSumarCantidad.addEventListener("click", (e)=>{
            function sumarCantidad(e){
                sumarCantidadProducto(producto.id);
                actualizarCarritoLocalStorage();
                carrito = JSON.parse(localStorage.getItem('carrito'))
                tabla.innerHTML = `<thead>
                <tr>
                  <th scope="col" class="table-th"></th>
                  <th scope="col" class="table-th"></th>
                  <th scope="col" class="table-th">Producto</th>
                  <th scope="col" class="table-th">Precio</th>
                  <th scope="col" class="table-th">Cantidad</th>
                  <th scope="col" class="table-th">Eliminar</th>
                </tr>
              </thead>`;
                mostrarProductosDelCarrito();
                precioTotalCompra.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
            }
            sumarCantidad(e);
        })
    }

        const botonRestarCantidad = document.querySelector(`#botonmenos${producto.id}`)
        if(producto.cantidad >1){
        botonRestarCantidad.addEventListener("click", (e)=>{
            function restarCantidad(e){
                restarCantidadProducto(producto.id);
                actualizarCarritoLocalStorage();
                carrito = JSON.parse(localStorage.getItem('carrito'))
                tabla.innerHTML = `<thead>
                <tr>
                  <th scope="col" class="table-th"></th>
                  <th scope="col" class="table-th"></th>
                  <th scope="col" class="table-th">Producto</th>
                  <th scope="col" class="table-th">Precio</th>
                  <th scope="col" class="table-th">Cantidad</th>
                  <th scope="col" class="table-th">Eliminar</th>
                </tr>
              </thead>`;
                mostrarProductosDelCarrito();
                precioTotalCompra.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
            }
            restarCantidad(e);
        })
    }
    })
}

mostrarProductosDelCarrito();


function eliminarProductosCarrito(productoId){
    const producto = carrito.find((prod) => prod.id === productoId)
    const indiceDelProducto = carrito.indexOf(producto)
    carrito.splice(indiceDelProducto, 1)
}

function actualizarCarritoLocalStorage(){
    const aJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', aJSON)
}

function sumarCantidadProducto(productoId){
    const producto = carrito.find((prod) => prod.id === productoId)
    producto.cantidad++
}

function restarCantidadProducto(productoId){
    const producto = carrito.find((prod) => prod.id === productoId)
    producto.cantidad--
}
