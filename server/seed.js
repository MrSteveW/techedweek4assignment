import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

// db.query(
//   `INSERT INTO messages (msg_name, content) VALUES ('Monday','I am Monday''s message')`
// );

// this is bad - SQL injection can return all rows
// do this instead
// Instead of writing the value directly, we create a placeholder with a dollar sign and 1, and then put the actual value in an array as a second parameter to the query method.

db.query(
  `INSERT INTO posts (id, created_at, title, username, avatar, text, likes) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
  [
    "1",
    new Date().toISOString(),
    "Supabase post",
    "Genius Steve",
    "./assets/pic1",
    "This is amazing!",
    30,
  ]
);
