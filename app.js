//Clase 1   VARIABLES/PROMP/ALERT

/*let nombre = "Franco";
console.log(nombre);
let numeroDeAlumnos=5;
console.log(numeroDeAlumnos);
let enCurso=true;
console.log(enCurso);


let nombr=prompt("ingresa tu nombre");
alert("hola " + nombr);


let numeroSolicitado1= parseInt(prompt("Ingrese un numero"));
let numeroSolicitado2= parseInt(prompt("Ingrese otro numero"));

let resultado= (numeroSolicitado1 + numeroSolicitado2);

alert("El resultado es: " + resultado);

//Clase 2       CONDICIONALES

/*if(condicion){
    bloque verdadero
}
else{
    bloque falso
}*/

//OPERADORES LÓGICOS

/*
== igual que
=== estrictamente igual
*/

/*let crearUsuario=prompt("Cree un Usuario")
let crearContrasenia=prompt("Cree una contraseña")

let inicioUsuario=prompt("Ingrese su usuario")
let inicioContrasenia=prompt("Ingrese su contraseña")

if((inicioUsuario==crearUsuario) && (inicioContrasenia==crearContrasenia)){
    alert("Se ha logueado correctamente")
}
else{
    alert("Usuario y/o contraseña incorrecta")
}*/


                                                    /*SWITCH*/
/*let food= prompt("que quiere comer");

switch (food) {
    case "hamburguesa":
        console.log(`Pedido: ${food}, valor 1000`);
        break;
    case 'pizza':
        console.log(`Pedido: ${food}, valor 1000`);
        break;
    case 'asado':
        console.log(`Pedido: ${food}, valor 1000`);
        break;
    case 'milanesa':
        
        console.log(`Pedido: ${food}, valor 1000`);
        break;
        default:
            console.log("No tenemos ese menu");
            break;
        }*/


        /*let inicioUsuario=prompt("Ingrese su Usuario")
        let inicioContrasenia=prompt("Ingrese su Contraseña")*/

        /* while (inicioUsuario!=crearUsuario || inicioContrasenia!=crearContrasenia) {
            alert("Usuario y/o contraseña incorrecta")
            inicioUsuario=prompt("Ingrese su Usuario")
            inicioContrasenia=prompt("Ingrese su Contraseña")
        }
        alert("Se ha logueado correctamente")*/
        
        
        /*for(let i=0;i<=5;i++){
            console.log(i)
        }
        console.log('ha terminado la iteracion')*/


let crearUsuario;
let crearContrasenia;
let iniciarUsuario;
let iniciarContrasenia;
let carrito=0;
let valorCarrito=0;
let cantidadDeProductosComprados="";
let dineroEnCuenta=0;
let numeroAleatorio= Math.round(Math.random() * 100000);
let letraAleatoria= Math.random().toString(24).replace(/[^a-z]+/g, '');
let idAleatorio=(letraAleatoria.toUpperCase()) + numeroAleatorio;


function mostrarCarrito(){
        let controlCarrito=prompt(`Tus productos en el carrito son ${carrito} (${cantidadDeProductosComprados}) \nEl precio de tu carrito es de $${valorCarrito}\n1.Vaciar carrito\n2.Volver\n3.Confimar Compra`);
        switch(controlCarrito){
            case "1":
                carrito=0;
                cantidadDeProductosComprados="";
                valorCarrito=0;
                mostrarCarrito();
                break;
            case "2":
                mostrarMenu();
                break;

            case "3":
                if(valorCarrito<=dineroEnCuenta){
                    alert(`Compra efectuada con exito. Id de transacción: #${idAleatorio}`);
                    dineroEnCuenta=dineroEnCuenta-valorCarrito;
                    carrito=0;
                    cantidadDeProductosComprados="";
                    valorCarrito=0
                    mostrarCarrito()
                }else{
                    alert("Dinero Insuficiente!");
                    mostrarCarrito();
                }   
                break;

            default:
                alert("Opción no válida")
                mostrarCarrito()
        }
    }


function inicioInteraccionConElUsuario(){
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
        
function mostrarMenu(){
            let opcion= prompt("Elija una opción \n1.Comprar \n2.Mostrar carrito \n3.Mi Cuenta \n4.Cancelar");
            switch(opcion){
                case '1':
                    mostrarProductos();
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

function iniciarSesion(){
        iniciarUsuario=prompt("Ingrese su Usuario")
        iniciarContrasenia=prompt("Ingrese su contraseña")
        while(iniciarUsuario!=crearUsuario || iniciarContrasenia!=crearContrasenia){
            alert("Usuario y/o contraseña incorrecta")
            iniciarUsuario=prompt("Ingrese su Usuario")
            iniciarContrasenia=prompt("Ingrese su Contraseña");
            }
        alert("Se ha logueado correctamente.");
        }


    function mostrarProductos(){
        let productos=prompt("Estos son los productos que tenemos disponibles, elija el que quiera comprar \n 1.Aire Acondicionado \n 2.Heladera \n 3.Cocina \n 4.Lavarropas \n 5.Volver");
            let precioProducto=0;
            const PRECIO_AIRE=150000;
            const PRECIO_HELADERA=120000;
            const PRECIO_COCINA=80000;
            const PRECIO_LAVARROPAS=90000;
                switch(productos){
                    case "1": 
                        function agregarAlCarrito(){
                            if(carrito>=5){
                                alert("Carrito lleno")
                                mostrarProductos()
                            }else{
                            carrito++
                            valorCarrito=valorCarrito+precioProducto;
                            cantidadDeProductosComprados=cantidadDeProductosComprados+productos;
                            alert(`Se ha añadido al carrito ${productos} $${precioProducto}`);   
                            return mostrarProductos();
                            }
                        }
                        productos="Aire Acondicionado, ";
                        precioProducto=PRECIO_AIRE;
                        agregarAlCarrito();
                        break;
                    case "2": 
                        productos="Heladera, ";
                        precioProducto=PRECIO_HELADERA;
                        agregarAlCarrito();
                        break;
                    case "3": 
                        productos="Cocina, ";
                        precioProducto=PRECIO_COCINA;
                        agregarAlCarrito();
                        break;
                    case "4": 
                        productos="Lavarropas, ";
                        precioProducto=PRECIO_LAVARROPAS;
                        agregarAlCarrito();
                        break;
                    case "5": 
                        mostrarMenu();
                        break;
                    default:
                        alert("Opcion incorrecta")
                        return mostrarProductos();
        }
    }

alert("Bienvenido!");
crearUsuario=prompt("Cree un Usuario");
crearContrasenia=prompt("Cree una Contraseña");
inicioInteraccionConElUsuario();


