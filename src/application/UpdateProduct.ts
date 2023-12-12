import ProductsRepository from "../infrastructure/database/ProductsRepository";

export default class UpdateProduct {
    constructor(readonly productsRepository: ProductsRepository) {}

    async execute(id: string, request: Request): Promise<void>  {
        const product = await this.productsRepository.getById(id);

        if (!product) throw new Error("Product not found");

		product.name = request.name;
        product.quantity = request.quantity;

        await this.productsRepository.update(product);
    }
}

export type Request = {
	name: string,
	quantity: number
}