import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import cors from "cors"

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/", productsRouter);
app.use("/", cartsRouter);


app.listen(PORT,() => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
})
