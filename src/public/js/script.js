let productTitle;

const socket = io();
const productsList = document.getElementById("productsList");
const formCreateProduct = document.getElementById("create-product")

formCreateProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    productTitle = document.getElementById("product-title").value.trim()

    socket.emit("createProduct", {productTitle: productTitle}) 
})

let arrayProducts = [];
const eliminarProducto = (index) => {
    arrayProducts.splice(index, 1)
    productsList.innerHTML = ""
    socket.emit("deleteProduct", {arrayProducts: arrayProducts})
}

socket.on("productsList", async (data) => {
    arrayProducts = data.arrayProducts;
    const productList = document.getElementById("productsList")

    arrayProducts.forEach((product, index) => {
        productList.innerHTML += `<p>Producto: ${product.title}</p>
                                  <p>Descripcion: ${product.description}</p>
                                  <p>Precio: $${product.price}</p>
                                  <button id="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>`
    });
})


