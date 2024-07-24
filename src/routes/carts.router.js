import {Router} from "express";
import CartManager from "../managers/cartmanager.js";

const router = Router();

const managerCart = new CartManager("./src/data/carts.json")

//Lista todos los carritos
router.get("/api/carts", async (req, res) => {
    const arrayCarts = await managerCart.getCarts();
    res.send(arrayCarts)
})

//Obtiene un carrito por id
router.get("/api/carts/:cid", async (req, res) => {
        const cartFound = await managerCart.getCartById(req.params["cid"]);
        if (!cartFound) {
            res.status(404).send({error: "Carrito no encontrado"})
        } else {
            res.send(cartFound)
        }
})

//agrega un carrito
router.post("/api/carts", async (req, res) => {
    try {
        const response = await managerCart.addCart();
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})

//agregar producto a carrito
router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try {
        let cid = req.params["cid"];
        let pid = req.params["pid"];
        const response = await managerCart.addProductToCart(cid, pid);
        res.send(response)
    } catch (error) {
        console.log(error);
    }
})


export default router;
