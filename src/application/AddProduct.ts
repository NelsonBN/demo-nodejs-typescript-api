import crypto from "crypto";
import Product from "../domain/Product";
import ProductsRepository from "../infrastructure/database/ProductsRepository";

export default class AddProduct {
    constructor(readonly productsRepository: ProductsRepository) {}

    async execute(request: Request): Promise<string> {
        const product: Product = {
            id: crypto.randomUUID(),
            name: request.name,
            quantity: request.quantity
        };
        await this.productsRepository.add(product);

		return product.id;
    }
}

export type Request = {
	name: string,
	quantity: number
}