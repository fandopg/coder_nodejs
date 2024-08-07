import {Router} from "express";
import ProductManager from "../managers/productmanager.js";

const router = Router();

const manager = new ProductManager("./src/data/products.json")

//Lista todo los productos
router.get("/api/products", async (req, res) => {
    const limit = req.query.limit;
    const arrayProducts = await manager.getProducts();
    if (limit) {
        let arrayLimited = await arrayProducts.slice(0, limit)
        res.send(arrayLimited);
    }else{
        res.send(arrayProducts)
    }

})

//Obtiene un producto por id
router.get("/api/products/:pid", async (req, res) => {
        const productFound = await manager.getProductById(req.params["pid"]);
        if (!productFound) {
            res.status(404).send({error: "Producto no encontrado"})
        } else {
            res.send(productFound)
        }
})

//agrega un producto
router.post("/api/products", async (req, res) => {
    try {
        const newProduct = await req.body;
        const response = await manager.addProduct(newProduct);
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})

//actualizar producto
router.put("/api/products/:pid", async (req, res) => {
    try {
        const productUpdated = await req.body;
        const productFound = await manager.updateProduct(req.params["pid"], productUpdated);
        res.send(productFound)

    } catch (error) {
        console.log(error);
    }
})

//borrrar producto
router.delete("/api/products/:pid", async (req, res) => {
    try {
        const productFound = await manager.deleteProduct(req.params["pid"]);
        res.send(productFound)

    } catch (error) {
        console.log(error);
    }
})

export default router;
