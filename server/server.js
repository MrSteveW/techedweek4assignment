import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

const app = express();
// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
// GET ALL POSTS
app.get("/", async (req, res) => {
  const posts = await db.query("SELECT * FROM posts");
  res.status(200).json(posts.rows);
});

// POST NEW POST
app.post("/", async (req, res) => {
  try {
    const body = req.body;
    const title = req.body.title;
    const text = req.body.text;
    const username = req.body.username;
    const avatar = req.body.avatar;
    const likes = req.body.likes;

    const result = await db.query(
      "INSERT INTO posts (title, text, username, avatar, likes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, text, username, avatar, likes]
    );

    res.status(201).json({
      status: "Message saved successfully",
      message: result.rows[0],
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({
      status: "Error saving message",
      error: error.message,
    });
  }
});

// DELETE POST BY ID
app.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Post not found" });
    }
    return response.status(200).json({ deleted: result.rows[0] });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

// PATCH WITH A LIKE
app.patch("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { likes } = request.body;
    const result = await db.query(
      "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
      [likes, id]
    );
    if (result.rows.length === 0) {
      return response.status(404).json({ error: "Post not found" });
    }
    return response.status(200).json({ updated: result.rows[0] });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
