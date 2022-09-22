/*let numeroAleatorio= Math.round(Math.random() * 100000);
let letraAleatoria= Math.random().toString(24).replace(/[^a-z]+/g, '');
let idAleatorio=(letraAleatoria.toUpperCase()) + numeroAleatorio;*/

class Producto{ 
    static cantidadDeProductos = 0;
    constructor(nombre, precio, marca , modelo, descripcion, img){
        this.nombre = nombre;
        this.precio = precio;
        this.marca = marca;
        this.modelo = modelo;
        this.descripcion = descripcion;
        this.img = img;
        this.id = ++Producto.cantidadDeProductos
        this.cantidad = 1;
    }
}

class Carrito{

     constructor(){
        this.productos = [];
     }
     //Metodo para agregar al carrito los productos.
     agregarProductos(productoId){ 
        const repetido = this.productos.some((prod) => prod.id === productoId)
        if(repetido){
            const prod = this.productos.map(prod =>{
                if(prod.id === productoId){
                    prod.cantidad++
                    agregarProductosEnElDom();
                }
            })
        } else{
            const producto = productosDisponibles.find((prod) => prod.id === productoId)
            this.productos.push(producto)
            //const enJSON = JSON.stringify(this.productos)
            //localStorage.setItem("producto", enJSON)
            //const getItem = JSON.parse(localStorage.getItem('producto'))
            //console.log(getItem)
            agregarProductosEnElDom();
        //}
        }
    }
    eliminarProductos(productoId){
        const producto = this.productos.findIndex((prod) => prod.id === productoId)
        const indiceDelProducto = this.productos.indexOf(producto)
        this.productos.splice(indiceDelProducto, 1)
    }
}

const carrito = new Carrito();

const productosDisponibles = [];

productosDisponibles.push(new Producto("Heladera", 120000, "Atma", "Top mount", "No frozen", "/images/heladeraatma.png" ))
productosDisponibles.push(new Producto("Lavarropas", 90000, "Samsung", "Inverter", "Automatico", "/images/lavarropassamsung.png"))
productosDisponibles.push(new Producto("Cocina", 80000, "Philco", "Basic CDT", "Electrica", "/images/cocinaphilco.png"))
productosDisponibles.push(new Producto("Aire acondicionado", 150000, "TCL", "Elite ColdHot", "split frio/calor", "/images/aireacondicionadotcl.png"))
productosDisponibles.push(new Producto("Zapatillas", 45000, "Nike", "Air force 1", "blancas", "/images/zapasnike.png"))
productosDisponibles.push(new Producto("Notebook", 210000, "Lenovo", "Programbook", "AMD Ryzen 5 16GB RAM, 512GB SSD", "/images/notebooklenovo.png"))
productosDisponibles.push(new Producto("Jogging", 10000, "Puma", "Rebel", "Negro c/amarillo", "/images/pantalonpuma.png"))
productosDisponibles.push(new Producto("Buzo", 15000, "Adidas", "Essentials", "Negro", "/images/buzoimg.png"))
productosDisponibles.push(new Producto("Mouse", 6200, "Redragon", "Impact", "Blanco con luces", "/images/mouseredragon.png"))

let catalogo = document.querySelector(".inicio__catalogo");
let template = document.querySelector("template")
let cardProductos = template.content.querySelector(".producto-card");
const carritoContenedor = document.querySelector("#carrito")
const carritoProductos = carritoContenedor.querySelector(".carrito__div")


//Creacion de las cards y su funcionamiento.
productosDisponibles.forEach((producto) =>{
    let cardProductosClon = cardProductos.cloneNode(true);
    catalogo.appendChild(cardProductosClon);
    let imagenProductoDiv = cardProductosClon.querySelector(".producto-card__div");
    let imagenProductoImg = imagenProductoDiv.querySelector(".producto-card__img")
    imagenProductoImg.children[0].src = `${producto.img}`
    let precioProducto = cardProductosClon.querySelector(".producto-card__compra");
    precioProducto.children[0].innerText = `$${(producto.precio)}`;
    precioProducto.children[1].innerText = `${producto.nombre} ${producto.marca.toUpperCase()}\n ${producto.modelo} ${producto.descripcion}`;
    precioProducto.innerHTML += `<button class="boton-comprar" id="button${producto.id}">Agregar al carrito<i class="fa-solid fa-cart-shopping"></i></button>`

    //Evento para agregar los productos al carrito mediante el boton creado anteriormente.
    const botonAgregarAlCarrito = precioProducto.querySelector(`#button${producto.id}`);
    botonAgregarAlCarrito.onmousedown = () => botonAgregarAlCarrito.style.background = "#f4e4d8b4";
    botonAgregarAlCarrito.onmouseup = () =>  botonAgregarAlCarrito.style.background = "transparent";
    botonAgregarAlCarrito.addEventListener("click", ()=>{
        carrito.agregarProductos(producto.id);
        precioTotal.innerHTML = "Precio total: $" + carrito.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
        prod.cantidad++
        
    })
})

//Evento para abrir el carrito
const botonAbrirCarrito = document.querySelector(".boton-carrito")
botonAbrirCarrito.addEventListener("click", ()=>{
     carritoContenedor.classList.toggle("mostrar")
     carritoProductos.classList.toggle("mostrar-div")
})

const agregarProductosEnElDom = () =>{
    carritoProductos.innerHTML="";

    
    
    carrito.productos.forEach((prod) =>{
    const elemento = document.createElement("li");
    elemento.classList.toggle("li-producto")
    elemento.innerHTML=`
    <img src=${prod.img} alt="${prod.nombre}" class="producto-img">
    <h4 class="producto-info">${prod.nombre} ${prod.marca} ${prod.modelo} $${prod.precio}</h4>
    <p class="cantidad-productos">x ${prod.cantidad}</p>
    <button class="boton-borrar" id="botonborrar${prod.id}">X</button>
    `;
    carritoProductos.appendChild(elemento)

    const cantidad = elemento.querySelector(".cantidad-productos")
    //Borrar producto con el boton
    const botonBorrarProductos = document.querySelector(`#botonborrar${prod.id}`);
    botonBorrarProductos.addEventListener("click", (e)=>{
        function eliminarProducto(e) {
            e.preventDefault();
            const botonApretado = e.target
            botonApretado.parentElement.remove();
            carrito.eliminarProductos(prod.id);
            precioTotal.innerHTML = "Precio total: $" + carrito.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
            prod.cantidad = 1;
        }
        eliminarProducto(e);
    })
})

}
const precioTotal = document.createElement("h4")
precioTotal.classList.toggle("precio-total")
precioTotal.innerHTML = "Precio total: $" + carrito.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
carritoContenedor.appendChild(precioTotal)
const vaciarCarrito = document.createElement("button")
vaciarCarrito.innerHTML = "Vaciar carrito"
vaciarCarrito.addEventListener("click", ()=>{
    carrito.productos = [];
    carritoProductos.innerHTML = "";
    carrito.productos.precio = 0;
    precioTotal.innerHTML = "Precio total: $" + carrito.productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)

})
carritoContenedor.appendChild(vaciarCarrito)


