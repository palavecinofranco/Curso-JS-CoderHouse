let carrito = JSON.parse(localStorage.getItem('carrito'))
const carritoContenedor = document.querySelector("#carrito")
const carritoProductos = carritoContenedor.querySelector(".carrito__div")
const precioTotal = carritoContenedor.querySelector(".precio-total")
const botonVaciarCarrito = carritoContenedor.querySelector(".boton-vaciar")
const productosContainer = document.querySelector(".main__carrito")
const precioTotalCompraContainer = productosContainer.querySelector(".contenedor-table")
const precioTotalCompra = precioTotalCompraContainer.querySelector(".precio-total-compra")
const tabla = productosContainer.querySelector(".table")
const botonConfirmar = precioTotalCompraContainer.querySelector(".table-button")
precioTotal.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
precioTotalCompra.innerHTML = "Precio total: $" + carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)

function generarIdAleatorio (){
    let caracteres = "ABCDEFGHJKMNPQRTUVWXYZ2346789";
    let idAleatorio = "";
    for (i=0; i<10; i++){
        idAleatorio +=caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    }
    return idAleatorio;
}

if (carrito.length == 0){
    productosContainer.innerHTML = `<h1 class="mensaje-no">No hay productos en el carrito</h1>`
}


//MOSTRAR LOS PRODUCTOS EN LA TABLA PARA REALIZAR LA COMPRA
function mostrarProductosDelCarrito(){
    carrito.forEach((producto) =>{
        const elemento = document.createElement("tbody")
        elemento.innerHTML = `
        <tr>
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
            if (carrito.length == 0){
                productosContainer.innerHTML = `<h1 class="mensaje-no">No hay productos en el carrito</h1>`
            }
        })

        //BOTON PARA SUMAR LA CANTIDAD DEL PRODUCTO
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
        //BOTON PARA RESTAR LA CANTIDAD DEL PRODUCTO
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

botonConfirmar.addEventListener("click", () =>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Quieres confirmar la compra?',
        text: `El total de la compra es de: $${carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, aceptar',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Realizado!',
            `Su compra se ha confirmado con éxito. Id de transacción: #${generarIdAleatorio()}`,
            'success'
          )
          carrito = [];
          actualizarCarritoLocalStorage();
          productosContainer.innerHTML = `<h1 class="mensaje-no">No hay productos en el carrito</h1>`
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su compra ha sido cancelada',
            'error'
          )
        }
      })
})