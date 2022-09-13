let crearUsuario;
let crearContrasenia;
let iniciarUsuario;
let iniciarContrasenia;
let dineroEnCuenta=0;
let numeroAleatorio= Math.round(Math.random() * 100000);
let letraAleatoria= Math.random().toString(24).replace(/[^a-z]+/g, '');
let idAleatorio=(letraAleatoria.toUpperCase()) + numeroAleatorio;

class Producto{ 

    static productosDisponibles = 0;

    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
        this.id = ++Producto.productosDisponibles;
    }
    }

class Carrito{

     constructor(){
        this.productos = [];
     }

     agregarProductos(producto){  //Agrega un producto al array siempre que el array no esté lleno (<5)
        if(this.productos.length < 5){
            this.productos.push(producto);
            alert(`Se ha añadido al carrito ${producto.nombre}`)
            mostarMenuCompras();
        }
        else{
            alert("Carrito lleno!")
            mostarMenuCompras();
        }
     }

     removerProductos(producto){  //Remueve un producto a través de su indice en el array
            let indice = this.productos.indexOf(producto)
            if(indice != -1){
            carrito.productos.splice(indice, 1);
            alert(`Se ha removido ${producto.nombre} del carrito`)
            mostrarCarrito()
            }
    }

     totalPrecioCarrito(){  //Muestra la suma de todos los precios de los objetos que estan dentro del array productos[]
        let total = 0;
        for(let producto of this.productos){
            total = total + producto.precio
        }
        return total;
     }

     mostrarProductos(){                  //Muestra el nombre de los productos.
        let productosEnElCarrito = [];
        this.productos.forEach((producto) =>{
            productosEnElCarrito.push(producto.nombre)
        }
        )
        return productosEnElCarrito.join(", ");
     }
}

const carrito = new Carrito();

const productosDisponibles = [];

productosDisponibles.push(new Producto("Heladera", 120000))
productosDisponibles.push(new Producto("Lavarropas", 90000))
productosDisponibles.push(new Producto("Cocina", 80000))
productosDisponibles.push(new Producto("Aire acondicionado", 150000))

let mostrarProductosDisponibles = `Estos son los productos que tenemos disponibles:\n`

productosDisponibles.forEach((producto) => {
    mostrarProductosDisponibles+=`${producto.id}. ${producto.nombre}\n`
}
)



function mostrarCarrito(){ //muestra los productos comprados en la funcion mostarMenuCompras y el valor total del carrito. Podemos efectuar la compra, vaciar el carrito o quitar un producto
        let controlCarrito=prompt(`Tus productos en el carrito son ${carrito.productos.length}: ${carrito.mostrarProductos()} \nEl precio de tu carrito es de $${carrito.totalPrecioCarrito()}\n1.Confirmar Compra\n2.Vaciar Carrito\n3.Remover un producto\n4.Volver`);
        switch(controlCarrito){  
            case "1":
                if(carrito.totalPrecioCarrito() <= dineroEnCuenta){
                    alert(`Compra efectuada con exito. Id de transacción: #${idAleatorio}`);
                    dineroEnCuenta = dineroEnCuenta - carrito.totalPrecioCarrito();
                    carrito.productos = [];
                    mostrarCarrito()
                }else{
                    alert("Dinero Insuficiente!");
                    mostrarCarrito();
                }   
                break;

            case "2":
                carrito.productos = [];
                mostrarCarrito();
                break;

            case "3":

                 let productosEnElCarrito = `Elige el producto que desea remover del carrito:\n`;
                 carrito.productos.forEach((producto, indice) =>{
                    productosEnElCarrito+=`${indice + 1}. ${producto.nombre}\n`
                 }
                 )

                let removerUnProducto = Number(prompt(`${productosEnElCarrito}${carrito.productos.length + 1}.Cancelar`)) //ingresa mediante prompt un numero que va a ser el indice del objeto que se encuentra dentro del array.
                while (removerUnProducto < 1 || removerUnProducto>carrito.productos.length + 1) {
                    alert("Opcion incorrecta, intente nuevamente")
                    removerUnProducto = Number(prompt(`${productosEnElCarrito}${carrito.productos.length + 1}.Cancelar`));
                } 
                 if(removerUnProducto!=carrito.productos.length + 1){
                    carrito.removerProductos(carrito.productos[removerUnProducto-1])
                }
                else {
                     mostrarCarrito();
                    }

            case "4":
                mostrarMenu();
                break;


            default:
                alert("Opción no válida")
                mostrarCarrito()
        }
    }


