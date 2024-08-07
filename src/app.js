import express from "express";

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import ProductManager from "./managers/productmanager.js";

import { engine } from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", productsRouter);
app.use("/", cartsRouter);

app.use("/", viewsRouter);

const httpServer = app.listen(PORT,() => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})

const io = new Server(httpServer);
const manager = new ProductManager("./src/data/products.json")
let arrayProducts = []

io.on("connection", async(socket) => {   
    console.log("Conexion establecida!")

    arrayProducts = await manager.getProducts(); 

    socket.emit("productsList", {arrayProducts})

    socket.on("createProduct", (data) => {
        console.log(data);
    })

    socket.on("deleteProduct", (data) => {
        arrayProducts = data.arrayProducts
        socket.emit("productsList", {arrayProducts})
    })


})

