import knex from "knex";

const connection: string = process.env.NEON_DB_CONNECTION_STRING ?? "";
const client: string = process.env.DATABASE_CLIENT ?? "pg";

const db = knex({ client, connection });

export { db };
