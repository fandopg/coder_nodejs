import fs from "fs/promises";

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async getProducts() {
        try {
            const arrayProducts = await this.readData();
            return arrayProducts;
        } catch (error) {
            console.log("Error al leer el archivo " + error);
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readData();
            const productFound = arrayProducts.find((product) => product.id == id);
            if (!productFound) {
                console.log("No se encontro el producto");
                return null;
            } else {
                console.log("Producto encontrado");
                return productFound;
            }
        } catch (error) {
            console.log("Error al buscar producto " + error);
        }
    }

    async addProduct(product) {
        try {
            const arrayProducts = await this.readData();

            let { title, description, price, thumbnail, code, stock, status, category} = product;
            // //Validamos que todos los campos esten presentes:
            if (!title || !description || !price || !code || !stock || !status || !category) {
                return "Todos los campos son obligatorios!";
            }

            if (arrayProducts.some((product) => product.code == code)) {
                return "El codigo ya esta registrado, no se puede agregar el producto!";
            }

            let lastProductId = arrayProducts[arrayProducts.length - 1]?.id ?? 0;
            product.id = ++lastProductId;
            arrayProducts.push(product);
            await this.saveData(arrayProducts);
            return "El producto se agrego correctamente!";
        } catch (error) { console.log(error); }
    }

    async readData() {
        let response = await fs.readFile(this.path, "utf-8");
        if (!response) {
            response = "[]"
        }
        const arrayProducts = JSON.parse(response);
        
        return arrayProducts;
    }

    async saveData(arrayProducts) {
        await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    }

    async updateProduct(id, productUpdated) {
        try {
            delete productUpdated.id;
            const arrayProducts = await this.readData();
            const index = arrayProducts.findIndex((product) => product.id == id);

            if (index != -1) {
                Object.assign(arrayProducts[index], productUpdated)
                await this.saveData(arrayProducts);
                return "Producto actualizado";
            } else {
                return "Producto no encontrado";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readData();
            const index = arrayProducts.findIndex((product) => product.id == id);
            if (index != -1) {
                arrayProducts.splice(index, 1);
                await this.saveData(arrayProducts);
                return "Producto eliminado";
            } else {
                return "Producto no encontrado";
            }
        } catch (error) {
            console.log("Error al eliminar el prosucto " + error);
        }
    }
}

export default ProductManager;
