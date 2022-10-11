const productosComprados = JSON.parse(localStorage.getItem('comprados')) || [];
const contenedorProductos = document.querySelector(".main__comprados")
window.jsPDF = window.jspdf.jsPDF;


function agregarProductosCompradosDom(){
    productosComprados.forEach((producto)=>{
        const elemento = document.createElement("div")
        elemento.classList.toggle("producto-comprado")
        elemento.innerHTML = `
        <div class="producto-header">
          <span>${producto.fecha}</span>
        </div>
        <div class="producto-contenedor">
          <div class="producto-caracteristicas">
            <img src=${producto.img} class="productoimg">
            <div class="desc">
              <h6 style="color: green;">Comprado</h6>
              <h5 class="producto-comp-desc">${producto.nombre} ${producto.marca} <br>${producto.modelo} ${producto.descripcion}</br></h5>
            </div>
          </div>
          <button class="boton-descargar" id="btn-desc${producto.id}"><i class="fa-solid fa-arrow-down"></i></button>
        </div>`

        contenedorProductos.appendChild(elemento);

        const botonDescargar = document.querySelector(`#btn-desc${producto.id}`)
        botonDescargar.addEventListener("click", ()=>{
            const doc = new jsPDF();
            doc.setFont("Helvetica");
            doc.setFontSize(16);
            doc.text("Resumen de compra", 10, 20)
            doc.addImage("/images/logos.png", 150, 250, 60, 40, 30)
            doc.line(10,30,200,30);
            doc.text("El producto cuenta con una garantía de 6 meses, a partir de la fecha dada. De\npresentar algún problema llamar al 01155882144 o enviar un mail a atención al\ncliente mediante el siguiente mail: adnatalcliente@gmail.com", 8, 60)
            doc.text(`Fecha de emisión: ${producto.fecha}`, 10, 100)
            doc.text("Características del producto:", 10, 120)
            doc.text(`Nombre del producto: ${producto.nombre}`, 10, 130)
            doc.text(`Marca: ${producto.marca}`, 10, 140)
            doc.text(`Modelo: ${producto.modelo}`, 10, 150)
            doc.text(`Descripción: ${producto.descripcion}`, 10, 160)
            doc.text(`Precio pagado por unidad: $${producto.precio}`, 10, 170)
            doc.text(`Cantidad: ${producto.cantidad}`, 10, 180)
            doc.text(`ID de transacción producto: ${producto.idTransaccion}`, 10, 210)
            doc.line(10, 250, 200, 250)
            doc.setFontSize(10);
            doc.text("Redes", 10, 260)
            doc.textWithLink("Instagram", 10, 270, {url:"https://www.instagram.com/"})
            doc.textWithLink("Facebook", 10, 275, {url:"https://www.facebook.com/"})
            doc.textWithLink("Web", 10, 280, {url:"/index.html"})
            doc.text("Contacto", 80, 260)
            doc.text("Telefono: 01158951241", 80, 270)
            doc.text("Email: adnecommerce@gmail.com", 80, 275)
            doc.save(`ResumenDeCompra${producto.id}.pdf`)
        })
    })
}

agregarProductosCompradosDom();
