import pgp from "pg-promise";

export default class DatabaseConnection {
	connection: any;

	constructor () {
        const connectionString = (process.env.CONNECTION_STRING as string);
		this.connection = pgp()(connectionString);
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<void> {
		await this.connection.$pool.end();
	}
}
