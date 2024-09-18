import mysql from "mysql2/promise";

// create the connection to database
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Br208762195!",
    database: "users",
});

export async function checkDBConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("db connected");
        connection.release();
        return true;
    } catch (error) {
        const message = error.message + "\n" + "can`t connect to db";
        console.log(message);
        return false;
    }
}

export async function getUsers() {
    const sql = `
        SELECT *
        FROM users;
    `;
    const [res] = await pool.query(sql);
    return res;
}

export async function getUser(id) {
    const sql = `
        SELECT *
        FROM users
        WHERE id = ?;
    `;
    const [[res]] = await pool.query(sql, [id]);
    return res;
}

export async function createUser(name, age) {
    const sql = `
        INSERT INTO users (name, age)
        VALUES (?, ?)
    `;
    const [{ insertId }] = await pool.query(sql, [name, age]);
    // console.log(insertId);
    return getUser(insertId);
}

export async function deleteUser(id) {
    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [id]);
    return affectedRows;
}

export async function updateUser(id, name, age) {
    const sql = `
        UPDATE users
        SET name = ?, age = ?
        WHERE id = ?
    `;
    const [{ affectedRows }] = await pool.query(sql, [name, age, id]);
    if (affectedRows) return getUser(id);
}
// console.log(12);
// const user = await updateUser(2, "Yosef", 12);
// const users = await getUsers();
// console.log(user);
