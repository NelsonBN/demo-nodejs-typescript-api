import AddProduct from "../../application/AddProduct";
import DeleteProduct from "../../application/DeleteProduct";
import GetProduct from "../../application/GetProduct";
import GetProducts from "../../application/GetProducts";
import UpdateProduct from "../../application/UpdateProduct";
import DatabaseConnection from "../database/DatabaseConnection";
import ProductsRepository from "../database/ProductsRepository";
import HttpServer from "./HttpServer";

export default class ProductsController {

	constructor (readonly httpServer: HttpServer, readonly dbConnection: DatabaseConnection) {
		httpServer.register()
			.get("/products", async function (req: any, res: any) {
				const repository = new ProductsRepository(dbConnection);
				const userCase = new GetProducts(repository);
				const output = await userCase.execute();
				res.status(200).json(output);
			});

		httpServer.register()
			.get("/products/:id", async function (req: any, res: any) {
				const repository = new ProductsRepository(dbConnection);
				const userCase = new GetProduct(repository);
				try {
					const output = await userCase.execute(req.params.id);
					res.status(200).json(output);
				}
				catch (error: any) {
					res.status(404).json({ message: error.message });
				}
			});

		httpServer.register()
			.post("/products", async function (req: any, res: any) {
				const repository = new ProductsRepository(dbConnection);
				const userCase = new AddProduct(repository);
				const output = await userCase.execute(req.body);
				res.status(201).json(output);
			});

		httpServer.register()
			.put("/products/:id", async function (req: any, res: any) {
				const repository = new ProductsRepository(dbConnection);
				const userCase = new UpdateProduct(repository);
				try {
					await userCase.execute(req.params.id, req.body);
					res.status(204).send();
				}
				catch (error: any) {
					res.status(404).json({ message: error.message });
				}
			});

		httpServer.register()
			.delete("/products/:id", async function (req: any, res: any) {
				const repository = new ProductsRepository(dbConnection);
				const userCase = new DeleteProduct(repository);
				try {
					await userCase.execute(req.params.id);
					res.status(204).send();
				}
				catch (error: any) {
					res.status(404).json({ message: error.message });
				}
			});
	}
}