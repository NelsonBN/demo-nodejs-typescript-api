import ProductsRepository from "../infrastructure/database/ProductsRepository";

export default class DeleteProduct {
    constructor(readonly productsRepository: ProductsRepository) {}

    async execute(id: string): Promise<void>  {
        const exists = await this.productsRepository.any(id);

        if (!exists) throw new Error("Product not found");

        await this.productsRepository.delete(id);
    }
}
