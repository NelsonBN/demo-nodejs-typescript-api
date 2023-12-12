import Product from "../domain/Product";
import ProductsRepository from "../infrastructure/database/ProductsRepository";

export default class GetProduct {
    constructor(readonly productsRepository: ProductsRepository) {}

    async execute(id: string): Promise<Product>  {
        const product = await this.productsRepository.getById(id);

        if (!product) throw new Error("Product not found");

		return product;
    }
}