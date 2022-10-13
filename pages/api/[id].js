
import { pool } from "../../config/db"

export default async function handler(req, res) {
  if (req.method === 'DELETE'){
    return deleteBookmark(req, res)
  }
}

const deleteBookmark = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: "Not Token" });
    }
    try {
      await pool.query("DELETE FROM bookmarks WHERE id=?", [req.query.id])
      return res.status(200).json({ message: "Favorite removed suscessfully" });
    } catch (error) {
      return res.status(401).json({ error: error });
    }
  }