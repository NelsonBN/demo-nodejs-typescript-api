import Product from "../../domain/Product";
import DatabaseConnection from "./DatabaseConnection";

export default class ProductsRepository {

	constructor (readonly connection: DatabaseConnection) {}

    async list(): Promise<Product[]> {
        const response = await this.connection.query("SELECT Id, Name, Quantity FROM Product;", []);
        if (!response)
        {
            return [];
        }

        var products: Product[] = [];
        for (const product of response) {
            products.push({
                id: product.id,
                name: product.name,
                quantity: product.quantity,
            });
        }

        return products;
    }

	async getById (id: string): Promise<Product | undefined> {
		const [product] = await this.connection.query("SELECT Id, Name, Quantity FROM Product WHERE Id = $1;", [id]);
		if (!product) return undefined;

		return {
			id: product.id,
			name: product.name,
			quantity: product.quantity,
		};
	}

    async add(product: Product): Promise<void> {
        await this.connection.query("INSERT INTO Product (Id, Name, Quantity) VALUES ($1, $2, $3);", [product.id, product.name, product.quantity]);
    }

    async update(product: Product): Promise<void> {
        await this.connection.query("UPDATE Product SET Name = $2, Quantity = $3 WHERE Id = $1;", [product.id, product.name, product.quantity]);
    }

    async delete(id: string): Promise<void> {
        await this.connection.query("DELETE FROM Product WHERE Id = $1;", [id]);
    }

    async any(id: string): Promise<boolean> {
        const [product] = await this.connection.query("SELECT Id FROM Product WHERE Id = $1;", [id]);
        return !!product;
    }
}