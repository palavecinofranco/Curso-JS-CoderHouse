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


productosDisponibles.forEach((producto) =>{
    const nuevoProducto = {
        ...producto,
        fecha: "552"
    }
    console.log(nuevoProducto)
})