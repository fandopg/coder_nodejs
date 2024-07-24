import fs from "fs/promises";

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
    }

    async getCarts() {
        try {
            const arrayCarts = await this.readData();
            return arrayCarts;
        } catch (error) {
            console.log("Error al leer el archivo " + error);
        }
    }

    async getCartById(id) {
        try {
            const arrayCarts = await this.readData();
            const cartFound = arrayCarts.find((cart) => cart.id == id);
            if (!cartFound) {
                console.log("No se encontro el carrito");
                return null;
            } else {
                console.log("Carrito encontrado");
                if (cartFound.products.length == 0) {
                    return "El carrito esta vacio"
                }else {
                    return cartFound.products;
                }
            }
        } catch (error) {
            console.log("Error al buscar carrito " + error);
        }
    }

    async addCart() {
        try {
            const arrayCarts = await this.readData();
            let lastCartId = arrayCarts[arrayCarts.length - 1]?.id ?? 0;
            let cart = {products: []}
            cart.id = ++lastCartId
            console.log(cart);
            arrayCarts.push(cart);
            await this.saveData(arrayCarts);
            return "El carrito se agrego correctamente!";
        } catch (error) { console.log(error); }
    }

    async addProductToCart(cid, pid) {
        try {
            const arrayCarts = await this.readData();
            const cartFound = arrayCarts.find((cart) => cart.id == cid);
            if (!cartFound) {
                return "Carrito no encontrado";
            }else {
                let products = cartFound.products
                let indexProduct = products.findIndex((product) => product.id == pid);
                if (indexProduct == -1) {
                    let newProduct = {
                        id:parseInt(pid),
                        quantity:1
                    }
                    products.push(newProduct)
                } else {
                    ++products[indexProduct].quantity
                }
            }
            await this.saveData(arrayCarts);
            return `El producto con ID: ${pid}, se agrego al carrito numero: ${cid}`;
        } catch (error) {
            console.log(error);
        }
    }

    async readData() {
        let response = await fs.readFile(this.path, "utf-8");
        if (!response) {
            response = "[]"
        }
        const arrayCarts = JSON.parse(response);
        return arrayCarts;
    }

    async saveData(arrayCarts) {
        await fs.writeFile(this.path, JSON.stringify(arrayCarts, null, 2));
    }

    

    
}

export default CartManager;