function inicioInteraccionConElUsuario(){ //Con esta funcion iniciamos la interaccion con el usuario, pidiendo iniciar sesion si desea abrir el menú interactivo.
        let abrirMenu=prompt("Quieres abrir el menú? Responde con 'Si' o 'No'.")
            if(abrirMenu=="Si" || abrirMenu=="No"){
                if(abrirMenu=="Si"){
                    alert("Primero debes iniciar sesion!");
                    iniciarSesion();
                    mostrarMenu()
                } 
                else{
                    alert("Se ha cerrado la ventana")
                }
            } 
            else{
                alert("Opcion incorrecta");
                inicioInteraccionConElUsuario();
            }
    }
        
function mostrarMenu(){ //es el menu principal en donde se van a desenbocar la mayor parte de las funciones.
            let opcion= prompt("Elija una opción \n1.Comprar \n2.Mostrar carrito \n3.Mi Cuenta \n4.Cancelar");
            switch(opcion){
                case '1':
                    mostarMenuCompras();
                    break;
                
                case '2':
                    mostrarCarrito();
                    break;

                case '3':
                    function miCuenta(){
                    let inicioCuenta=prompt(`Cuenta de ${iniciarUsuario} \nTu saldo es de ($${dineroEnCuenta}) \n1.Depositar dinero \n2.Extraer dinero \n3.Volver`)
                    switch(inicioCuenta){
                        case "1":
                            let ingresarMonto=Number(prompt("Ingrese el monto que desea depositar"));
                            dineroEnCuenta=dineroEnCuenta+ingresarMonto;
                            alert(`Usted ha ingresado $${ingresarMonto}`)
                            miCuenta();
                            break;
                        
                        case "2":
                            let extraerMonto=Number(prompt("Ingrese el monto que desea extraer"));
                            dineroEnCuenta=dineroEnCuenta-extraerMonto;
                            alert(`Usted ha extraído $${extraerMonto}`)
                            miCuenta();
                            break;

                        case "3":
                            mostrarMenu();
                            break;

                        default:
                            alert("Opcion incorrecta")
                            miCuenta();
                    }
                    }
                    miCuenta();
                    break;
                case '4':
                    alert("Se cerrara el menú")
                    break;

                default:
                    alert("Opción no válida")
                    mostrarMenu();
                    break;
                }
                
    }

function iniciarSesion(){ //funcion para iniciar sesion con el usuario y contraseña que creamos al iniciar.
        iniciarUsuario=prompt("Ingrese su Usuario")
        iniciarContrasenia=prompt("Ingrese su contraseña")
        while(iniciarUsuario!=crearUsuario || iniciarContrasenia!=crearContrasenia){
            alert("Usuario y/o contraseña incorrecta")
            iniciarUsuario=prompt("Ingrese su Usuario")
            iniciarContrasenia=prompt("Ingrese su Contraseña");
            }
        alert("Se ha logueado correctamente.");
        }


function mostarMenuCompras(){//Esta funcion simula una compra de productos.
        let opcionProductos=Number(prompt(`${mostrarProductosDisponibles}${`${productosDisponibles.length + 1}.Volver`}\nElija el que quiera comprar`));
        while(opcionProductos<1 || opcionProductos>productosDisponibles.length + 1){
            alert("Opcion incorrecta, intente nuevamente")
            opcionProductos=Number(prompt(`${mostrarProductosDisponibles}${`${productosDisponibles.length + 1}.Volver`}\nElija el que quiera comprar`));
        }
        if (opcionProductos!=productosDisponibles.length + 1){
                carrito.agregarProductos(productosDisponibles[opcionProductos-1]);
            } else  {
            mostrarMenu()
        }

    }


alert("Bienvenido!");
crearUsuario=prompt("Cree un Usuario");
crearContrasenia=prompt("Cree una Contraseña");
inicioInteraccionConElUsuario();




