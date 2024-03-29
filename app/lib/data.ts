import { unstable_noStore as noStore } from "next/cache";
import { Pool } from "pg";
import { Todo, User } from "./definitions";

export const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "mac7&",
    port: 5432,
    database: "usetodo",
});

export async function getAllTodos(): Promise<Todo[]> {
    noStore();
    try {
        const res = await pool.query("SELECT * FROM todos");
        return res.rows;
    } catch (error) {
        throw error;
    }
}

export async function getAllUsers(): Promise<User[]> {
    noStore();
    try {
        const res = await pool.query("SELECT * FROM users");
        return res.rows;
    } catch (error) {
        throw error;
    }
}
