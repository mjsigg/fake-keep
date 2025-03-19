import { Pool } from "pg";
import { Note } from "../../types/note";
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export class NoteService {
  static async getAllNotes(): Promise<Note[]> {
    const result = await pool.query(
      "SELECT * FROM notes ORDER BY created_on DESC"
    );
    return result.rows; // Return the data to the controller
  }

  static async createNote(title: string, text_body: string): Promise<Note> {
    try {
      const query = `
        INSERT INTO notes (title, text_body, created_on)
        VALUES ($1, $2, NOW())
        RETURNING *;
      `;

      const values = [title, text_body];

      const result = await pool.query(query, values);
      return result.rows[0]; // Return the inserted note
    } catch (error) {
      console.error("Error inserting note into the database:", error);
      throw error; // Propagate the error back to the controller
    }
  }

  static async deleteById(id: string): Promise<boolean> {
    try {
      // console.log("this is deleteby Id,", id);
      const query = `DELETE FROM NOTES WHERE id = $1 RETURNING id;`;
      const result = await pool.query(query, [id]);
      return result.rowCount > 0;
    } catch (e) {
      console.error("Error deleting note:", e);
      throw e;
    }
  }

  // end of class
}
