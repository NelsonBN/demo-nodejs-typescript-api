import express from "express";
import helmet from 'helmet';

export default class HttpServer {
	app: any;

	constructor () {
		this.app = express();

        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
	}

    register = () => this.app;

	listen(port?: number|string): void {
        if (!port) {
            port = process.env.PORT || 3000;
        }

        this.app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
	}

}