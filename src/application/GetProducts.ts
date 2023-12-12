import Product from "../domain/Product";
import ProductsRepository from "../infrastructure/database/ProductsRepository";

export default class GetProducts {
    constructor(readonly productsRepository: ProductsRepository) {}

    async execute(): Promise<Product[]> {
        const products = await this.productsRepository.list();

		return products;
    }
}